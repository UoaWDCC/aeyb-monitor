import MeetingDTO from '@shared/dtos/MeetingDTO';
import './meeting.css';
import { getRelativeTime } from '../../../utils/timeUtil';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCog } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenu } from '../../../utility_components/DropdownMenu';
import Button from '../../../utility_components/Button';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import ConfirmModal from '../../../utility_components/ConfirmModal/ConfirmModal';

type UpcommingMeetingProps = {
    meeting: MeetingDTO;
};

export default function UpcomingMeeting({ meeting }: UpcommingMeetingProps) {
    const { name, startTime, finishTime, description, location } = meeting;
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const openMeeting = () => {
        setIsOpen(!isOpen);
        console.log(`opening the "${meeting.name}" meeting`);
    };

    const days = ['Sunday ', 'Monday ', 'Tuesday ', 'Wednesday ', 'Thursday ', 'Friday ', 'Saturday '];
    const startDate = new Date(startTime);
    const finishDate = new Date(finishTime);

    const editMeeting = (
        <Button size="small" color="white">
            Edit meeting
        </Button>
    );

    const deleteMeeting = (
        <Button size="small" color="white" onClick={() => setShowModal(true)}>
            Delete meeting
        </Button>
    );

    const deleteModal = (
        <ConfirmModal
            header="Delete meeting"
            text="Are you sure you want to delete meeting?"
            leftButtonText="Yes"
            rightButtonText="No"
            setOpenModal={setShowModal}
            onAccept={() => console.log('hello')}
        />
    );

    const handleClickAway = () => {
        setOpenDropdown(false);
    };

    function nth(n: number) {
        return ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th';
    }

    return (
        <>
            <div className="upcomingMeeting relative">
                <div className="Header flex justify-between">
                    <div className="meetingTitle capitalize">
                        {meeting.name}
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`cursor-pointer ${isOpen ? 'toggle-up' : 'toggle-down'} ml-5`}
                            size="sm"
                            onClick={openMeeting}
                        />
                    </div>
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <div>
                            <FontAwesomeIcon
                                icon={faCog}
                                size="lg"
                                className="cog cursor-pointer"
                                onClick={() => setOpenDropdown(!openDropdown)}
                            />
                            {openDropdown && <DropdownMenu items={[editMeeting, deleteMeeting]} />}
                        </div>
                    </ClickAwayListener>
                </div>
                <div className={`wrapper ${isOpen ? 'open' : ''}`}>
                    {isOpen ? (
                        <div className="meetingDetails break-words">
                            <div className="mb-5">
                                <strong>Description: </strong> {description}
                            </div>

                            <div className="mb-5">
                                <strong>Start Time: </strong> {days[startDate.getDay()]} {startDate.getDate()}
                                {nth(startDate.getDate())} at {startDate.getHours() % 12}:
                                {startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes()}{' '}
                                {startDate.getHours() >= 12 ? 'PM' : 'AM'}
                            </div>

                            <div className="mb-5">
                                <strong>End Time: </strong> {days[finishDate.getDay()]} {finishDate.getDate()}
                                {nth(finishDate.getDate())} at {finishDate.getHours() % 12}:
                                {finishDate.getMinutes() < 10 ? '0' + finishDate.getMinutes() : finishDate.getMinutes()}{' '}
                                {finishDate.getHours() >= 12 ? 'PM' : 'AM'}
                            </div>

                            <div className="mb-5">
                                <strong>Location: </strong> {location}
                            </div>

                            <div className="mb-5">
                                <strong>Attendees: </strong> {meeting.attendance.invited.userIds}
                            </div>
                        </div>
                    ) : (
                        <div className="dDays">Opens in {getRelativeTime(meeting.startTime)}</div>
                    )}
                </div>
            </div>
            {showModal && deleteModal}
        </>
    );
}
