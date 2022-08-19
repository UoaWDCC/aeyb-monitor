import React, { useState } from 'react'
import Sidebar from '../Homepage_Components/Sidebar'
import './profilepage.css'

export default function ProfilePage() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // toggles the sidebar being open and closed
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} currentPage={2} />

            {/* There would be components present for profile page */}
            <p className='placeholder2'>This is the Profile page</p>
        </ >
    )
}
