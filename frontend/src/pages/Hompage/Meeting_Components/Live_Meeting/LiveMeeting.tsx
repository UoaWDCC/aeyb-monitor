import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './livemeeting.css'

export default function LiveMeeting(prop: { title: string; startTime: Date; endTime: Date; }) {

    class LiveMeeting {

        constructor(title: string, startTime: Date, endTime: Date) {
            this.title = title;
            this.startTime = startTime;
            this.endTime = endTime;
        };

        title: string;
        startTime: Date;
        endTime: Date;
        timeLeft: number
    }

    const navigate = useNavigate();

    const meeting = new LiveMeeting(prop.title, prop.startTime, prop.endTime)
    const [timeLeft, setTimeLeft] = useState(Math.floor((meeting.endTime.getTime() - new Date().getTime()) / 60000))

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(Math.floor((meeting.endTime.getTime() - new Date().getTime()) / 60000)), 1000);
        return () => clearInterval(interval);
    }, [meeting.endTime]);


    const openMeetingPage = () => {
        navigate(`../activemeetingpage`, { replace: true });
    }

    return (
        <div className='liveMeeting' onClick={openMeetingPage}>
            <div className='liveStatus'><span className='liveBall'>&#x25cf;</span> LIVE</div>
            <div className='meetingTitle'>{meeting.title}</div>
            <div className='timeleft'>{timeLeft > 0 ? `${timeLeft} minutes left` : `Meeting Finished`}</div>
        </div>
    )
}
