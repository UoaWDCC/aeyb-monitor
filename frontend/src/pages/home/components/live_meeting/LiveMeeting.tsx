import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MeetingDTO from '@shared/dtos/MeetingDTO';
import './livemeeting.css'
import { getRelativeTime } from 'src/utils/timeUtil';

export default function LiveMeeting(props: { meeting: MeetingDTO }) {

    const [timeLeft, setTimeLeft] = useState(getRelativeTime(props.meeting.finishTime))

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(getRelativeTime(props.meeting.finishTime)), 60_000);
        return () => clearInterval(interval);
    }, [props.meeting.startTime, props.meeting.finishTime]);

    const navigate = useNavigate();

    const openMeetingPage = () => {
        navigate(`../activemeetingpage`, { replace: true });
    }

    return (
        <div className='liveMeeting my-2' onClick={openMeetingPage}>
            <div className='flex flex-row justify-between'>
                <div className='liveStatus'><span className='liveBall'>&#x25cf;</span> LIVE</div>
                <div className='timeleft'>{timeLeft} left</div>
            </div>
            <div className='meetingTitle capitalize'>{props.meeting.name}</div>
        </div>
    )
}
