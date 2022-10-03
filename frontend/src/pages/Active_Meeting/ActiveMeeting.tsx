import React, { useState } from 'react'
import Sidebar from '../Sidebar_Components/Sidebar'
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






    const [attendance, setAttendance] = useState(AttendanceType.Attended);

    const [rating, setRating] = useState(3);

    return (
        <div className='h-screen overflow-scroll'>
            <div className='w-5/6 lg:w-1/3 h-screen mx-auto py-2 flex items-center flex-col justify-around'>
                <h1 className='text-4xl mt-2'>Meeting A - with Group B</h1>

                <div className='w-full z-50'>
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

                <button className='mt-20 text-red-600 font-extrabold border-2 border-red-600 p-2 rounded-md w-full'>END MEETING</button>
            </div>
        </div>
    )
}