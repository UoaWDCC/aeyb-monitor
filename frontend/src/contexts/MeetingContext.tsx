import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import MeetingDTO from "@shared/dtos/MeetingDTO";
import { useUserContext } from "./UserContext";
import { UnimplementedFunction } from "../utils";

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
            {children}
        </MeetingContext.Provider>
    )
}