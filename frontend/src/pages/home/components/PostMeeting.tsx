import { useNavigate } from 'react-router-dom';
import MeetingDTO from '../../../shared/Types/dtos/MeetingDTO';
import './meeting.css'
import { getRelativeTime } from './meetingUtils';

export default function PostMeeting(props: { meeting: MeetingDTO }) {

    const navigate = useNavigate();

    const openMeetingPage = () => {
        navigate("../aftermeetingpage");
    }

    return (
        <div className='postMeeting' onClick={openMeetingPage}>
            <div className='meetingTitle capitalize'>{props.meeting.name}</div>
            {/* Meeting time is assumed to be 1 hour long at this stage, if we were to add meeting end time, we would need to change this to props.meeting.endTime (As currently in 11th of October) */}
            <div className='dDay'>Finished {getRelativeTime(props.meeting.time + 3_600_000)} ago</div>
        </div>
    )
}
