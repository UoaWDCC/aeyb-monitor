import MeetingDTO from '@shared/dtos/MeetingDTO';
import './meeting.css';
import { getRelativeTime, nth } from '../../../utils/timeUtil';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCog } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenu } from '../../../utility_components/DropdownMenu';
import Button from '../../../utility_components/Button';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import ConfirmModal from '../../../utility_components/ConfirmModal/ConfirmModal';
import NewMeeting from './NewMeeting';
import { useUserContext } from '../../../contexts/UserContext';

type UpcommingMeetingProps = {
    meeting: MeetingDTO;
};

export default function UpcomingMeeting({ meeting }: UpcommingMeetingProps) {
    const { name, startTime, finishTime, description, location, attendance } = meeting;
    const userContext = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditMeetingOpen, setIsEditMeetingOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const openMeeting = () => {
        setIsOpen(!isOpen);
    };

    const days = ['Sunday ', 'Monday ', 'Tuesday ', 'Wednesday ', 'Thursday ', 'Friday ', 'Saturday '];
    const startDate = new Date(startTime);
    const finishDate = new Date(finishTime);

    const handleEditMeeting = () => {
        setIsEditMeetingOpen(true);
        handleClickAway();
    };

    const handleDeleteMeeting = () => {
        setShowModal(true);
        handleClickAway();
    };

    const handleClickAway = () => {
        setOpenDropdown(false);
    };

    return (
        <>
            <div className="upcomingMeeting relative">
                <div className="Header flex justify-between">
                    <div className="meetingTitle capitalize">
                        {name}
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`cursor-pointer ${isOpen ? 'toggle-up' : 'toggle-down'} ml-5`}
                            size="sm"
                            onClick={openMeeting}
                        />
                    </div>
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <div>
                            {userContext.hasPermission('MANAGE_MEETINGS') && (
                                <FontAwesomeIcon
                                    icon={faCog}
                                    size="lg"
                                    className="cog cursor-pointer"
                                    onClick={() => setOpenDropdown(!openDropdown)}
                                />
                            )}
                            {openDropdown && (
                                <DropdownMenu
                                    items={[
                                        <Button key="edit" size="small" color="white" onClick={handleEditMeeting}>
                                            Edit meeting
                                        </Button>,
                                        <Button
                                            key="delete"
                                            size="small"
                                            color="white"
                                            onClick={() => {
                                                handleDeleteMeeting();
                                            }}
                                        >
                                            Delete meeting
                                        </Button>,
                                    ]}
                                />
                            )}
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
                                {nth(startDate.getDate())} {startDate.toLocaleString('default', { month: 'long' })} at{' '}
                                {startDate.getHours() % 12}:
                                {startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes()}{' '}
                                {startDate.getHours() >= 12 ? 'PM' : 'AM'}
                            </div>

                            <div className="mb-5">
                                <strong>End Time: </strong> {days[finishDate.getDay()]} {finishDate.getDate()}
                                {nth(finishDate.getDate())} {finishDate.toLocaleString('default', { month: 'long' })} at{' '}
                                {finishDate.getHours() % 12}:
                                {finishDate.getMinutes() < 10 ? '0' + finishDate.getMinutes() : finishDate.getMinutes()}{' '}
                                {finishDate.getHours() >= 12 ? 'PM' : 'AM'}
                            </div>

                            <div className="mb-5">
                                <strong>Location: </strong> {location.location}
                            </div>

                            <div className="mb-5">
                                <strong>Attendees: </strong>
                            </div>
                        </div>
                    ) : (
                        <div className="dDays">Opens in {getRelativeTime(startTime)}</div>
                    )}
                </div>
            </div>
            <NewMeeting
                isNewMeetingOpen={isEditMeetingOpen}
                setIsNewMeetingOpen={setIsEditMeetingOpen}
                isEditMeeting={true}
                meetingdto={meeting}
            />
            {showModal && (
                <ConfirmModal
                    header="Delete meeting"
                    text="Are you sure you want to delete meeting?"
                    leftButtonText="Yes"
                    rightButtonText="No"
                    setOpenModal={setShowModal}
                    onAccept={() => console.log('delete meeting')}
                />
            )}
        </>
    );
}
