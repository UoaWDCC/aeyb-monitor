import React, { ReactElement, useState } from 'react'
import Sidebar from '../Sidebar_Components/Sidebar'
import WeeklyInstance from './components/WeeklyInstance'

let eventList = {
  listOfEvents: [

    {
      title: "Test1",
      description: "blah",
      time: "blah",
      attendance: null
    },

    {
      title: "Test2",
      description: "blah",
      time: "blah",
      attendance: null
    }
  ]
}


const CalendarPage = (): ReactElement => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // toggles the sidebar being open and closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} currentPage={1} />

      <div className='pageComponent'>
        {/* CALENDAR/EVENT COLLECTION DIV */}
        <div className='h-full w-1/2 bg-green-50'>
          <WeeklyInstance weekly={eventList} />
        </div>
      </div>

    </ >
  )
}

export default CalendarPage;

