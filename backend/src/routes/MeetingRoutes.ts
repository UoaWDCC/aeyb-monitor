import { Router } from 'express';
import protect from '../middleware/AuthMiddleware';

import {
    getAllMeetings,
    getMeeting,
    addMeeting,
    deleteMeeting,
    updateMeeting,
    getMeetingAttendance,
    modifyMeetingAttendance,
    getMeetingAttendanceForUser,
    getMeetingFeedbackForUser,
    addMeetingFeedback,
    updateMeetingFeedback,
    getMeetingFeedback,
} from '../controllers/MeetingController';

const MeetingRouter = Router();

MeetingRouter.route('/').get(protect(), getAllMeetings).post(protect('MANAGE_MEETINGS'), addMeeting);

MeetingRouter.route('/:meetingId')
    .get(protect('VIEW_MEETINGS'), getMeeting)
    .delete(protect('MANAGE_MEETINGS'), deleteMeeting)
    .patch(protect('MANAGE_MEETINGS'), updateMeeting);

MeetingRouter.route('/:meetingId/attendances').get(protect('VIEW_MEETINGS'), getMeetingAttendance);
MeetingRouter.route('/:meetingId/attendances/users/:userId')
    .get(protect('VIEW_MEETINGS'), getMeetingAttendanceForUser)
    .patch(protect('MANAGE_MEETINGS'), modifyMeetingAttendance);

MeetingRouter.route('/:meetingId/feedback')
    .get(protect('VIEW_MEETINGS'), getMeetingFeedback)
    .patch(protect('MANAGE_MEETINGS'), updateMeetingFeedback);
MeetingRouter.route('/meetings/:meetingId/feedback/users/:userId')
    .post(protect('MANAGE_MEETINGS'), addMeetingFeedback)
    .get(protect('VIEW_MEETINGS'), getMeetingFeedbackForUser);

export default MeetingRouter;
