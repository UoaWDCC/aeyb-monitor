import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getRelativeTime } from '../meetingUtils';
import MeetingDTO from '../../../../shared/Types/dtos/MeetingDTO';
import './livemeeting.css'

export default function LiveMeeting(props: { meeting: MeetingDTO }) {

    const [timeLeft, setTimeLeft] = useState(getRelativeTime(props.meeting.time + 3_600_000))

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(getRelativeTime(props.meeting.time + 3_600_000)), 1_000);
        return () => clearInterval(interval);
    }, [props.meeting.time]);

    const navigate = useNavigate();

    const openMeetingPage = () => {
        navigate(`../activemeetingpage`, { replace: true });
    }

    return (
        <div className='liveMeeting my-2' onClick={openMeetingPage}>
            <div className='liveStatus'><span className='liveBall'>&#x25cf;</span> LIVE</div>
            <div className='meetingTitle'>{props.meeting.name}</div>
            <div className='timeleft'>{timeLeft} left</div>
        </div>
    )
}
