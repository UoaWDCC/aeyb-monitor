import { useNavigate } from 'react-router-dom';
import MeetingDTO from '@shared/dtos/MeetingDTO';
import './meeting.css';
import { getRelativeTime } from '../../../utils/timeUtil';
import Button from '../../../utility_components/Button';
import { useState } from 'react';
import AttendanceModal from '../../../utility_components/AttendanceModal';

type PostMeetingProps = {
    meeting: MeetingDTO;
};

export default function PostMeeting({ meeting }: PostMeetingProps) {
    // const navigate = useNavigate();

    // const openMeetingPage = () => {
    //     navigate("../aftermeetingpage");
    // }

    const [isAttModalOpen, setIsAttModalOpen] = useState(false);

    const openAttendanceModal = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setIsAttModalOpen(true);
    };

    return (
        <div
            className="postMeeting"
            // onClick={openMeetingPage}
        >
            <div className="relative">
                <div className="meetingTitle capitalize">{meeting.name}</div>
                <Button onClick={openAttendanceModal} extraStyles="absolute right-0 top-0">
                    Attendance
                </Button>
            </div>
            <div className="dDay">Finished {getRelativeTime(meeting.finishTime)} ago</div>
            <AttendanceModal isOpen={isAttModalOpen} setIsOpen={setIsAttModalOpen} meeting={meeting} />
        </div>
    );
}
