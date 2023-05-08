import React, { ReactElement, useState } from 'react'
import WeeklyInstance from './components/WeeklyInstance'
import { useMeetingContext } from '../../contexts/MeetingContext'
import { useUserContext } from '../../contexts/UserContext';
import IonIcon from '@reacticons/ionicons';

const CalendarPage = (): ReactElement => {
  const userContext = useUserContext();
  const meetingContext = useMeetingContext();
  const [month, setMonth] = useState(new Date());
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const renderMonthlyMeetings = () => {
    return Object.values(meetingContext.meetings)
      .filter(meeting => (meeting.startTime >= startOfMonth.getTime() && meeting.startTime <= endOfMonth.getTime()))
      .sort((a, b) => a.startTime - b.startTime)
      .map(meeting => <WeeklyInstance key={meeting.id} meeting={meeting} />)
  }

  return (
    <>

      <div className='pageComponent'>
        {/* CALENDAR/EVENT COLLECTION DIV */}
        <div className='flex flex-col h-full w-full md:w-1/2'>
          <div className='flex-row text-center mt-8 mb-8 text-[#262B6C]'>
            <button className=' bg-slate-100 px-4 py-4 rounded-sm w-1/8' onClick={() => { setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1)) }}>
              <IonIcon name="chevron-back-outline" size='large' />
            </button>
            <p className='inline-block w-1/2 text-xl font-bold text-[#262B6C]'>{months[month.getMonth()]} {month.getFullYear()}</p>
            <button className='bg-slate-100 px-4 py-4 rounded-sm w-1/8' onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>
              <IonIcon name="chevron-forward-outline" size='large' />
            </button>
          </div>
          {userContext.hasPermission('VIEW_MEETINGS') && renderMonthlyMeetings()}
        </div>
      </div>

    </ >
  )
}

export default CalendarPage;

