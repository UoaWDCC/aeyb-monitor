import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import MeetingDTO from "@shared/dtos/MeetingDTO";
import { useUserContext } from "./UserContext";
import { UnimplementedFunction } from "../utils";
import LoadingSpinner from '../pages/roles/components/LoadingSpinner';

export interface MeetingContextProps {
    meetings: Record<string, MeetingDTO>;
    addMeeting(meeting: MeetingDTO): void;
}

export const useMeetingContext = () => useContext(MeetingContext);

const MeetingContext = createContext<MeetingContextProps>({
    meetings: {},
    addMeeting: UnimplementedFunction,
});

export function MeetingContextProvider({ children }: { children?: ReactNode }) {
    const userContext = useUserContext();
    const [meetings, setMeetings] = useState<Record<string, MeetingDTO>>({});
    const [isLoading, setIsLoading] = useState(true); //State to track loading state

    useEffect(() => {
        if (userContext.user && userContext.hasPermission("VIEW_MEETINGS")) {
            userContext.fetcher('GET /api/meetings', undefined, undefined, {
                passed: 'true',
                limit: Number.MAX_SAFE_INTEGER.toString(),
            }).then(data => {
                if (data) {
                    const meetings: Record<string, MeetingDTO> = {};
                    data.meetings.forEach(meeting => {
                        meetings[meeting.id] = meeting;
                    });
                    setMeetings(meetings);
                    setIsLoading(false);
                }
            });

        }
    }, [userContext]);

    function addMeeting(meeting: MeetingDTO) {
        setMeetings({ ...meetings, [meeting.id]: meeting })
    }

    const contextValue: MeetingContextProps = {
        meetings,
        addMeeting,
    }

    return (
        <MeetingContext.Provider value={contextValue}>
            {isLoading ?
                <div className="flex items-center justify-center h-screen">
                    <LoadingSpinner className='w-16 h-16' />
                </div>
                : children}
        </MeetingContext.Provider>
    )
}