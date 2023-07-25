import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useMeetingContext } from '../../../contexts/MeetingContext';
import { useUserContext } from '../../../contexts/UserContext';
import { AddMeetingRequest } from '@shared/requests/MeetingRequests';
import DatePickerUtil from '../../../utility_components/DatePickerUtil';
import { addOneHour, roundToHour } from '../../../utils/timeUtil';
import { MeetingType } from '@shared/dtos/MeetingDTO';
import LocationDTO from '@shared/dtos/LocationDTO';
import AttendanceDTO from '@shared/dtos/AttendanceDTO';
import ConfirmModal from '../../../utility_components/ConfirmModal/ConfirmModal';

const defaultValues: FormValuesType = {
    name: '',
    type: 'meeting',
    location: { location: '', type: 'inPerson' },
    description: '',
    startTime: roundToHour(new Date()),
    finishTime: addOneHour(roundToHour(new Date())),
    attendance: [],
};

type FormValuesType = {
    type: MeetingType;
    name: string;
    startTime: Date;
    finishTime: Date;
    location: Omit<LocationDTO, 'id'>;
    attendance: AttendanceDTO[];
    description?: string;
};

type NewMeetingProps = {
    isNewMeetingOpen: boolean;
    setIsNewMeetingOpen: (value: boolean) => void;
};
export default function NewMeeting({ isNewMeetingOpen, setIsNewMeetingOpen }: NewMeetingProps) {
    const userContext = useUserContext();
    const meetingContext = useMeetingContext();

    const [formValues, setFormValues] = useState<FormValuesType>(defaultValues);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

    const handleStartChange = (date: Date) => {
        setFormValues({
            ...formValues,
            startTime: date,
        });
    };
    const handleFinishChange = (date: Date) => {
        setFormValues({
            ...formValues,
            finishTime: date,
        });
    };

    function handleExit() {
        setIsNewMeetingOpen(false);
        setFormValues(defaultValues);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (formValues.startTime.getTime() < Date.now()) {
            alert('Start time cannot be in the past');
            return;
        }

        if (formValues.startTime.getTime() > formValues.finishTime.getTime()) {
            alert('Start time cannot be later than finish time');
            return;
        }

        setShowModal(true);
    }

    async function createMeeting() {
        const meetingRequest: AddMeetingRequest = {
            ...formValues,
            startTime: formValues.startTime.getTime(),
            finishTime: formValues.finishTime.getTime(),
        };

        setIsLoading(true);
        const data = await userContext.fetcher('POST /api/meetings', meetingRequest);
        setIsLoading(false);

        if (data) {
            meetingContext.addMeeting(data.meeting);
            setFormValues(defaultValues);
            setIsNewMeetingOpen(false);
        }
    }
    function locationChange(e) {
        const objKey = e.target.name;
        const objType = e.target.value;
        handleNestedObjectChange('location', { objKey, objType });
    }

    if (isLoading) {
        return (
            <div className="fixed z-50 top-0 left-0 w-full h-full overflow-hidden bg-gray-800 opacity-50 flex items-center justify-center">
                <div className="bg-white border py-2 px-5 rounded-lg flex flex-col items-center">
                    <div className="loader-dots grid grid-cols-3 gap-2">
                        <div className="bg-[#7d6ca3] rounded-full w-2 h-2"></div>
                        <div className="bg-[#7d6ca3] rounded-full w-2 h-2"></div>
                        <div className="bg-[#7d6ca3] rounded-full w-2 h-2"></div>
                    </div>
                    <div className="text-gray-500 text-xs font-light mt-2 text-center">Please wait...</div>
                </div>
            </div>
        );
    }

    return (
        <>
            {isNewMeetingOpen ? (
                <div className="flex items-center justify-center fixed h-screen w-full top-0 left-0 ">
                    <div className="opacity-50 bg-gray-600 w-full h-full absolute top-0 left-0 z-20"></div>
                    <div className="text-5xl bg-white p-10 opacity-100 z-30 rounded-lg w-1/2 flex flex-col items-center relative">
                        <button
                            className="bg-red-400 p-2 hover:bg-red-500 rounded-md text-2xl text-white px-5 absolute top-0 right-0 mt-2 mr-2"
                            onClick={handleExit}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                        <h1 className="my-5">Create new meeting</h1>

                        <form className="flex flex-col items-center text-lg w-3/4" onSubmit={handleSubmit}>
                            <input
                                className="border-[#7d6ca3] border-2 px-1 rounded-md w-full my-2"
                                name="name"
                                type="text"
                                placeholder="Meeting Name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                required={true}
                            />
                            <input
                                className="border-[#7d6ca3] border-2 px-1 rounded-md w-full my-2"
                                name="location"
                                type="text"
                                placeholder="Location"
                                value={formValues.location.location}
                                onChange={locationChange}
                                required={true}
                            />
                            <DatePickerUtil value={formValues.startTime} handleChange={handleStartChange} />
                            <DatePickerUtil value={formValues.finishTime} handleChange={handleFinishChange} />

                            <textarea
                                className=" my-2 w-full border-[#7d6ca3] border-2 p-2 rounded-md resize-none"
                                name="description"
                                placeholder="Desciption"
                                rows={5}
                                value={formValues.description}
                                onChange={handleInputChange}
                            />
                            <button
                                className="bg-[#7d6ca3] text-white p-2 rounded-md text-3xl  px-5 my-2"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            {showModal && (
                <ConfirmModal
                    header="New Meeting"
                    text="Are you sure you want to create a new meeting?"
                    leftButtonText="Yes"
                    rightButtonText="No"
                    setOpenModal={setShowModal}
                    onAccept={createMeeting}
                />
            )}
        </>
    );
}
