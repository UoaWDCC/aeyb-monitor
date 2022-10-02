import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Meeting, { MeetingModel } from '../models/MeetingSchema';
import { MeetingRequest } from '../types/RequestTypes';
import { TypedRequestBody, TypedRequest } from '../types/UtilTypes';
import { MeetingIdParam } from '../types/RequestParams';
import PaginationHandler from '../classes/PaginationHandler';
import { MeetingFilterQuery } from '../types/QueryTypes';

/**
 * @desc 	Get all the meetings
 * @route 	GET /api/meetings/
 */
const getAllMeetings = asyncHandler(
    new PaginationHandler<MeetingModel, MeetingFilterQuery>(Meeting)
        .pre((query, req) => {
            const filterHandlers: Record<string, (value: string) => void> = {
                before: (value) => (query = query.where({ time: { $lt: new Date(value) } })),
                after: (value) => (query = query.where({ time: { $gt: new Date(value) } })),
                time: (value) => (query = query.where('time').equals(new Date(value))),
                creator: (value) => (query = query.where('creator').equals(value)),
                location: (value) => (query = query.where('location', new RegExp(value, 'i'))),
                name: (value) => (query = query.where('name', new RegExp(value, 'i'))),
            };

            Object.entries(req.query)
                .filter(([query]) => filterHandlers[query])
                .forEach(([query, value]: [string, string]) => filterHandlers[query](value));

            if (!req.query.passed || req.query.passed !== 'true') {
                query = query.where('time').gte(Date.now()); // Only get events that haven't passed
            }

            return query;
        })
        .pre((query) => query.sort({ time: 'ascending' }))
        .post(async (events) => await Promise.all(events.map((event) => event.populate('creator')))).handler,
);

/**
 * @desc    Get a specific meeting
 * @route   GET /api/meetings/:meetingId
 */
const getMeeting = asyncHandler(async (req: Request<MeetingIdParam>, res: Response) => {
    const meeting = await Meeting.findById(req.params.meetingId);
    if (!meeting) {
        return res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
    }

    await meeting.populate('creator');
    res.ok({ meeting });
});

/**
 * @desc 	Add a new meetings
 * @route 	POST /api/meetings/
 */
const addMeeting = asyncHandler(async (req: TypedRequestBody<MeetingModel>, res: Response) => {
    const newMeeting = await Meeting.create({
        ...req.body,
        creator: req.body.requester,
    });

    res.ok({ meeting: newMeeting });
});

/**
 * @desc 	Delete a specific meeting
 * @route 	DELETE /api/meetings/:meetingId
 */
const deleteMeeting = asyncHandler(async (req: Request<MeetingIdParam>, res: Response) => {
    const meeting = await Meeting.findByIdAndDelete(req.params.meetingId);
    if (!meeting) {
        return res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
    }
    res.status(204);
});

/**
 * @desc    Edit a specific meeting
 * @route   PATCH /api/meetings/:meetingId
 */
const updateMeeting = asyncHandler(async (req: TypedRequest<MeetingRequest, MeetingIdParam>, res: Response) => {
    const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!meeting) {
        return res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
    }
    res.ok({ meeting });
});

export { getAllMeetings, getMeeting, addMeeting, deleteMeeting, updateMeeting };
