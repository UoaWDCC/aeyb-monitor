import React, { useState } from 'react'
import UserList from './components/UserList';
import AttendanceSelect from './components/AttendanceSelect';
import Rating from './components/RadioGroupRating'
import { useNavigate } from 'react-router-dom';

export enum AttendanceType {
    NotAttended,
    Attended
}

export default function ActiveMeeting() {
    const allUsers = ['Joe', 'Bob', 'Raymond', 'User 2', 'Mary', 'Jane', 'Susan'];
    const [activeUser, setActiveUser] = React.useState('');

    const [leaveMeetingOpen, setLeaveMeetingOpen] = useState(false);

    const [attendance, setAttendance] = useState(AttendanceType.Attended);

    const [rating, setRating] = useState(3);

    const navigate = useNavigate();

    const [message, setMessage] = React.useState('');
    const DELAY = 1000;

    React.useEffect(() => {
        if (!message) { return; }

        const timer = window.setTimeout(() => setMessage(''), DELAY);

        return () => {
            window.clearTimeout(timer);
        };
    }, [message]);

    function handleSubmit() {
        console.log(`User: ${activeUser},
        Attendance: ${AttendanceType[attendance]},
        Rating: ${rating},
        Comments: ${(document.getElementById("comment") as HTMLInputElement).value}`)
        setMessage('Feedback Submitted !!!');
    }

    return (
        <div className='h-screen overflow-scroll relative'>
            <div className='h-screen mx-auto py-2 flex items-center flex-col text-[#262b6c] text-center relative z-10'>
                <h1 className='text-4xl mt-2 font-bold'>Meeting A - with Group B</h1>

                <div className="w-5/6 lg:w-1/3 flex flex-col items-center">
                    <div className='w-full z-10'>
                        <UserList allUsers={allUsers} setActiveUser={setActiveUser} />
                    </div>

                    {
                        activeUser === '' ? <div></div> :
                            <div className='flex flex-col items-center w-full'>
                                <h1 className='text-4xl font-bold mt-5'>{activeUser}'s</h1>
                                <h2 className='text-2xl mb-5'>Participation Feedback:</h2>
                                <div className='my-2 w-full'>
                                    <AttendanceSelect setAttendance={setAttendance} />
                                </div>
                                <div className='w-full my-2 flex justify-center'>
                                    <Rating setRating={setRating} />
                                </div>

                                <textarea id="comment" className=' my-5 w-full border-[#262b6c] border-2 p-2 resize-none' placeholder='Enter Comments' rows={10}></textarea>

                                <button className='bg-[#262b6c] text-white p-2 rounded-md' onClick={handleSubmit}>Submit for {activeUser}</button>

                                <div className="w-full mt-2">
                                    {message && <div className="rounded-md bg-green-100 text-green-900 p-2 text-center">{message}</div>}
                                </div>

                            </div>
                    }

                    <button className='mt-5 text-red-600 font-extrabold border-2 border-red-600 p-2 rounded-md w-1/3' onClick={() => setLeaveMeetingOpen(true)}>END MEETING</button>
                </div>
            </div>
            {
                leaveMeetingOpen ?
                    <div className='flex items-center justify-center fixed h-screen w-full top-0 left-0 z-20'>
                        <div className='opacity-50 bg-gray-600 w-full h-full absolute top-0 left-0 z-30'></div>
                        <div className='text-5xl bg-white p-10 opacity-100 z-40 rounded-lg'>
                            Are you sure you want to end the meeting?
                            <div className='flex justify-around p-5 mt-20'>
                                <button className='bg-gray-400 p-2 rounded-md text-3xl  px-5' onClick={() => setLeaveMeetingOpen(false)}>Cancel</button>
                                <button className=' bg-red-300 p-2 rounded-xl text-3xl px-5' onClick={() => navigate(`../homepage`, { replace: true })}>End Meeting</button>

                            </div>
                        </div>
                    </div>
                    : <div></div>
            }
        </div >
    )
}