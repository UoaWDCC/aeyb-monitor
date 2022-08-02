import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Meeting, { MeetingModel } from '../models/MeetingModel';
import Attendance from '../models/AttendanceModel';
import { MeetingRequest } from '../types/RequestTypes';
import { TypedRequestBody, TypedRequest } from '../types/UtilTypes';
import { MeetingIdParam } from '../types/RequestParams';
import PaginationHandler from '../classes/PaginationHandler';
import { MeetingFilterQuery } from '../types/QueryTypes';
import Invited, { InvitedModel } from '../models/InvitedModel';

/**
 * @desc 	Get all the meetings
 * @route 	GET /api/meetings/
 */
const getAllMeetings = asyncHandler(
    new PaginationHandler<MeetingModel, MeetingFilterQuery>(Meeting)
        .pre((query, req) => {
            const filterHandlers: Record<string, (value: string) => void> = {
                before: (value) =>
                    (query = query.where({ time: { $lt: new Date(value) } })),
                after: (value) =>
                    (query = query.where({ time: { $gt: new Date(value) } })),
                time: (value) =>
                    (query = query.where('time').equals(new Date(value))),
                creator: (value) =>
                    (query = query.where('creator').equals(value)),
                location: (value) =>
                    (query = query.where('location', new RegExp(value, 'i'))),
                name: (value) =>
                    (query = query.where('name', new RegExp(value, 'i'))),
            };

            Object.entries(req.query)
                .filter(([query]) => filterHandlers[query])
                .forEach(([query, value]: [string, string]) =>
                    filterHandlers[query](value),
                );

            if (!req.query.passed || req.query.passed !== 'true') {
                query = query.where('time').gte(Date.now()); // Only get events that haven't passed
            }

            return query;
        })
        .pre((query) => query.sort({ time: 'ascending' }))
        .post(
            async (events) =>
                await Promise.all(
                    events.map((event) => event.populate('creator')),
                ),
        ).handler,
);

/**
 * @desc    Get a specific meeting
 * @route   GET /api/meetings/:meetingId
 */
const getMeeting = asyncHandler(
    async (req: Request<MeetingIdParam>, res: Response) => {
        const meeting = await Meeting.findById(req.params.meetingId);
        if (meeting) {
            await meeting.populate('creator');
            res.status(200).json({
                status: 'success',
                data: {
                    meeting,
                },
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: `There is no meeting with the id ${req.params.meetingId}`,
            });
        }
    },
);

/**
 * @desc 	Add a new meetings
 * @route 	POST /api/meetings/
 */
const addMeeting = asyncHandler(
    async (req: TypedRequestBody<MeetingModel>, res: Response) => {

        const newAttendance = await Attendance.create({
            attendedUsers: req.body.attendance.attendedUsers,
            absentUsers: req.body.attendance.absentUsers,
            invited: await Invited.create({...req.body.attendance.invited}),
        });

        const newMeeting = await Meeting.create({
            name: req.body.name,
            creator: req.body.requester,
            time: new Date(req.body.time),
            where: req.body.where,
            attendance: newAttendance,
            description: req.body.description,
        });

        await res.status(200).json({
            status: 'success',
            data: {
                meeting: newMeeting,
            },
        });
    }
);

/**
 * @desc 	Delete a specific meeting
 * @route 	DELETE /api/meetings/:meetingId
 */
const deleteMeeting = asyncHandler(
    async (req: Request<MeetingIdParam>, res: Response) => {
        const meeting = await Meeting.findById(req.params.meetingId);
        if (meeting) {
            const attendance = await Attendance.findById(
                meeting.attendance,
            );
            if (attendance){
                const invited = await Invited.findByIdAndDelete(attendance.invited);
                await attendance.deleteOne();
            }
            await meeting.deleteOne();
            res.status(204).json({
                status: 'success',
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: `There is no meeting with the id ${req.params.meetingId}`,
            });
        }
    },
);

/**
 * @desc    Edit a specific meeting
 * @route   PATCH /api/meetings/:meetingId
 */
const updateMeeting = asyncHandler(
    async (req: TypedRequest<MeetingRequest, MeetingIdParam>, res: Response) => {
        const meeting = await Meeting.findByIdAndUpdate(
            req.params.meetingId,
            req.body,
            {
                new: true,
                runValidators: true,
            },
        );

        if (meeting) {
            res.status(200).json({
                status: 'success',
                data: {
                    meeting,
                },
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: `There is no meeting with the id ${req.params.meetingId}`,
            });
        }
    },
);

export { getAllMeetings, getMeeting, addMeeting, deleteMeeting, updateMeeting };
