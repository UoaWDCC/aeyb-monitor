import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../meeting.css'

export default function PostMeeting() {
    const navigate = useNavigate();

    const openMeetingPage = () => {
        console.log(`opening the PLACEHOLDER MEETING page`);
        navigate("../aftermeetingpage");
    }

    return (
        <div className='postMeeting' onClick={openMeetingPage}>
            <div className='meetingTitle'>Placeholder Meeting Title</div>
            <div className='dDay'>Opens in 3 hours</div>
        </div>
    )
}
