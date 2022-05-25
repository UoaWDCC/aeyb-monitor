import { Router } from 'express';

import {
    getAllMeetings,
    createMeeting,
    deleteMeeting,
} from '../controllers/MeetingController';

const MeetingRouter = Router();

MeetingRouter.route('/').get(getAllMeetings).post(createMeeting);
MeetingRouter.route('/:meetingId').delete(deleteMeeting);

export default MeetingRouter;
