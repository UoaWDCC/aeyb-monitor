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

  // get the current date and the date in one week 
  const [weeks, setWeekCount] = useState(0); // counts which week the user has naviigated to 
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const week = new Date();
  week.setDate(week.getDate() + weeks * 7);
  const firstWeekDay = week.getDate();
  const previousMonth = months[week.getMonth()];
  week.setDate(week.getDate() + 7); // set the date to the date next week

  return (
    <>
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} currentPage={1} />

      <div className='pageComponent'>
        {/* CALENDAR/EVENT COLLECTION DIV */}
        <div className='flex flex-col h-full w-2/5'>
          <div className='flex-row text-center mt-8 mb-8'>
            <button className=' bg-gray-200 px-4 py-4 rounded-sm w-1/8' onClick={() => { setWeekCount(weeks - 1) }}> prev </button>
            <p className='inline-block w-1/2 text-2xl font-bold text-[#5563AE]'>{previousMonth} {firstWeekDay} - {months[week.getMonth()]} {week.getDate()}</p>
            <button className='bg-gray-200 px-4 py-4 rounded-sm w-1/8' onClick={() => setWeekCount(weeks + 1)}>next </button>
          </div>

          <WeeklyInstance weekly={eventList} />
        </div>
      </div>

    </ >
  )
}

export default CalendarPage;

