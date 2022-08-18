import { Router } from 'express';
import protect from '../middleware/AuthMiddleware';

import { getAllMeetings, getMeeting, addMeeting, deleteMeeting, updateMeeting } from '../controllers/MeetingController';

const MeetingRouter = Router();

MeetingRouter.route('/').get(protect(), getAllMeetings).post(protect(), addMeeting);
MeetingRouter.route('/:meetingId')
    .get(protect(), getMeeting)
    .delete(protect(), deleteMeeting)
    .patch(protect(), updateMeeting);

export default MeetingRouter;
