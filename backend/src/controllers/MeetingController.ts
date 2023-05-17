import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import Meeting from '../models/MeetingModel';
import Attendance from 'src/models/AttendanceModel';
import User from 'src/models/UserModel';
import { TypedRequest, TypedRequestParams, TypedRequestQuery, TypedResponse } from '../types/UtilTypes';
import { AttendanceIdParam, MeetingIdParam } from '@shared/params';
import PaginationHandler from '../classes/PaginationHandler';
import {
    AddMeetingData,
    GetAllMeetingsData,
    GetAttendanceData,
    GetAttendanceDataForUser,
    GetFeedbackData,
    GetMeetingData,
    UpdateMeetingData,
} from '@shared/responses/MeetingResponses';
import { AddMeetingRequest, UpdateAttendanceRequest, UpdateMeetingRequest } from '@shared/requests/MeetingRequests';
import { GetAllMeetingsQuery } from '@shared/queries/MeetingQueries';
import UserDTO from '@shared/dtos/UserDTO';
import MeetingDTO from '@shared/dtos/MeetingDTO';

const paginationOptions = PaginationHandler.createOptions();

/**
 * @desc 	Get all the meetings
 * @route 	GET /api/meetings
 */
const getAllMeetings = asyncHandler(
    async (req: TypedRequestQuery<GetAllMeetingsQuery>, res: TypedResponse<GetAllMeetingsData>) => {
        let query = Meeting.find();

        const filterHandlers: Record<string, (value: string) => void> = {
            before: (value) => (query = query.where('time').lt(Number.parseInt(value))),
            after: (value) => (query = query.where('time').gt(Number.parseInt(value))),
            creator: (value) => (query = query.where('creator').equals(value)),
            name: (value) => (query = query.where('name', new RegExp(value, 'i'))),
            location: (value) => (query = query.where('location', new RegExp(value, 'i'))),
            type: (value) => (query = query.where('type', new RegExp(value, 'i'))),
        };

        Object.entries(req.query)
            .filter(([query]) => filterHandlers[query])
            .forEach(([query, value]: [string, string]) => filterHandlers[query](value));

        if (!req.query.passed || req.query.passed !== 'true') {
            query = query.where('time').gte(Date.now()); // Only get events that haven't passed
        }

        query = query.sort({ time: 'ascending' });

        const { response, data } = await PaginationHandler.paginate(query, req.query, paginationOptions);
        res.ok({
            ...response,
            meetings: await Promise.all(data.map((meeting) => meeting.asPopulated())),
        });
    },
);

/**
 * @desc    Get a specific meeting
 * @route   GET /api/meetings/:meetingId
 */
const getMeeting = asyncHandler(async (req: TypedRequestParams<MeetingIdParam>, res: TypedResponse<GetMeetingData>) => {
    const meeting = await Meeting.findById(req.params.meetingId);
    if (!meeting) {
        return res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
    }

    res.ok({ meeting: await meeting.asPopulated() });
});

/**
 * @desc    Get the attendance for a specific meeting
 * @route   GET /api/meetings/:meetingId/attendances
 */

const getMeetingAttendance = asyncHandler(
    async (req: TypedRequestParams<MeetingIdParam>, res: TypedResponse<GetAttendanceData>) => {
        const meeting = await Meeting.findById(req.params.meetingId);

        if (!meeting) {
            res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
            return;
        }

        const attendance = meeting.attendance;

        if (attendance.length == 0) {
            res.notFound(`There is no attendance in the meeting with the id ${req.params.meetingId}`);
            return;
        }

        res.ok({ attendance: attendance });
    },
);

/**
 * @desc    Get the attendance for a specific user in a specific meeting
 * @route   GET /api/meetings/:meetingId/attendances/users/:userId
 */

const getMeetingAttendanceForUser = asyncHandler(
    async (
        req: TypedRequest<UpdateMeetingRequest, AttendanceIdParam>,
        res: TypedResponse<GetAttendanceDataForUser>,
    ) => {
        const meeting = await Meeting.findById(req.params.meetingId);

        if (!meeting) {
            res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
            return;
        }

        const filteredAttendances = meeting.attendance.filter((dto) => dto.user.id === req.params.userId);

        res.ok({ attendance: filteredAttendances[0] });
    },
);

/**
 * @desc    Modify attendance for a specific meeting
 * @route   PATCH /api/meetings/:meetingId/attendances/users/:userId
 */

const modifyMeetingAttendance = asyncHandler(
    async (req: TypedRequest<UpdateAttendanceRequest, AttendanceIdParam>, res: TypedResponse<UpdateMeetingData>) => {
        const { userId, meetingId } = req.params;
        const meeting = await Meeting.findById(meetingId);

        if (!meeting) {
            res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
            return;
        }

        const doesUserExist = await User.exists({ _id: userId });

        if (!doesUserExist) {
            res.notFound(`There is no users with the id ${req.params.meetingId}`);
            return;
        }

        const keys = Object.keys(req.body).filter((key) => key != 'requester') as (keyof typeof req.body)[];
        const newAttendance = {};
        for (let i = 0; i < keys.length; i++) {
            newAttendance[`attendance.$.${keys[i]}`] = req.body[keys[i]];
        }
        const { requester: _, ...withoutRequester } = req.body;

        const existingUserInMeeting = await Meeting.findOneAndUpdate(
            { _id: meetingId, 'attendance.user': userId },
            { $set: newAttendance },
            { new: true, returnOriginal: false },
        );

        if (existingUserInMeeting) {
            res.ok({ meeting: await existingUserInMeeting.asPopulated() });
            return;
        }

        const newUserInMeeting = (await Meeting.findOneAndUpdate(
            { _id: meetingId, 'attendance.user': { $ne: userId } },
            { $push: { attendance: withoutRequester } },
            { upsert: true, new: true },
        )) as MeetingDTO;

        if (newUserInMeeting) {
            res.ok({ meeting: newUserInMeeting });
            return;
        }

        res.error(500, 'Something went wrong.');
    },
);

