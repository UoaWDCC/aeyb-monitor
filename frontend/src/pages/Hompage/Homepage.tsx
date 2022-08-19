import React, { useState } from 'react'
import Sidebar from '../Homepage_Components/Sidebar'
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
            <div className="live">LIVEMEETINGPLACEHOLDER</div>
            <div className="live">LIVEMEETINGPLACEHOLDER</div>
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
