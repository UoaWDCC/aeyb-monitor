import MeetingDTO from '@shared/dtos/MeetingDTO';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingSpinner from '../utility_components/Loading/LoadingSpinner';
import { UnimplementedFunction } from '../utils';
import { useUserContext } from './UserContext';

export interface MeetingContextProps {
    meetings: Record<string, MeetingDTO>;
    addMeeting(meeting: MeetingDTO): void;
    updateMeeting(meeting: MeetingDTO): void;
    removeMeeting(meetingId: string): void;
}

export const useMeetingContext = () => useContext(MeetingContext);

const MeetingContext = createContext<MeetingContextProps>({
    meetings: {},
    addMeeting: UnimplementedFunction,
    updateMeeting: UnimplementedFunction,
    removeMeeting: UnimplementedFunction,
});

export function MeetingContextProvider({ children }: { children?: ReactNode }) {
    const userContext = useUserContext();
    const [meetings, setMeetings] = useState<Record<string, MeetingDTO>>({});
    const [isLoading, setIsLoading] = useState(true); //State to track loading state

    useEffect(() => {
        if (userContext.user && userContext.hasPermission('VIEW_MEETINGS')) {
            userContext
                .fetcher('GET /api/meetings', undefined, undefined, {
                    passed: 'true',
                    limit: Number.MAX_SAFE_INTEGER.toString(),
                })
                .then((data) => {
                    if (data) {
                        const meetings: Record<string, MeetingDTO> = {};
                        data.meetings.forEach((meeting) => {
                            meetings[meeting.id] = meeting;
                        });
                        setMeetings(meetings);
                    }
                });
        }
        setIsLoading(false);
    }, [userContext]);

    function addMeeting(meeting: MeetingDTO) {
        setMeetings({ ...meetings, [meeting.id]: meeting });
    }

    function updateMeeting(meeting: MeetingDTO) {
        setMeetings({ ...meetings, [meeting.id]: meeting });
    }

    function removeMeeting(meetingId: string) {
        const newMeetings = { ...meetings };
        delete newMeetings[meetingId];
        setMeetings(newMeetings);
    }

    const contextValue: MeetingContextProps = {
        meetings,
        addMeeting,
        updateMeeting,
        removeMeeting,
    };

    return (
        <MeetingContext.Provider value={contextValue}>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <LoadingSpinner className="w-16 h-16" />
                </div>
            ) : (
                children
            )}
        </MeetingContext.Provider>
    );
}

export function MeetingContextLayout() {
    return (
        <MeetingContextProvider>
            <Outlet />
        </MeetingContextProvider>
    );
}
