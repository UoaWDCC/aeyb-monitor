import { Router } from 'express';
import protect from '../middleware/AuthMiddleware';

import { getAllMeetings, getMeeting, addMeeting, deleteMeeting, updateMeeting, updateAbsence, updateAttendance, addFeedback } from '../controllers/MeetingController';
import Permission from '../shared/Types/utils/Permission';

const MeetingRouter = Router();

MeetingRouter.route('/')
    .get(protect(Permission.VIEW_MEETINGS), getAllMeetings)
    .post(protect(Permission.ADD_MEETINGS), addMeeting);
MeetingRouter.route('/:meetingId')
    .get(protect(Permission.VIEW_MEETINGS), getMeeting)
    .delete(protect(Permission.DELETE_MEETINGS), deleteMeeting)
    .patch(protect(Permission.UPDATE_MEETINGS), updateMeeting);
MeetingRouter.route('/:meetingId/attendance/going').post(protect(Permission.VIEW_MEETINGS), updateAbsence);
MeetingRouter.route('/:meetingId/attendance/feedback').patch(protect(Permission.VIEW_MEETINGS), addFeedback);
MeetingRouter.route('/:meetingId/attendance/:userId').patch(protect(Permission.ADD_MEETINGS), updateAttendance);

export default MeetingRouter;
