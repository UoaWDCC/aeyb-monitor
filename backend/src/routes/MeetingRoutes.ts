import { Router } from 'express';
import protect from '../middleware/AuthMiddleware';

import { getAllMeetings, getMeeting, addMeeting, deleteMeeting, updateMeeting } from '../controllers/MeetingController';
import Permission from '../shared/Types/utils/Permission';

const MeetingRouter = Router();

MeetingRouter.route('/')
    .get(protect(Permission.VIEW_MEETINGS), getAllMeetings)
    .post(protect(Permission.MANAGE_MEETINGS), addMeeting);
MeetingRouter.route('/:meetingId')
    .get(protect(Permission.VIEW_MEETINGS), getMeeting)
    .delete(protect(Permission.MANAGE_MEETINGS), deleteMeeting)
    .patch(protect(Permission.MANAGE_MEETINGS), updateMeeting);

export default MeetingRouter;
