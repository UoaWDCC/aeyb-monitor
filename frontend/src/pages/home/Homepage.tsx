import './homepage.css'
import LiveMeeting from './components/live_meeting/LiveMeeting';
import UpcomingMeeting from './components/UpcomingMeeting';
import PostMeeting from './components/PostMeeting';
import { useMeetingContext } from '../../contexts/MeetingContext';
import NewMeeting from './components/NewMeeting';
import { useState } from 'react';
import Button from 'src/utility_components/Button';

export default function Homepage() {
  const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false);


  const meetingContext = useMeetingContext();
  const now = Date.now();

  const renderLiveMeetings = () => {
    return Object.values(meetingContext.meetings)
      .filter(meeting => meeting.time <= now && meeting.time + 3_600_000 >= now)
      .map(meeting => <LiveMeeting key={meeting.id} meeting={meeting} />)
  }

  const renderUpcomingMeetings = () => {
    return Object.values(meetingContext.meetings)
      .filter(meeting => meeting.time >= now)
      .map(meeting => <UpcomingMeeting key={meeting.id} meeting={meeting} />)
  }

  const renderPostMeetings = () => {
    return Object.values(meetingContext.meetings)
      .filter(meeting => meeting.time + 3_600_000 <= now)
      .map(meeting => <PostMeeting key={meeting.id} meeting={meeting} />)
  }

  return (
    <>
      <div className='pageComponent'>
        <div className="containerAll">
          <div id="liveContainer">
            {renderLiveMeetings()}
          </div>
          <div id='meetingContainer'>
            <div id="upcomingContainer" className='mContainer'>
              <div className='flex justify-between'>
                <p className='containerTtl'>Upcoming meetings:</p>
                <Button className='bg-[#7d6ca3] text-white m-2 px-2 rounded-md' onClick={() => setIsNewMeetingOpen(true)} text="+ New Meeting" />
              </div>
              {renderUpcomingMeetings()}
            </div>
            <div id="postmeetingContainer" className='mContainer'>
              <p className='containerTtl'>Post-meetings stats:</p>
              {renderPostMeetings()}
            </div>
          </div>
        </div>
      </div>
      <NewMeeting isNewMeetingOpen={isNewMeetingOpen} setIsNewMeetingOpen={setIsNewMeetingOpen} />

    </ >
  )
}
