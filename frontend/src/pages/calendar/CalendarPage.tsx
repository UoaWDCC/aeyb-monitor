import React, { ReactElement, useState } from 'react'
import WeeklyInstance from './components/WeeklyInstance'
import { useMeetingContext } from '../../contexts/MeetingContext'
import IonIcon from '@reacticons/ionicons';

const CalendarPage = (): ReactElement => {

  // get the current date and the date in one week 
  const [weeks, setWeekCount] = useState(0); // counts which week the user has naviigated to 
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const week = new Date();
  week.setDate(week.getDate() + weeks * 7);
  const firstWeekTime = week.getTime();
  const firstWeekDay = week.getDate();
  const previousMonth = months[week.getMonth()];
  week.setDate(week.getDate() + 7); // set the date to the date next week

  const meetingContext = useMeetingContext();
  const renderWeeklyMeetings = () => {
    return Object.values(meetingContext.meetings)
      .filter(meeting => (meeting.time <= week.getTime() && meeting.time >= firstWeekTime))
      .map(meeting => <WeeklyInstance key={meeting.id} meeting={meeting} />)
  }

  return (
    <>

      <div className='pageComponent'>
        {/* CALENDAR/EVENT COLLECTION DIV */}
        <div className='flex flex-col h-full w-full md:w-1/2'>
          <div className='flex-row text-center mt-8 mb-8 text-[#262B6C]'>
            <button className=' bg-slate-100 px-4 py-4 rounded-sm w-1/8' onClick={() => { setWeekCount(weeks - 1) }}>
              <IonIcon name="chevron-back-outline" size='large' />
            </button>
            <p className='inline-block w-1/2 text-xl font-bold text-[#262B6C]'>{previousMonth} {firstWeekDay} - {months[week.getMonth()]} {week.getDate()}</p>
            <button className='bg-slate-100 px-4 py-4 rounded-sm w-1/8' onClick={() => setWeekCount(weeks + 1)}>
              <IonIcon name="chevron-forward-outline" size='large' />
            </button>
          </div>

          {renderWeeklyMeetings()}
        </div>
      </div>

    </ >
  )
}

export default CalendarPage;

