import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Meeting, { MeetingModel } from '../models/MeetingModel';
import Attendance from '../models/AttendanceModel';
import { MeetingRequest } from '../types/RequestTypes';
import { TypedRequestBody } from '../types/UtilTypes';
import { MeetingIdParam } from '../types/RequestParams';
import mongoose from 'mongoose';

/**
 * @desc 	Get all the meetings
 * @route 	GET /api/meetings/
 */
const getAllMeetings = asyncHandler(async (req: Request, res: Response) => {
    const meetings = await Meeting.find();

    res.status(200).json({
        status: 'success',
        results: meetings.length,
        data: {
            meetings,
        },
    });
});

/**
 * @desc 	Add a new meetings
 * @route 	POST /api/meetings/
 */

//TODO: Check if user exists and to add by roles
const createMeeting = asyncHandler(
    async (req: TypedRequestBody<MeetingRequest>, res: Response) => {
        const date = new Date();
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
            time: new Date(),
            invited: req.body.invited,
            where: req.body.where,
            attendance: attendenceId,
            description: req.body.description,
        });

        await res.status(201).json({
            status: 'success',
            data: {
                meeting: newMeeting,
                attendance: newAttendance,
            },
        });
    },
);

/**
 * @desc 	Delete a specific meeting
 * @route 	DELETE /api/meetings/:meetingId
 */
const deleteMeeting = asyncHandler(
    async (req: Request<MeetingIdParam>, res: Response) => {
        const meeting_delete = await Meeting.findById(req.params.meetingId);
        if (typeof meeting_delete !== null) {
            const attendanceId = meeting_delete?.get('attendance');
            await Attendance.findByIdAndDelete(attendanceId);
        }

        await Meeting.findByIdAndDelete(req.params.meetingId);
        res.status(200).json({
            status: 'success',
        });
    },
);

export { getAllMeetings, createMeeting, deleteMeeting };
