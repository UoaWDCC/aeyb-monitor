import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocationDTO from '@shared/dtos/LocationDTO';
import MeetingDTO, { MeetingType } from '@shared/dtos/MeetingDTO';
import { AddMeetingRequest, UpdateMeetingRequest } from '@shared/requests/MeetingRequests';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import RoleDTO from '../../../../../shared/dtos/RoleDTO';
import { GetAllUsersData } from '../../../../../shared/responses/UserResponsesData';
import { useMeetingContext } from '../../../contexts/MeetingContext';
import { useUserContext } from '../../../contexts/UserContext';
import DatePickerUtil from '../../../utility_components/DatePickerUtil';
import LoadingDots from '../../../utility_components/Loading/LoadingDots';
import { durationToNumber, getCombinedTime, numberToDuration } from '../../../utils/durationUtil';
import { getTimeDifferenceInMinutes, roundToHour } from '../../../utils/timeUtil';
import AutocompleteInput from './AutocompleteRoleInput';

type FormValuesType = {
    type: MeetingType;
    name: string;
    startDate: Date;
    startTime: Date;
    duration: number;
    location: Omit<LocationDTO, 'id'>;
    roles: RoleDTO[];
    description?: string;
};

const defaultValues: FormValuesType = {
    name: '',
    type: 'meeting',
    location: { location: '', type: 'inPerson' },
    description: '',
    startDate: roundToHour(new Date()),
    startTime: roundToHour(new Date()),
    duration: 60, // default 1-hour duration
    roles: [],
};

