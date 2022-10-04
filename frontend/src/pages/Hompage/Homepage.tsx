import React, { useState } from 'react'
import LiveMeeting from './Meeting_Components/Live_Meeting/LiveMeeting';
import UpcomingMeeting from './Meeting_Components/Upcoming_Meeting/UpcomingMeeting';
import PostMeeting from './Meeting_Components/Post_Meeting/PostMeeting';
import './homepage.css'

export default function Homepage() {

  return (
    <>
      <div className='pageComponent'>
        <div className="containerAll">
          <div id="liveContainer">
            <LiveMeeting title={`Meeting with board members`} startTime={new Date()} endTime={new Date(2022, 7, 19, 16, 30, 0)} />
          </div>
          <div id='meetingContainer'>
            <div id="upcomingContainer" className='mContainer'>
              <p className='containerTtl'>Upcoming meetings:</p>
              <UpcomingMeeting title={`Meeting A - with Group B`} startTime={new Date(2022, 7, 20, 16, 30, 0)}></UpcomingMeeting>
              <UpcomingMeeting title={`Meeting B - with Group C`} startTime={new Date(2022, 7, 25, 16, 30, 0)}></UpcomingMeeting>
              <UpcomingMeeting title={`Meeting C - with Group E`} startTime={new Date(2022, 7, 19, 20, 30, 0)}></UpcomingMeeting>
            </div>
            <div id="postmeetingContainer" className='mContainer'>
              <p className='containerTtl'>Post-meetings stats:</p>
              <PostMeeting />
              <PostMeeting />
              <PostMeeting />
            </div>
          </div>
        </div>
      </div>

    </ >
  )
}
