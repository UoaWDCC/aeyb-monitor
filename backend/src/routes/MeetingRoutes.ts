import { Router } from 'express';

import {
    getAllMeetings,
    getMeeting,
    addMeeting,
    deleteMeeting,
    updateMeeting,
} from '../controllers/MeetingController';

const MeetingRouter = Router();

MeetingRouter.route('/').get(getAllMeetings).post(addMeeting);
MeetingRouter.route('/:meetingId')
    .get(getMeeting)
    .delete(deleteMeeting)
    .patch(updateMeeting);

export default MeetingRouter;
