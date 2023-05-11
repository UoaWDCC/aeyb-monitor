import { Router } from 'express';
import protect from '../middleware/AuthMiddleware';

import {
    getAllMeetings,
    getMeeting,
    addMeeting,
    deleteMeeting,
    updateMeeting,
    endMeeting,
} from '../controllers/MeetingController';

const MeetingRouter = Router();

MeetingRouter.route('/').get(protect(), getAllMeetings).post(protect('MANAGE_MEETINGS'), addMeeting);
MeetingRouter.route('/:meetingId')
    .get(protect('VIEW_MEETINGS'), getMeeting)
    .delete(protect('MANAGE_MEETINGS'), deleteMeeting)
    .patch(protect('MANAGE_MEETINGS'), updateMeeting);
MeetingRouter.route('/:meetingId/end').patch(protect('MANAGE_MEETINGS'), endMeeting);

export default MeetingRouter;
