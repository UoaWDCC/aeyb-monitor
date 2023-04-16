import MeetingDTO from '@shared/dtos/MeetingDTO'
import { getRelativeTime } from './meetingUtils'
import './meeting.css'

export default function UpcomingMeeting(props: { meeting: MeetingDTO }) {

    const openMeetingPage = () => {
        console.log(`opening the "${props.meeting.name}" page`)
    }

    return (
        <div className='upcomingMeeting' onClick={openMeetingPage}>
            <div className='meetingTitle capitalize'>{props.meeting.name}</div>
            <div className='dDay'>Opens in {getRelativeTime(props.meeting.time)}</div>
        </div>
    )
}
