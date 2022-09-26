import React, { useState } from 'react'
import Sidebar from '../Sidebar_Components/Sidebar'
import UserList from './components/UserList';
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
        <div className='h-screen overflow-hidden'>
            <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} currentPage={0} />
            <div className='w-full sm:w-1/2 h-32 mx-auto my-10 flex items-center flex-col'>
                <h1 className='text-4xl'>Meeting A - with Group B</h1>
                <div className='w-1/2'>
                    <UserList allUsers={allUsers} setActiveUser={setActiveUser} />
                </div>

                {
                    activeUser === '' ? <h2 className='text-2xl '>Select a user </h2> :
                        <div className='flex flex-col items-center'>
                            <h2 className='text-2xl'>{activeUser}'s Participation Feedback:</h2>
                            <Rating />
                        </div>



                }

            </div>
        </div>
    )
}