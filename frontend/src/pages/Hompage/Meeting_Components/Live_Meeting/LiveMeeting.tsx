import React, { useState } from 'react'
import './livemeeting.css'

export default function LiveMeeting(prop: { title: string; startTime: Date; endTime: Date; }) {

    class LiveMeeting {

        constructor(title: string, startTime: Date, endTime: Date) {
            this.title = title;
            this.startTime = startTime;
            this.endTime = endTime;
        };

        title: string;
        startTime: Date;
        endTime: Date;
        timeLeft: number
    }

    const meeting = new LiveMeeting(prop.title, prop.startTime, prop.endTime)
    const [timeLeft, setTimeLeft] = useState(Math.floor((meeting.endTime.getTime() - new Date().getTime()) / 60000))

    const updateTime = () => {
        setTimeLeft(Math.floor((meeting.endTime.getTime() - new Date().getTime()) / 60000))
    }
    setInterval(updateTime, 1000)

    const openMeetingPage = () => {
        console.log(`opening the "${meeting.title}" page`)
    }

    return (
        <div className='liveMeeting' onClick={openMeetingPage}>
            <div className='liveStatus'><span className='liveBall'>&#x25cf;</span> LIVE</div>
            <div className='liveMeetingTitle'>{meeting.title}</div>
            <div className='timeleft'>{timeLeft > 0 ? `${timeLeft} minutes left` : `Meeting Finished`}</div>
        </div>
    )
}
