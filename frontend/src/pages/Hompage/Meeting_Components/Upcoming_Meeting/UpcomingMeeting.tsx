import React from 'react'
import './upcomingmeeting.css'

export default function UpcomingMeeting(prop: { title: string; startTime: Date; }) {

    class UpcomingMeeting {

        constructor(title: string, startTime: Date) {
            this.title = title;
            this.startTime = startTime;
            this.timeTillBeginning = this.setTimeTillBeginning();
        };

        title: string;
        startTime: Date;
        timeTillBeginning: string;

        setTimeTillBeginning(): string {
            if ((this.startTime.getTime() - new Date().getTime()) / 86400000 > 1) {
                return `${Math.ceil((this.startTime.getTime() - new Date().getTime()) / 86400000)} days`
            } else if ((this.startTime.getTime() - new Date().getTime()) / 3600000 > 1) {
                return `${Math.ceil((this.startTime.getTime() - new Date().getTime()) / 3600000)} hours`
            } else {
                return `${Math.ceil((this.startTime.getTime() - new Date().getTime()) / 60000)} minutes`
            }
        }
    }

    const meeting = new UpcomingMeeting(prop.title, prop.startTime)

    const openMeetingPage = () => {
        console.log(`opening the "${meeting.title}" page`)
    }


    return (
        <div className='upcomingMeeting' onClick={openMeetingPage}>
            <div className='meetingTitle'>{meeting.title}</div>
            <div className='dDay'>Opens in {meeting.timeTillBeginning}</div>
        </div>
    )
}
