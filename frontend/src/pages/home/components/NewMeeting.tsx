import MeetingDTO from '@shared/dtos/MeetingDTO';
import { AddMeetingRequest } from '@shared/requests/MeetingRequests';
import { GetAllUsersData } from '@shared/responses/UserResponsesData';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
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
                    onSubmit={createMeeting}
                    setIsOpen={setIsNewMeetingOpen}
                    users={users ? users.users : []}
                    isCreate
                />
            )}
        </>
    );
}
