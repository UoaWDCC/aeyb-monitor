import React, { ReactElement, useState } from 'react'
import Sidebar from '../Sidebar_Components/Sidebar'
import WeeklyInstance from './components/WeeklyInstance'
import { EventStatus } from './CalendarInterface'

let eventList = {
  listOfEvents: [

    {
      title: "Activity - with Group B",
      description: "Art exhibition at 405-721 featuring wireframes and doodles :)",
      time: "15:00 - 14:00",
      attendance: null,
      status: EventStatus.PENDING
    },

    {
      title: "Activity - with Group A",
      description: "Bring your water bottles, we playing water balloon!! Bring your own food pls",
      time: "12:00 - 14:00",
      attendance: null,
      status: EventStatus.RESPONDED
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
        <div className='flex flex-col h-full w-2/5'>
          <div className='flex-row text-center mt-8 mb-8'>
            <button className=' bg-gray-200 px-4 py-4 rounded-sm w-1/8'> prev </button>
            <p className='inline-block w-1/2 text-2xl font-bold text-[#5563AE]'>SEP 5 - SEP 11</p>
            <button className='bg-gray-200 px-4 py-4 rounded-sm w-1/8'>next </button>
          </div>

          <WeeklyInstance weekly={eventList} />
        </div>
      </div>

    </ >
  )
}

export default CalendarPage;

