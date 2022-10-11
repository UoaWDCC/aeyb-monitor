import LiveMeeting from './components/live_meeting/LiveMeeting';
import UpcomingMeeting from './components/UpcomingMeeting';
import PostMeeting from './components/PostMeeting';
import './homepage.css'
import { useMeetingContext } from '../../contexts/MeetingContext';

export default function Homepage() {

  const meetingContext = useMeetingContext();

  const renderLiveMeetings = () => {
    const now = Date.now();
    return Object.values(meetingContext.meetings)
      .filter(meeting => meeting.time <= now && meeting.time + 3_600_000 >= now)
      .map(meeting => <LiveMeeting key={meeting.id} meeting={meeting} />)
  }

  const renderUpcomingMeetings = () => {
    const now = Date.now();
    return Object.values(meetingContext.meetings)
      .filter(meeting => meeting.time >= now)
      .map(meeting => <UpcomingMeeting key={meeting.id} meeting={meeting} />)
  }

  const renderPostMeetings = () => {
    const now = Date.now();
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
              <p className='containerTtl'>Upcoming meetings:</p>
              {renderUpcomingMeetings()}
            </div>
            <div id="postmeetingContainer" className='mContainer'>
              <p className='containerTtl'>Post-meetings stats:</p>
              {renderPostMeetings()}
            </div>
          </div>
        </div>
      </div>

    </ >
  )
}
