import React, { useState } from 'react'
import UserList from './components/UserList';
import AttendanceSelect from './components/AttendanceSelect';
import Rating from './components/RadioGroupRating'

export enum AttendanceType {
    NotAttended,
    Attended
}

export default function ActiveMeeting() {
    const allUsers = ['User1', 'Grant', 'Violet', 'Lauren', 'Luke', 'Sarah', 'Helen', 'Josh', 'Tyler'];
    const [activeUser, setActiveUser] = React.useState('');

    const [leaveMeetingOpen, setLeaveMeetingOpen] = useState(false);

    const [attendance, setAttendance] = useState(AttendanceType.Attended);

    const [rating, setRating] = useState(3);

    return (
        <div className='h-screen overflow-scroll relative'>
            <div className='w-5/6 lg:w-1/3 h-screen mx-auto py-2 flex items-center flex-col justify-around'>
                <h1 className='text-4xl mt-2'>Meeting A - with Group B</h1>

                <div className='w-full z-10'>
                    <UserList allUsers={allUsers} setActiveUser={setActiveUser} />
                </div>

                {
                    activeUser === '' ? <div></div> :
                        <div className='flex flex-col items-center w-full'>
                            <h2 className='text-2xl my-5'>{activeUser}'s Participation Feedback:</h2>
                            <div className='my-2 w-full'>
                                <AttendanceSelect setAttendance={setAttendance} />
                            </div>
                            <div className='w-full my-2 flex justify-center'>
                                <Rating setRating={setRating} />
                            </div>

                            <textarea id="comment" className=' my-5 w-full border-[#262b6c] border-2 p-2 resize-none' placeholder='Enter Comments' rows={10}></textarea>

                            <button className='bg-[#262b6c] text-white p-2 rounded-md' onClick={() => (
                                console.log(`User: ${activeUser},
                                            Attendance: ${AttendanceType[attendance]},
                                            Rating: ${rating},
                                            Comments: ${(document.getElementById("comment") as HTMLInputElement).value}`)

                            )}>Submit for {activeUser}</button>
                        </div>
                }

                <button className='mt-20 text-red-600 font-extrabold border-2 border-red-600 p-2 rounded-md w-full' onClick={() => setLeaveMeetingOpen(true)}>END MEETING</button>
            </div>
            {
                leaveMeetingOpen ?
                    <div className='flex items-center justify-center absolute h-screen w-full top-0 left-0 '>
                        <div className='opacity-50 bg-gray-600 w-full h-full absolute top-0 left-0 z-20'></div>
                        <div className='text-5xl bg-white p-10 opacity-100 z-30 rounded-lg'>
                            Are you sure you want to leave meeting?
                            <div className='flex justify-around p-5 mt-20'>
                                <button className='bg-gray-400 p-2 rounded-md text-3xl  px-5' onClick={() => setLeaveMeetingOpen(false)}>Cancel</button>
                                <button className=' bg-red-300 p-2 rounded-xl text-3xl px-5'>Leave</button>

                            </div>
                        </div>
                    </div>
                    : <div></div>
            }
        </div >
    )
}