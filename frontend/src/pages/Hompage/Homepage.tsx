import React, { useState } from 'react'
import Sidebar from '../Sidebar_Components/Sidebar'
import LiveMeeting from './Meeting_Components/Live_Meeting/LiveMeeting';
import './homepage.css'

export default function Homepage() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // toggles the sidebar being open and closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} currentPage={0} />

      <div className='pageComponent'>
        <div className="containerAll">
          <div id="liveContainer">
            <LiveMeeting title={`Meeting with board members`} startTime={new Date()} endTime={new Date(2022, 7, 19, 16, 30, 0)} />
          </div>
          <div id='meetingContainer'>
            <div id="upcomingContainer" className='mContainer'>
              <p className='containerTtl'>Upcoming meetings:</p>
              <div className="upcoming">UPCOMINGPLACEHOLDER</div>
              <div className="upcoming">UPCOMINGPLACEHOLDER</div>
              <div className="upcoming">UPCOMINGPLACEHOLDER</div>
            </div>
            <div id="postmeetingContainer" className='mContainer'>
              <p className='containerTtl'>post meetings:</p>
              <div className="postMeeting">POSTMEETINGPLACEHOLDER</div>
              <div className="postMeeting">POSTMEETINGPLACEHOLDER</div>
              <div className="postMeeting">POSTMEETINGPLACEHOLDER</div>
            </div>
          </div>
        </div>
      </div>

    </ >
  )
}
