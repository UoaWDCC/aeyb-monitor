import LocationDTO from '@shared/dtos/LocationDTO';
import MeetingDTO, { MeetingType } from '@shared/dtos/MeetingDTO';
import { AddMeetingRequest } from '@shared/requests/MeetingRequests';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import RoleDTO from '../../../../../shared/dtos/RoleDTO';
import { GetAllUsersData } from '../../../../../shared/responses/UserResponsesData';
import { useMeetingContext } from '../../../contexts/MeetingContext';
import { useUserContext } from '../../../contexts/UserContext';
import LoadingDots from '../../../utility_components/Loading/LoadingDots';
import { getCombinedTime } from '../../../utils/durationUtil';
import { MeetingModal, TFormValues } from '../MeetingModal';

type NewMeetingProps = {
    isNewMeetingOpen: boolean;
    setIsNewMeetingOpen: (value: boolean) => void;
    meetingInfo?: MeetingDTO;
};
export default function NewMeeting({ isNewMeetingOpen, setIsNewMeetingOpen }: NewMeetingProps) {
    const userContext = useUserContext();
    const meetingContext = useMeetingContext();

    const [isLoading, setIsLoading] = useState(false);
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

    function handleSubmit(formValues: TFormValues) {
        if (formValues.startTime.getTime() < Date.now()) {
            alert('Start time cannot be in the past');
            return;
        }

        if (formValues.duration <= 0) {
            alert('Duration must be positive');
            return;
        }

        createMeeting(formValues);
    }

    async function createMeeting(formValues: TFormValues) {
        const { startTime, finishTime } = getCombinedTime(
            formValues.startDate,
            formValues.startTime,
            formValues.duration,
        );

        const meetingRequest: AddMeetingRequest = {
            name: formValues.name,
            type: formValues.type,
            location: formValues.location,
            description: formValues.description,
            startTime: startTime,
            finishTime: finishTime,
            users: formValues.users,
        };

        setIsLoading(true);
        const data = await userContext.fetcher('POST /api/meetings', meetingRequest);
        setIsLoading(false);

        if (data) {
            meetingContext.addMeeting(data.meeting);
            setIsNewMeetingOpen(false);
        }
    }

    if (isLoading) {
        return <LoadingDots />;
    }
    return (
        <>
            {/* Force refresh of modal */}
            {isNewMeetingOpen && (
                <MeetingModal
                    isOpen={isNewMeetingOpen}
                    onSubmit={handleSubmit}
                    setIsOpen={setIsNewMeetingOpen}
                    users={users ? users.users : []}
                    isCreate
                />
            )}
        </>
    );
}