/**
 * @desc 	Get a user's feedback for a specific meeting
 * @route 	GET /api/meetings/:meetingId/feedback/
 */

const getMeetingFeedback = asyncHandler(
    async (req: TypedRequest<UpdateMeetingRequest, MeetingIdParam>, res: TypedResponse<GetFeedbackData>) => {
        const meeting = await Meeting.findById(req.params.meetingId);

        if (!meeting) {
            res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
            return;
        }

        const filteredFeedback = meeting.attendance.map((dto) => {
            const { user, didAttend, ...rest } = dto;
            return rest;
        })[0];

        res.ok({ attendance: filteredFeedback });
    },
);

/**
 * @desc    Add feedback for a specific meeting
 * @route   POST /api/meetings/:meetingId/feedback/users/:userId
 */

const addMeetingFeedback = asyncHandler(
    async (req: TypedRequest<UpdateMeetingRequest, AttendanceIdParam>, res: TypedResponse<UpdateMeetingData>) => {
        const meeting = await Meeting.findById(req.params.meetingId);

        if (!meeting) {
            res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
            return;
        }

        const filteredAttendances = meeting.attendance.find((dto) => dto.user.id === req.params.userId);

        // Check if there is no attendance
        if (!filteredAttendances) {
            res.notFound(`There is no attendance stored in this meeting for a user with the id ${req.params.userId}`);
            return;

            // Check if user did not attend meeting
        } else if (filteredAttendances.didAttend == false) {
            res.notFound(
                `The user with the id ${req.params.userId} did not attend the meeting with the id ${req.params.meetingId}`,
            );
            return;
        } else {
            // Find and update the feedback with said user
            const userIndex = meeting.attendance.findIndex((dto) => dto.user.id === req.params.userId);
            meeting.attendance[userIndex] = { ...meeting.attendance[userIndex], ...req.body };
            console.log('updating feedback');

            await meeting.save();
        }

        res.ok({ meeting: await meeting.asPopulated() });
    },
);

/**
 * @desc    Update feedback for a specific meeting
 * @route   PATCH /api/meetings/:meetingId/feedback
 */

const updateMeetingFeedback = asyncHandler(
    async (req: TypedRequest<UpdateMeetingRequest, AttendanceIdParam>, res: TypedResponse<UpdateMeetingData>) => {
        const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, req.body, {
            new: true,
            runValidators: true,
        });

        if (!meeting) {
            res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
            return;
        }
        res.ok({ meeting: await meeting.asPopulated() });
    },
);

/**
 * @desc 	Get a user's feedback for a specific meeting
 * @route 	GET /api/meetings/:meetingId/feedback/users/:userId
 */

const getMeetingFeedbackForUser = asyncHandler(
    async (req: TypedRequest<UpdateMeetingRequest, AttendanceIdParam>, res: TypedResponse<GetFeedbackData>) => {
        const meeting = await Meeting.findById(req.params.meetingId);

        if (!meeting) {
            res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
            return;
        }

        // Find the attendance of the user
        const filteredAttendance = meeting.attendance.filter((dto) => dto.user.id === req.params.userId);

        const filteredFeedback = filteredAttendance.map((dto) => {
            const { user, didAttend, ...rest } = dto;
            return rest;
        })[0];

        res.ok({ attendance: filteredFeedback });
    },
);

/**
 * @desc 	Add a new meeting
 * @route 	POST /api/meetings
 */
const addMeeting = asyncHandler(async (req: TypedRequest<AddMeetingRequest>, res: TypedResponse<AddMeetingData>) => {
    const newMeeting = await Meeting.create({
        ...req.body,
        creator: req.body.requester,
    });

    res.ok({ meeting: await newMeeting.asPopulated() });
});

/**
 * @desc    Edit a specific meeting
 * @route   PATCH /api/meetings/:meetingId
 */
const updateMeeting = asyncHandler(
    async (req: TypedRequest<UpdateMeetingRequest, MeetingIdParam>, res: TypedResponse<UpdateMeetingData>) => {
        const meeting = await Meeting.findByIdAndUpdate(req.params.meetingId, req.body, {
            new: true,
            runValidators: true,
        });

        if (!meeting) {
            res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
            return;
        }
        res.ok({ meeting: await meeting.asPopulated() });
    },
);

/**
 * @desc 	Delete a specific meeting
 * @route 	DELETE /api/meetings/:meetingId
 */
const deleteMeeting = asyncHandler(async (req: TypedRequestParams<MeetingIdParam>, res: Response) => {
    const meeting = await Meeting.findByIdAndDelete(req.params.meetingId);
    if (!meeting) {
        return res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
    }
    res.sendStatus(204);
});

export {
    getAllMeetings,
    getMeeting,
    addMeeting,
    deleteMeeting,
    updateMeeting,
    getMeetingAttendance,
    getMeetingAttendanceForUser,
    modifyMeetingAttendance,
    getMeetingFeedback,
    getMeetingFeedbackForUser,
    addMeetingFeedback,
    updateMeetingFeedback,
};
