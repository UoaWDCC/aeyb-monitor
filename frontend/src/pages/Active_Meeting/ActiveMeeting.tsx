import React, { useState } from 'react'
import Sidebar from '../Sidebar_Components/Sidebar'
import UserList from './components/UserList';
import AttendanceSelect from './components/AttendanceSelect';
import Rating from './components/RadioGroupRating'


export default function ActiveMeeting() {
    const allUsers = ['Hillary', 'Grant', 'Violet', 'Lauren', 'Luke', 'Sarah', 'Helen', 'Josh', 'Tyler'];
    const [activeUser, setActiveUser] = React.useState('');



    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // toggles the sidebar being open and closed
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <div className='h-screen overflow-scroll'>
            <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} currentPage={0} />
            <div className='w-full sm:w-1/3 h-screen mx-auto py-2 flex items-center flex-col justify-around'>
                <h1 className='text-4xl'>Meeting A - with Group B</h1>

                <div className='w-full'>
                    <UserList allUsers={allUsers} setActiveUser={setActiveUser} />
                </div>

                {
                    activeUser === '' ? <h2 className='text-2xl '>Select a user </h2> :
                        <div className='flex flex-col items-center w-full'>
                            <h2 className='text-2xl my-5'>{activeUser}'s Participation Feedback:</h2>
                            <AttendanceSelect />
                            <Rating />

                            <textarea className=' my-5 w-full border-[#262b6c] border-2 p-2 resize-none' placeholder='Enter Comments' rows={10}></textarea>

                            <button className='bg-[#262b6c] text-white p-2 rounded-md'>Submit for {activeUser}</button>
                        </div>



                }

                <button className='mt-20 text-red-600 font-extrabold border-2 border-red-600 p-2 rounded-md w-full'>END MEETING</button>


            </div>
        </div>
    )
}