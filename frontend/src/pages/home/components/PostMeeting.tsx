import { useNavigate } from 'react-router-dom';
import MeetingDTO from '@shared/dtos/MeetingDTO';
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
            <div className='dDay'>Finished {getRelativeTime(props.meeting.finishTime)} ago</div>
        </div>
    )
}
