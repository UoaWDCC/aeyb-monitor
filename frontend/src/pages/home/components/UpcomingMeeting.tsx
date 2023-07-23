import MeetingDTO from '@shared/dtos/MeetingDTO';
import './meeting.css';
import { getRelativeTime } from '../../../utils/timeUtil';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type UpcommingMeetingProps = {
    meeting: MeetingDTO;
};

export default function UpcomingMeeting({ meeting }: UpcommingMeetingProps) {
    const { name, startTime, finishTime, description, location } = meeting;
    const [isOpen, setIsOpen] = useState(false);
    const openMeeting = () => {
        setIsOpen(!isOpen);
        console.log(`opening the "${meeting.name}" meeting`);
    };

    const days = ['Sunday ', 'Monday ', 'Tuesday ', 'Wednesday ', 'Thursday ', 'Friday ', 'Saturday '];
    const startDate = new Date(startTime);
    const finishDate = new Date(finishTime);

    function nth(n: number) {
        return ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th';
    }

    return (
        <div className="upcomingMeeting">
            <div className="meetingTitle capitalize flex justify-between">
                {meeting.name}
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`cursor-pointer ${isOpen ? 'toggle-up' : 'toggle-down'}`}
                    size="l"
                    onClick={openMeeting}
                />
            </div>
            {isOpen ? (
                <div className="meetingDetails">
                    <div>Description: {description}</div>
                    <div>
                        Start Time: {days[startDate.getDay()]} {startDate.getDate()}
                        {nth(startDate.getDate())} at {startDate.getHours() % 12}:
                        {startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes()}{' '}
                        {startDate.getHours() >= 12 ? 'PM' : 'AM'}
                    </div>
                    <div>
                        End Time: {days[finishDate.getDay()]} {finishDate.getDate()}
                        {nth(finishDate.getDate())} at {finishDate.getHours() % 12}:
                        {finishDate.getMinutes() < 10 ? '0' + finishDate.getMinutes() : finishDate.getMinutes()}{' '}
                        {finishDate.getHours() >= 12 ? 'PM' : 'AM'}
                    </div>
                    <div>Location: {location}</div>
                    <div>Attendees: {meeting.attendance.invited.userIds}</div>
                </div>
            ) : (
                <div className="dDay">Opens in {getRelativeTime(meeting.startTime)}</div>
            )}
        </div>
    );
}
