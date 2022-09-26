import React, { useState } from 'react'
import Sidebar from '../Sidebar_Components/Sidebar'
import UserList from './components/UserList';

export default function ActiveMeeting() {
    const allUsers = ['Hillary', 'Grant', 'Violet', 'Lauren', 'Luke', 'Sarah', 'Helen', 'Josh', 'Tyler'];
    const [activeUser, setActiveUser] = React.useState('');



    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // toggles the sidebar being open and closed
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <div className='h-screen'>
            <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} currentPage={0} />
            <div className='w-1/2  mx-auto my-10'>
                <h1 className='text-4xl'>Meeting A - with Group B</h1>
                <UserList allUsers={allUsers} setActiveUser={setActiveUser} />

            </div>
        </div>
    )
}