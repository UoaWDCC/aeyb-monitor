import MeetingDTO from '@shared/dtos/MeetingDTO'
import './meeting.css'
import { getRelativeTime } from '../../../utils/timeUtil'

type UpcommingMeetingProps = {
    meeting: MeetingDTO
}

export default function UpcomingMeeting({ meeting }: UpcommingMeetingProps) {

    const openMeetingPage = () => {
        console.log(`opening the "${meeting.name}" page`)
    }

    return (
        <div className='upcomingMeeting' onClick={openMeetingPage}>
            <div className='meetingTitle capitalize'>{meeting.name}</div>
            <div className='dDay'>Opens in {getRelativeTime(meeting.startTime)}</div>
        </div>
    )
}
