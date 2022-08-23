import React from 'react'
import '../meeting.css'

export default function PostMeeting() {

    const openMeetingPage = () => {
        console.log(`opening the PLACEHOLDER MEETING page`)
    }

    return (
        <div className='postMeeting' onClick={openMeetingPage}>
            <div className='meetingTitle'>Placeholder Meeting Title</div>
            <div className='dDay'>Opens in 3 hours</div>
        </div>
    )
}
