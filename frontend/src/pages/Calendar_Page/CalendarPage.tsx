import React, { useState } from 'react'
import Sidebar from '../Homepage_Components/Sidebar'
import './calendarpage.css'

export default function CalendarPage() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // toggles the sidebar being open and closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} currentPage={1} />

      <div className='pageComponent'>
        {/* There would be components present for homepage */}
        <p>This is the Calendar Page</p>
      </div>

    </ >
  )
}
