import './homepage.css';
import LiveMeeting from './components/live_meeting/LiveMeeting';
import UpcomingMeeting from './components/UpcomingMeeting';
import PostMeeting from './components/PostMeeting';
import { useMeetingContext } from '../../contexts/MeetingContext';
import NewMeeting from './components/NewMeeting';
import { useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';

export default function Homepage() {
    const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false);
    const userContext = useUserContext();
    const meetingContext = useMeetingContext();
    const now = Date.now();

    const renderLiveMeetings = () => {
        return (
            userContext.hasPermission('VIEW_MEETINGS') &&
            Object.values(meetingContext.meetings)
                .filter((meeting) => meeting.startTime <= now && meeting.finishTime >= now)
                .sort((a, b) => a.startTime - b.startTime)
                .map(({ id, name, startTime, finishTime }) => (
                    <LiveMeeting key={id} id={id} name={name} startTime={startTime} finishTime={finishTime} />
                ))
        );
    };

    const renderUpcomingMeetings = () => {
        return (
            userContext.hasPermission('VIEW_MEETINGS') &&
            Object.values(meetingContext.meetings)
                .filter((meeting) => meeting.startTime >= now)
                .sort((a, b) => a.startTime - b.startTime)
                .map((meeting) => <UpcomingMeeting key={meeting.id} meeting={meeting} />)
        );
    };

    const renderPostMeetings = () => {
        return (
            userContext.hasPermission('VIEW_MEETINGS') &&
            Object.values(meetingContext.meetings)
                .filter((meeting) => meeting.finishTime <= now)
                .sort((a, b) => a.startTime - b.startTime)
                .map((meeting) => <PostMeeting key={meeting.id} meeting={meeting} />)
        );
    };

    return (
        <>
            <div className="pageComponent">
                <div className="containerAll">
                    <div id="liveContainer">{renderLiveMeetings()}</div>
                    <div id="meetingContainer">
                        <div id="upcomingContainer" className="mContainer">
                            <div className="flex justify-between">
                                {userContext.hasPermission('VIEW_MEETINGS') && (
                                    <p className="containerTtl">Upcoming meetings:</p>
                                )}
                                {userContext.hasPermission('MANAGE_MEETINGS') && (
                                    <button
                                        className="bg-[#7d6ca3] text-white m-2 px-2 rounded-md"
                                        onClick={() => setIsNewMeetingOpen(true)}
                                    >
                                        + New Meeting
                                    </button>
                                )}
                            </div>
                            {renderUpcomingMeetings()}
                        </div>
                        <div id="postmeetingContainer" className="mContainer">
                            {userContext.hasPermission('VIEW_MEETINGS') && (
                                <p className="containerTtl">Post-meetings stats:</p>
                            )}
                            {renderPostMeetings()}
                        </div>
                    </div>
                </div>
            </div>
            <NewMeeting isNewMeetingOpen={isNewMeetingOpen} setIsNewMeetingOpen={setIsNewMeetingOpen} />
        </>
    );
}
