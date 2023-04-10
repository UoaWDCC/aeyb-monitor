import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import MeetingDTO from "../shared/Types/dtos/MeetingDTO";
import Permission from "../shared/Types/utils/Permission";
import { useUserContext } from "./UserContext";
import { UnimplementedFunction } from "../utility/unimplemented";

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
        if (userContext.user && userContext.hasPermission(Permission.VIEW_MEETINGS)) {
            userContext.fetcher('GET /api/meetings', undefined, undefined, {
                passed: 'true',
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