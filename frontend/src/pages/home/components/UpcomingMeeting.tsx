import { faChevronDown, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClickAwayListener } from '@mui/base';
import MeetingDTO from '@shared/dtos/MeetingDTO';
import { UpdateMeetingRequest } from '@shared/requests/MeetingRequests';
import { GetAllUsersData } from '@shared/responses/UserResponsesData';
import { useEffect, useState } from 'react';
import { useMeetingContext } from '../../../contexts/MeetingContext';
import { useUserContext } from '../../../contexts/UserContext';
import Button from '../../../utility_components/Button';
import ConfirmModal from '../../../utility_components/ConfirmModal';
import { DropdownMenu } from '../../../utility_components/DropdownMenu';
import LoadingDots from '../../../utility_components/Loading/LoadingDots';
import { getCombinedTime } from '../../../utils/durationUtil';
import { getRelativeTime, nth } from '../../../utils/timeUtil';
import { MeetingModal, TFormValues } from '../MeetingModal';
import './meeting.css';

type UpcommingMeetingProps = {
    meeting: MeetingDTO;
};

export default function UpcomingMeeting({ meeting }: UpcommingMeetingProps) {
    const { name, startTime, finishTime, description, location, attendance: _ } = meeting;
    const userContext = useUserContext();
    const meetingContext = useMeetingContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditMeetingOpen, setIsEditMeetingOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState<GetAllUsersData>();

    useEffect(() => {
        const getRoles = async () => {
            const data = await userContext.fetcher('GET /api/users');
            if (!data) {
                return;
            }
            setUsers(data);
        };
        getRoles();
    }, []);

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

    const showDeleteModal = () => {
        setShowModal(true);
        handleClickAway();
    };

    const handleClickAway = () => {
        setOpenDropdown(false);
    };

    async function handleDeleteMeeting() {
        setIsLoading(true);
        await userContext.fetcher('DELETE /api/meetings/:meetingId', undefined, {
            meetingId: meeting.id,
        });

        meetingContext.removeMeeting(meeting.id);
        setIsEditMeetingOpen(false);

        setIsLoading(false);
    }

    async function editMeeting(formValues: TFormValues) {
        const { startTime, finishTime } = getCombinedTime(
            formValues.startDate,
            formValues.startTime,
            formValues.duration,
        );
        const meetingRequest: UpdateMeetingRequest = {
            ...formValues,
            startTime: startTime,
            finishTime: finishTime,
            location: {
                ...formValues.location,
                id: meeting.location.id,
            },
        };

        setIsLoading(true);
        const data = await userContext.fetcher('PATCH /api/meetings/:meetingId', meetingRequest, {
            meetingId: meeting.id,
        });
        setIsLoading(false);

        if (data) {
            meetingContext.updateMeeting(data.meeting);
            setIsEditMeetingOpen(false);
        }
    }

    if (isLoading) {
        return <LoadingDots />;
    }

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
                                                showDeleteModal();
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
                                <strong>Location: </strong>
                                {location.location.startsWith('http') ? (
                                    <a
                                        href={location.location}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'blue' }}
                                    >
                                        {location.location}
                                    </a>
                                ) : (
                                    location.location
                                )}
                            </div>

                            <div className="mb-5">
                                <strong>Attendees: </strong>
                                <ul className="list-disc list-inside">
                                    {meetingContext.meetings[meeting.id].attendance.map((attendance) => {
                                        return <li key={attendance.user.id}>{attendance.user.name}</li>;
                                    })}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="dDays">Opens in {getRelativeTime(startTime)}</div>
                    )}
                </div>
            </div>
            {/* Force recreate modal */}
            {isEditMeetingOpen && (
                <MeetingModal
                    isOpen={isEditMeetingOpen}
                    setIsOpen={setIsEditMeetingOpen}
                    users={users ? users.users : []}
                    onSubmit={editMeeting}
                    meeting={meeting}
                />
            )}
            {showModal && (
                <ConfirmModal
                    header="Delete meeting"
                    text="Are you sure you want to delete meeting?"
                    leftButtonText="Yes"
                    rightButtonText="No"
                    setOpenModal={setShowModal}
                    onAccept={handleDeleteMeeting}
                />
            )}
        </>
    );
}
