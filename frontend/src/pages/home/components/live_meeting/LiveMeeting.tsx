import { useState, useEffect } from 'react';
import './livemeeting.css';
import { getRelativeTime } from '../../../../utils/timeUtil';
import Button from '../../../../utility_components/Button';
import AttendanceModal from '../../../../utility_components/AttendanceModal';
import { useUserContext } from '../../../../contexts/UserContext';
import ConfirmModal from '../../../../utility_components/ConfirmModal';
import { useMeetingContext } from '../../../../contexts/MeetingContext';
import MeetingDTO from '../../../../../../shared/dtos/MeetingDTO';

type LiveMeetingProps = {
    meeting: MeetingDTO;
};
export default function LiveMeeting({ meeting }: LiveMeetingProps) {
    const { id, name, startTime, finishTime } = meeting;
    const [timeLeft, setTimeLeft] = useState(getRelativeTime(finishTime));
    const [isConfModalOpen, setIsConfModalOpen] = useState(false);
    const [isAttModalOpen, setIsAttModalOpen] = useState(false);

    const userContext = useUserContext();
    const meetingContext = useMeetingContext();

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(getRelativeTime(finishTime)), 60_000);
        return () => clearInterval(interval);
    }, [startTime, finishTime]);

    const openAttendanceModal = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setIsAttModalOpen(true);
    };

    async function endMeeting() {
        await userContext.fetcher(
            'PATCH /api/meetings/:meetingId/end',
            {
                finishTime: Date.now(),
            },
            {
                meetingId: id,
            },
        );
        meetingContext.removeMeeting(id);
    }

    return (
        <>
            <div className="liveMeeting my-2">
                <div className="flex flex-row justify-between">
                    <div className="liveStatus">
                        <span className="liveBall">&#x25cf;</span> LIVE
                    </div>
                    <div className="timeleft">{timeLeft} left</div>
                </div>
                <div className="meetingTitle capitalize relative">
                    {name}
                    {userContext.hasPermission('MANAGE_MEETINGS') && (
                        <div className="absolute right-0 top-0">
                            <Button onClick={openAttendanceModal}>Attendance</Button>
                            <Button color="#ff0201" onClick={() => setIsConfModalOpen(true)} extraStyles="ml-2">
                                End Meeting
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <AttendanceModal isOpen={isAttModalOpen} setIsOpen={setIsAttModalOpen} meeting={meeting} />
            {isConfModalOpen && (
                <ConfirmModal
                    header="End Meeting"
                    text="Are you sure you want to end the meeting?"
                    leftButtonText="End Meeting"
                    rightButtonText="Cancel"
                    setOpenModal={setIsConfModalOpen}
                    onAccept={endMeeting}
                />
            )}
        </>
    );
}
