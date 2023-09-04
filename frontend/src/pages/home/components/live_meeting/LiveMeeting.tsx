import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './livemeeting.css';
import { getRelativeTime } from '../../../../utils/timeUtil';
import Button from '../../../../utility_components/Button';
import AttendanceModal from '../../../../utility_components/AttendanceModal';

type LiveMeetingProps = {
    id: string;
    name: string;
    startTime: number;
    finishTime: number;
};
export default function LiveMeeting({ id, name, startTime, finishTime }: LiveMeetingProps) {
    const [timeLeft, setTimeLeft] = useState(getRelativeTime(finishTime));
    const [isAttModalOpen, setIsAttModalOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(getRelativeTime(finishTime)), 60_000);
        return () => clearInterval(interval);
    }, [startTime, finishTime]);

    const navigate = useNavigate();

    const openMeetingPage = () => {
        navigate(`../activemeeting/${id}`, { replace: true });
    };

    const openAttendanceModal = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setIsAttModalOpen(true);
    };

    return (
        <>
            <div className="liveMeeting my-2" onClick={openMeetingPage}>
                <div className="flex flex-row justify-between">
                    <div className="liveStatus">
                        <span className="liveBall">&#x25cf;</span> LIVE
                    </div>
                    <div className="timeleft">{timeLeft} left</div>
                </div>
                <div className="meetingTitle capitalize relative">
                    {name}
                    <Button color="#ff0201" onClick={openAttendanceModal} extraStyles="absolute right-0 top-0">
                        Attendance
                    </Button>
                </div>
            </div>
            <AttendanceModal isOpen={isAttModalOpen} setIsOpen={setIsAttModalOpen} />
        </>
    );
}
