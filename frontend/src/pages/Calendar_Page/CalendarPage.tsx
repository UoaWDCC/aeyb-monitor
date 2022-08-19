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

      {/* There would be components present for homepage */}
      <p className='placeholder3'>This is the Calendar Page</p>
    </ >
  )
}
