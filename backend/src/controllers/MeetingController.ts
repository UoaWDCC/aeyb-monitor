import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Meeting, { MeetingModel } from '../models/MeetingModel';
import Attendance from '../models/AttendanceModel';
import { MeetingRequest } from '../types/RequestTypes';
import { TypedRequestBody, TypedRequest } from '../types/UtilTypes';
import { MeetingIdParam } from '../types/RequestParams';
import mongoose from 'mongoose';
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

//TODO: Check if user exists and to add by roles
const addMeeting = asyncHandler(
    async (req: TypedRequestBody<MeetingRequest>, res: Response) => {
        const meeting = await Meeting.findById(req.body.id);
        if (meeting) {
            res.status(404).json({
                status: 'error',
                message: `There is already a meeting with the id ${req.body.id}`,
            });
        } else {
            const attendenceId = new mongoose.Types.ObjectId();
            const newAttendance = await Attendance.create({
                _id: attendenceId,
                attendedUsers: req.body.attended,
                absentUsers: req.body.absent,
            });

            const newMeeting = await Meeting.create({
                _id: req.body.id,
                name: req.body.name,
                creator: req.body.creator,
                time: new Date(req.body.time),
                invited: req.body.invited,
                where: req.body.where,
                attendance: attendenceId,
                description: req.body.description,
            });

            await res.status(200).json({
                status: 'success',
                data: {
                    meeting: newMeeting,
                    attendance: newAttendance,
                },
            });
        }
    },
);

/**
 * @desc 	Delete a specific meeting
 * @route 	DELETE /api/meetings/:meetingId
 */
const deleteMeeting = asyncHandler(
    async (req: Request<MeetingIdParam>, res: Response) => {
        const meeting = await Meeting.findById(req.params.meetingId);
        if (meeting) {
            const attendance = await Attendance.findByIdAndDelete(
                meeting.attendance,
            );
            const remove = await Meeting.deleteOne({
                _id: req.params.meetingId,
            });
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
    async (req: TypedRequest<MeetingModel, MeetingIdParam>, res: Response) => {
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
