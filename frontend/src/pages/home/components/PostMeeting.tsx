import { useNavigate } from 'react-router-dom';
import MeetingDTO from '@shared/dtos/MeetingDTO';
import './meeting.css';
import { getRelativeTime } from '../../../utils/timeUtil';
import { useDarkMode } from '../../../utility_components/DarkModeContext';

export default function PostMeeting(props: { meeting: MeetingDTO }) {
    const navigate = useNavigate();

    const openMeetingPage = () => {
        navigate('../aftermeetingpage');
    };

    const { darkMode } = useDarkMode(); // Get the dark mode state

    return (
        <div className={'postMeeting ' + (darkMode ? 'bg-[#733b81]' : 'bg-[#ffe599]')} onClick={openMeetingPage}>
            <div className="meetingTitle capitalize">{props.meeting.name}</div>
            <div className="dDay">Finished {getRelativeTime(props.meeting.finishTime)} ago</div>
        </div>
    );
}
