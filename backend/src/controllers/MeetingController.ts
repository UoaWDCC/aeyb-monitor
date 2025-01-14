import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import Meeting from '../models/MeetingModel';
import { TypedRequest, TypedRequestParams, TypedRequestQuery, TypedResponse } from '../types/UtilTypes';
import { AttendanceIdParam, AttendancesIdParam, MeetingIdParam } from '@shared/params';
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
import {
    AddMeetingRequest,
    UpdateAttendanceRequest,
    UpdateAttendancesRequest,
    UpdateMeetingRequest,
    EndMeetingRequest,
} from '@shared/requests/MeetingRequests';
import { GetAllMeetingsQuery } from '@shared/queries/MeetingQueries';
import { findMeeting, findUser, updateUserAttendanceForMeeting } from '../services/MeetingService';
import User from '../models/UserModel';
import Attendance from '../models/AttendanceModel';
import UserDTO from '../../../shared/dtos/UserDTO';

const paginationOptions = PaginationHandler.createOptions();

/**
 * @desc 	Get all the meetings
 * @route 	GET /api/meetings
 */
const getAllMeetings = asyncHandler(
    async (req: TypedRequestQuery<GetAllMeetingsQuery>, res: TypedResponse<GetAllMeetingsData>) => {
        let query = Meeting.find().populate('attendance').populate('attendance.user');

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
        const meeting = await Meeting.findById(req.params.meetingId).select('attendance -_id').lean().exec();

        if (!meeting || !meeting.attendance) {
            return res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
        }

        const { attendance } = meeting;

        res.ok({ attendance });
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
 * @desc    Modify attendance for a specific meeting for a specific user
 * @route   PATCH /api/meetings/:meetingId/attendances/users/:userId
 */
const modifyMeetingAttendance = asyncHandler(
    async (req: TypedRequest<UpdateAttendanceRequest, AttendanceIdParam>, res: TypedResponse<UpdateMeetingData>) => {
        const { userId, meetingId } = req.params;

        if (!(await findMeeting(meetingId, res))) {
            return;
        }

        if (!(await findUser(userId, res))) {
            return;
        }

        const updateFields = Object.keys(req.body).filter((key) => key !== 'requester');
        const updateQuery = updateFields.reduce(
            (query, field) => ({ ...query, [`attendance.$.${field}`]: req.body[field] }),
            {},
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { requester, ...updateData } = req.body;
        const updatedMeeting = await updateUserAttendanceForMeeting(meetingId, userId, updateQuery);

        if (updatedMeeting) {
            res.ok({ meeting: await updatedMeeting.asPopulated() });
            return;
        }

        const attendanceData = { user: userId, ...updateData };
        const updatedMeetingWithNewUser = await updateUserAttendanceForMeeting(meetingId, userId, attendanceData);

        if (updatedMeetingWithNewUser) {
            res.ok({ meeting: await updatedMeetingWithNewUser.asPopulated() });
            return;
        }

        res.error(500, 'Something went wrong.');
    },
);

/**
 * @desc    Modify attendance for a specific meeting for a specific user
 * @route   PATCH /api/meetings/:meetingId/attendances
 */
const modifyMeetingAttendances = asyncHandler(
    async (req: TypedRequest<UpdateAttendancesRequest, AttendancesIdParam>, res: TypedResponse<UpdateMeetingData>) => {
        const { meetingId } = req.params;

        const meeting = await findMeeting(meetingId, res);
        if (!meeting) {
            return;
        }

        meeting.attendance = req.body.attendance.map((attendance) => {
            return { ...attendance, user: attendance.user.id };
        });

        const saved = await meeting.save();
        if (saved) {
            res.ok({ meeting: await meeting.asPopulated() });
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
 * @desc    Add a new meeting
 * @route   POST /api/meetings
 */
const addMeeting = asyncHandler(async (req: TypedRequest<AddMeetingRequest>, res: TypedResponse<AddMeetingData>) => {
    const userIds = req.body.users.map((user) => ({ user: user.id }));

    const { users: _, ...rest } = req.body;

    const newMeeting = await Meeting.create({
        ...rest,
        creator: req.body.requester,
        attendance: userIds,
    });

    res.ok({
        meeting: await Meeting.findById(newMeeting._id).populate(['attendance', 'attendance.user']),
    });
});

/**
 * @desc    Edit a specific meeting
 * @route   PATCH /api/meetings/:meetingId
 */
const updateMeeting = asyncHandler(
    async (req: TypedRequest<UpdateMeetingRequest, MeetingIdParam>, res: TypedResponse<UpdateMeetingData>) => {
        const meeting = await Meeting.findByIdAndUpdate(
            req.params.meetingId,
            {
                ...req.body,
                creator: req.body.requester,
            },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!meeting) {
            res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
            return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        meeting.attendance = req.body.users.map((u) => ({ user: u.id }));
        await meeting.save();

        res.ok({ meeting: await Meeting.findById(meeting._id).populate(['attendance', 'attendance.user']) });
    },
);

const endMeeting = asyncHandler(
    async (req: TypedRequest<EndMeetingRequest, MeetingIdParam>, res: TypedResponse<UpdateMeetingData>) => {
        const { finishTime } = req.body;
        const meeting = await Meeting.findByIdAndUpdate(
            req.params.meetingId,
            { finishTime },
            {
                new: true,
                runValidators: true,
            },
        );
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

/**
 * @desc delete the attendance list of a specific meeting
 * @route DELETE /api/meetings/attendance/:meetingId
 */
const deleteMeetingAttendanceList = asyncHandler(async (req: TypedRequestParams<MeetingIdParam>, res: Response) => {
    const meeting = await Meeting.findById(req.params.meetingId);
    if (!meeting) {
        return res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
    }
    meeting.attendance = [];
    await meeting.save();
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
    modifyMeetingAttendances,
    getMeetingFeedback,
    getMeetingFeedbackForUser,
    addMeetingFeedback,
    updateMeetingFeedback,
    endMeeting,
    deleteMeetingAttendanceList,
};
