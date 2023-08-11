import MeetingDTO from '@shared/dtos/MeetingDTO';
import './meeting.css';
import { getRelativeTime } from '../../../utils/timeUtil';
import { useDarkMode } from '../../../utility_components/DarkModeContext';

type UpcommingMeetingProps = {
    meeting: MeetingDTO;
};

export default function UpcomingMeeting({ meeting }: UpcommingMeetingProps) {
    const openMeetingPage = () => {
        console.log(`opening the "${meeting.name}" page`);
    };

    const { darkMode } = useDarkMode(); // Get the dark mode state

    return (
        <div className={'upcomingMeeting ' + (darkMode ? 'bg-[#525a8c]' : 'bg-[#d1d7f7]')} onClick={openMeetingPage}>
            <div className="meetingTitle capitalize">{meeting.name}</div>
            <div className="dDay">Opens in {getRelativeTime(meeting.startTime)}</div>
        </div>
    );
}
