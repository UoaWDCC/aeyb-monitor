import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import Meeting from '../models/MeetingModel';
import { TypedRequest, TypedRequestParams, TypedRequestQuery, TypedResponse } from '../types/UtilTypes';
import { MeetingIdAndUserIdParam, MeetingIdParam } from '../types/RequestParams';
import PaginationHandler from '../classes/PaginationHandler';
import {
    AddMeetingData,
    GetAllMeetingsData,
    GetMeetingData,
    UpdateMeetingData,
} from '../shared/Types/responses/MeetingResponses';
import { AddFeedBackRequest, AddMeetingRequest, UpdateAbsenceRequest, UpdateAttendanceRequest, UpdateMeetingRequest } from '../shared/Types/requests/MeetingRequests';
import { GetAllMeetingsQuery } from '../shared/Types/queries/MeetingQueries';

const paginationOptions = PaginationHandler.createOptions();

/**
 * @desc 	Get all the meetings
 * @route 	GET /api/meetings/
 */
const getAllMeetings = asyncHandler(
    async (req: TypedRequestQuery<GetAllMeetingsQuery>, res: TypedResponse<GetAllMeetingsData>) => {
        let query = Meeting.find();

        const filterHandlers: Record<string, (value: string) => void> = {
            before: (value) => (query = query.where('time').lt(Number.parseInt(value))),
            after: (value) => (query = query.where('time').gt(Number.parseInt(value))),
            creator: (value) => (query = query.where('creator').equals(value)),
            name: (value) => (query = query.where('name', new RegExp(value, 'i'))),
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
 * @desc 	Add a new meetings
 * @route 	POST /api/meetings/
 */
const addMeeting = asyncHandler(async (req: TypedRequest<AddMeetingRequest>, res: TypedResponse<AddMeetingData>) => {
    const newMeeting = await Meeting.create({
        ...req.body,
        creator: req.body.requester,
    });

    res.ok({ meeting: await newMeeting.asPopulated() });
});

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
            return res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
        }
        res.ok({ meeting: await meeting.asPopulated() });
    },
);
/**
 * @desc 	Update the absence of a user for a meeting
 * @route 	POST /api/meetings/:meetingId/attendance/going
 */
 const updateAbsence = asyncHandler(async (req: TypedRequest<UpdateAbsenceRequest, MeetingIdParam>, res) => {
    const meeting = await Meeting.findById(req.params.meetingId);
    if (!meeting) {
        return res.notFound(`There is no meeting with id ${req.params.meetingId}`);
    }
    const currentAttendance = meeting.attendance.get(req.body.requester._id);

    if (currentAttendance) {
        currentAttendance.canAttend = req.body.canAttend;
        currentAttendance.reason = req.body.reason;
        meeting.attendance.set(req.body.requester._id, currentAttendance);
    }

    meeting.markModified('attendance');
    await meeting.save();

    res.ok({ meeting });
});

/**
 * @desc    Add meeting rating and feeback for user for meeting
 * @route   PATCH /api/meetings/:meetingId/attendance/feedback
 */

const addFeedback = asyncHandler(async (req: TypedRequest<AddFeedBackRequest, MeetingIdParam>, res: Response) => {
    const meeting = await Meeting.findById(req.params.meetingId);
    if (!meeting) {
        return res.notFound(`There is no meeting with id ${req.params.meetingId}`);
    }

    const currentAttendance = meeting.attendance.get(req.body.requester._id);

    if (currentAttendance) {
        currentAttendance.rating = req.body.rating;
        currentAttendance.feedback = req.body.feedback;
        meeting.attendance.set(req.body.requester._id, currentAttendance);
    }

    meeting.markModified('attendance');
    await meeting.save();
    res.ok({ meeting });
});

/**
 * @desc   Update the attendance of a user
 * @route  PATCH /api/meetings/:meetingId/attendance/:userId
 */
const updateAttendance = asyncHandler(async (req: TypedRequest<UpdateAttendanceRequest, MeetingIdAndUserIdParam>, res) => {
    const meeting = await Meeting.findById(req.params.meetingId);

    if (!meeting) {
        return res.notFound(`There is no meeting with the id ${req.params.meetingId}`);
    }

    const currentAttendance = meeting.attendance.get(req.params.userId);
    if (currentAttendance) {
        currentAttendance.didAttend = req.body.didAttend;
        meeting.attendance.set(req.params.userId, currentAttendance);
    }

    meeting.markModified('attendance');
    await meeting.save();
    res.ok({ meeting });
});

export {
    getAllMeetings,
    getMeeting,
    addMeeting,
    deleteMeeting,
    updateMeeting,
    updateAbsence,
    updateAttendance,
    addFeedback,
};
