import React, { ReactElement, useState } from 'react'
import WeeklyInstance from './components/WeeklyInstance'
import { useMeetingContext } from '../../contexts/MeetingContext'
import IonIcon from '@reacticons/ionicons';
import Button from 'src/utility_components/Button';

const CalendarPage = (): ReactElement => {

  // get the current date and the date in one week 
  const [weeks, setWeekCount] = useState(0); // counts which week the user has naviigated to 
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const week = new Date();
  week.setDate(week.getDate() - week.getDay() + weeks * 7);
  const firstWeekTime = week.getTime();
  const firstWeekDay = week.getDate();
  const previousMonth = months[week.getMonth()];
  week.setDate(week.getDate() + 6); // set the date to the date next week

  const meetingContext = useMeetingContext();
  const renderWeeklyMeetings = () => {
    return Object.values(meetingContext.meetings)
      .filter(meeting => (meeting.time <= week.getTime() && meeting.time >= firstWeekTime))
      .map(meeting => <WeeklyInstance key={meeting.id} meeting={meeting} />)
  }

  const [leftButtonColor, setLeftButtonColor] = useState('bg-slate-300');
  const [righButtonColor, setRightButtonColor] = useState('bg-slate-300');


  const handleClick = (btnDirection) => {
    setWeekCount(weeks - 1)

    if (btnDirection === 'leftButton') {
      setLeftButtonColor('bg-blue-300');

      setTimeout(() => {
        setLeftButtonColor('bg-slate-300')
      }, 1000); // Change the color back to slate after 1000ms
    } else {
      setRightButtonColor('bg-blue-300');

      setTimeout(() => {
        setRightButtonColor('bg-slate-300')
      }, 1000); // Change the color back to slate after 1000ms
    }

  };


  return (
    <>

      <div className='pageComponent'>
        {/* CALENDAR/EVENT COLLECTION DIV */}
        <div className='flex flex-col h-full w-full md:w-1/2'>
          <div className='flex-row text-center mt-8 mb-8 text-[#262B6C]'>

            {/* Default Left Button */}
            {/* <Button className=' bg-slate-300 px-4 py-4 rounded-sm w-1/8' onClick={() => { setWeekCount(weeks - 1) }} >
              <IonIcon name="chevron-back-outline" size='large' />
            </Button> */}

            {/* Translate Left + Dim */}
            <Button className={`${leftButtonColor} px-4 py-4 rounded-sm w-1/8 relative overflow-hidden transition duration-300 hover:-translate-x-2`} onClick={() => handleClick('leftButton')}>
              <span className='absolute inset-0 bg-white opacity-20 transition-opacity duration-300 hover:opacity-30'></span>
              <IonIcon name="chevron-back-outline" size='large' />
            </Button>

            <p className='inline-block w-1/2 text-xl font-bold text-[#262B6C]'>{previousMonth} {firstWeekDay} - {months[week.getMonth()]} {week.getDate()}</p>

            {/* Default Right Button */}
            {/* <Button className=' bg-slate-300 px-4 py-4 rounded-sm w-1/8' onClick={() => setWeekCount(weeks + 1)}>
              <IonIcon name="chevron-forward-outline" size='large' />
            </Button> */}

            {/* Translate Right */}
            <Button className={`${righButtonColor} px-4 py-4 rounded-sm w-1/8 relative overflow-hidden transition duration-300 hover:translate-x-2`} onClick={() => handleClick('rightButton')}>
              <span className='absolute inset-0 bg-white opacity-20 transition-opacity duration-300 hover:opacity-30'></span>
              <IonIcon name="chevron-forward-outline" size='large' />
            </Button>

          </div>
          {renderWeeklyMeetings()}
        </div>
      </div >

    </ >
  )
}

export default CalendarPage;

