import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MeetingDTO from '@shared/dtos/MeetingDTO';
import './livemeeting.css';
import { getRelativeTime } from '../../../../utils/timeUtil';

type LiveMeetingProps = {
    id: string;
    name: string;
    startTime: number;
    finishTime: number;
};
export default function LiveMeeting({ id, name, startTime, finishTime }: LiveMeetingProps) {
    const [timeLeft, setTimeLeft] = useState(getRelativeTime(finishTime));

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(getRelativeTime(finishTime)), 60_000);
        return () => clearInterval(interval);
    }, [startTime, finishTime]);

    const navigate = useNavigate();

    const openMeetingPage = () => {
        navigate(`../activemeeting/${id}`, { replace: true });
    };

    return (
        <div className="liveMeeting my-2" onClick={openMeetingPage}>
            <div className="flex flex-row justify-between">
                <div className="liveStatus">
                    <span className="liveBall">&#x25cf;</span> LIVE
                </div>
                <div className="timeleft">{timeLeft} left</div>
            </div>
            <div className="meetingTitle capitalize">{name}</div>
        </div>
    );
}