type NewMeetingProps = {
    isNewMeetingOpen: boolean;
    setIsNewMeetingOpen: (value: boolean) => void;
    isEditMeeting: boolean;
    meetingInfo?: MeetingDTO;
};
export default function NewMeeting({
    isNewMeetingOpen,
    setIsNewMeetingOpen,
    isEditMeeting,
    meetingInfo,
}: NewMeetingProps) {
    const form: FormValuesType = isEditMeeting
        ? {
              ...meetingInfo,
              startTime: new Date(meetingInfo.startTime),
              startDate: new Date(meetingInfo.finishTime),
              duration: getTimeDifferenceInMinutes(meetingInfo.startTime, meetingInfo.finishTime),
              roles: [],
          }
        : defaultValues;

    const userContext = useUserContext();
    const meetingContext = useMeetingContext();

    const [formValues, setFormValues] = useState<FormValuesType>(form);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleNestedObjectChange = (nestedObjectKey: keyof FormValuesType, { objKey, objType }) => {
        setFormValues({
            ...formValues,
            [nestedObjectKey]: {
                ...[nestedObjectKey],
                [objKey]: objType,
            },
        });
    };

    const handleStartDateChange = (date: Date) => {
        setFormValues({
            ...formValues,
            startDate: date,
        });
    };

    const handleStartTimeChange = (time: Date) => {
        setFormValues({
            ...formValues,
            startTime: time,
        });
    };

    const locationChange = (e) => {
        const objKey = e.target.name;
        const objType = e.target.value;
        handleNestedObjectChange('location', { objKey, objType });
    };

    const handleDurationChange = (e) => {
        setFormValues({
            ...formValues,
            duration: durationToNumber(e.target.value),
        });
    };

    function handleExit() {
        setIsNewMeetingOpen(false);
        setFormValues(defaultValues);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (formValues.startTime.getTime() < Date.now()) {
            alert('Start time cannot be in the past');
            return;
        }

        if (formValues.duration <= 0) {
            alert('Duration must be positive');
            return;
        }

        if (isEditMeeting) {
            editMeeting();
        } else {
            createMeeting();
        }

        setSelectedUsers([]);
    }

    async function createMeeting() {
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
            users: selectedUsers,
        };

        setIsLoading(true);
        const data = await userContext.fetcher('POST /api/meetings', meetingRequest);
        setIsLoading(false);

        if (data) {
            meetingContext.addMeeting(data.meeting);
            setIsNewMeetingOpen(false);
            setFormValues(defaultValues);
        }
    }

    async function editMeeting() {
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
                id: meetingInfo.location.id,
            },
        };

        setIsLoading(true);
        const data = await userContext.fetcher('PATCH /api/meetings/:meetingId', meetingRequest, {
            meetingId: meetingInfo.id,
        });
        setIsLoading(false);

        if (data) {
            meetingContext.updateMeeting(data.meeting);
            setIsNewMeetingOpen(false);
            setFormValues(defaultValues);
        }
    }

    if (isLoading) {
        return <LoadingDots />;
    }
    return (
        isNewMeetingOpen && (
            <div className="flex items-center justify-center fixed h-screen w-full top-0 left-0 z-50">
                <div className="opacity-50 bg-gray-600 w-full h-full absolute top-0 left-0 z-20"></div>
                <div className="bg-white p-5 opacity-100 z-30 rounded-lg w-1/2 flex flex-col items-center relative">
                    <button
                        className="rounded-md text-2xl text-black px-5 absolute top-0 right-0 mt-2 mr-2"
                        onClick={handleExit}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                    <h1 className="my-5 text-xl">{isEditMeeting ? 'Edit meeting detail' : 'Create new meeting'}</h1>

                    <form className="text-lg w-full flex flex-col items-center" onSubmit={handleSubmit}>
                        <label className="block text-gray-700 mb-1 w-full" htmlFor="name">
                            Meeting Name
                        </label>
                        <div className="relative w-full my-2">
                            <input
                                id="name"
                                className="focus:outline-none rounded-md w-full py-2 pl-3 pr-10 transition-colors duration-200 bg-gray-50 focus:bg-gray-100"
                                name="name"
                                type="text"
                                placeholder="Enter meeting name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                required={true}
                            />
                        </div>

                        <label className="block text-gray-700 mb-1 w-full" htmlFor="location">
                            Location
                        </label>
                        <div className="relative w-full my-2">
                            <input
                                id="location"
                                className="focus:outline-none rounded-md w-full py-2 pl-3 pr-10 transition-colors duration-200 bg-gray-50 focus:bg-gray-100"
                                name="location"
                                type="text"
                                placeholder="Enter location"
                                value={formValues.location.location}
                                onChange={locationChange}
                                required={true}
                            />
                        </div>

                        <div className="flex w-full items-center">
                            <div className="flex-none w-1/3 pl-1 pr-1">
                                <DatePickerUtil
                                    id="startDate"
                                    label="Start Date"
                                    value={formValues.startDate}
                                    handleChange={handleStartDateChange}
                                />
                            </div>
                            <div className="flex-none w-1/3 pl-1 pr-1">
                                <DatePickerUtil
                                    id="startTime"
                                    label="Start Time"
                                    value={formValues.startTime}
                                    handleChange={handleStartTimeChange}
                                    showTimeSelect
                                />
                            </div>
                            <div className="flex-none w-1/3 pl-1 pr-1">
                                <div className="relative w-full my-2">
                                    <label className="block text-gray-700 mb-1 w-full" htmlFor="duration">
                                        Duration
                                    </label>
                                    <select
                                        id="duration"
                                        name="duration"
                                        className="focus:outline-none rounded-md w-full py-2 transition-colors duration-200 bg-gray-50 focus:bg-gray-100"
                                        onChange={handleDurationChange}
                                        defaultValue={numberToDuration(formValues.duration)}
                                    >
                                        {[...Array(5).keys()]
                                            .map((hour) =>
                                                [0, 15, 30, 45].map((minute) => (
                                                    <option key={`${hour}-${minute}`} value={`${hour}:${minute}`}>
                                                        {hour}h {minute}m
                                                    </option>
                                                )),
                                            )
                                            .flat()}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* magic */}
                        <AutocompleteInput
                            options={users.users.filter((user) => user.id != userContext.user.id)}
                            label="Which group of people are you inviting?"
                            value={selectedUsers}
                            onChange={setSelectedUsers}
                        />

                        {/* Description */}
                        <label className="block text-gray-700 mb-1 w-full" htmlFor="description">
                            Description
                        </label>
                        <div className="relative w-full my-2">
                            <textarea
                                id="description"
                                className="focus:outline-none rounded-md w-full py-2 pl-3 pr-10 transition-colors duration-200 bg-gray-50 focus:bg-gray-100"
                                name="description"
                                placeholder="Enter description"
                                rows={5}
                                value={formValues.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            className="bg-[#7d6ca3] hover:bg-opacity-90 text-white py-2 px-4 rounded-md text-xl mt-4 transition-transform duration-200 transform hover:scale-95"
                            type="submit"
                        >
                            {isEditMeeting ? 'Edit meeting detail' : 'Create new meeting'}
                        </button>
                    </form>
                </div>
            </div>
        )
    );
}
