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



    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const [attendance, setAttendance] = useState(AttendanceType.Attended);

    const [rating, setRating] = useState(3);


    // toggles the sidebar being open and closed
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <div className='h-screen overflow-scroll'>
            <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} currentPage={0} />
            <div className='w-5/6 sm:w-1/3 h-screen mx-auto py-2 flex items-center flex-col justify-around'>
                <h1 className='text-5xl mt-2'>Meeting A - with Group B</h1>

                <div className='w-full'>
                    <UserList allUsers={allUsers} setActiveUser={setActiveUser} />
                </div>

                {
                    activeUser === '' ? <h2 className='text-2xl '>Select a user </h2> :
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