import MeetingDTO from '@shared/dtos/MeetingDTO';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from 'src/contexts/UserContext';
import LoadingSpinner from '../../utility_components/LoadingSpinner';
import AttendanceSelect from './components/AttendanceSelect';
import Button from 'src/utility_components/Button';
import Rating from './components/RadioGroupRating';
import UserList from './components/UserList';

export enum AttendanceType {
    NotAttended,
    Attended,
}

type Params = {
    meetingId: string;
};

export default function ActiveMeeting() {
    const { meetingId } = useParams<Params>();
    const userContext = useUserContext();
    const [isLoading, setIsLoading] = useState(true);
    const [meeting, setMeeting] = useState<null | MeetingDTO>();

    useEffect(() => {
        const fetchRoles = async () => {
            setIsLoading(true);

            if (!meetingId) return;

            const data = await userContext.fetcher('GET /api/meetings/:meetingId', undefined, {
                meetingId,
            });

            setIsLoading(false);

            if (!data) return;

            setMeeting(data.meeting);
        };
        fetchRoles();
    }, [meetingId]);

    const allUsers = ['Joe', 'Bob', 'Raymond', 'User 2', 'Mary', 'Jane', 'Susan'];
    const [activeUser, setActiveUser] = useState('');

    const [leaveMeetingOpen, setLeaveMeetingOpen] = useState(false);

    const [attendance, setAttendance] = useState(AttendanceType.Attended);

    const [rating, setRating] = useState(3);

    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    function handleSubmit() {
        console.log(`User: ${activeUser},
        Attendance: ${AttendanceType[attendance]},
        Rating: ${rating},
        Comments: ${(document.getElementById('comment') as HTMLInputElement).value}`);
        setMessage('Feedback Submitted !!!');
    }

    async function endMeeting() {
        await userContext.fetcher(
            'PATCH /api/meetings/:meetingId/end',
            {
                finishTime: Date.now(),
            },
            {
                meetingId,
            },
        );
        navigate(`../`, { replace: true });
    }

    return (
        <>
            <div className="h-screen overflow-scroll relative">
                <div className="h-screen mx-auto py-2 flex items-center flex-col text-[#262b6c] text-center relative z-10">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <h1 className="text-4xl mt-2 font-bold">{meeting?.name}</h1>

                            <div className="w-5/6 lg:w-1/3 flex flex-col items-center">
                                <div className="w-full z-10">
                                    <UserList allUsers={allUsers} setActiveUser={setActiveUser} />
                                </div>

                                {activeUser !== '' && (
                                    <div className="flex flex-col items-center w-full">
                                        <h1 className="text-4xl font-bold mt-5">{activeUser}'s</h1>
                                        <h2 className="text-2xl mb-5">Participation Feedback:</h2>
                                        <div className="my-2 w-full">
                                            <AttendanceSelect setAttendance={setAttendance} />
                                        </div>
                                        <div className="w-full my-2 flex justify-center">
                                            <Rating setRating={setRating} />
                                        </div>

                                        <textarea
                                            id="comment"
                                            className=" my-5 w-full border-[#262b6c] border-2 p-2 resize-none"
                                            placeholder="Enter Comments"
                                            rows={10}
                                        ></textarea>

                                        <button
                                            className="bg-[#262b6c] text-white p-2 rounded-md"
                                            onClick={handleSubmit}
                                        >
                                            Submit for {activeUser}
                                        </button>

                                        <div className="w-full mt-2">
                                            {message && (
                                                <div className="rounded-md bg-green-100 text-green-900 p-2 text-center">
                                                    {message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <Button
                                    color="#fff"
                                    size="medium"
                                    textColor="#dc264e"
                                    extraStyles="mt-5 font-extrabold border-2 border-red-600 w-1/3"
                                    onClick={() => setLeaveMeetingOpen(true)}
                                >
                                    END MEETING
                                </Button>
                                {leaveMeetingOpen && (
                                    <div className="flex items-center justify-center fixed h-screen w-full top-0 left-0 z-20">
                                        <div className="opacity-50 bg-gray-600 w-full h-full absolute top-0 left-0 z-30"></div>
                                        <div className="text-5xl bg-white p-10 opacity-100 z-40 rounded-lg">
                                            Are you sure you want to end the meeting?
                                            <div className="flex justify-around p-5 mt-20">
                                                <button
                                                    className="bg-gray-400 p-2 rounded-md text-3xl  px-5"
                                                    onClick={() => setLeaveMeetingOpen(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className=" bg-red-300 p-2 rounded-xl text-3xl px-5"
                                                    onClick={() => endMeeting()}
                                                >
                                                    End Meeting
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
