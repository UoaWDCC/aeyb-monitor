import React, { ReactElement, useState } from 'react';
import MonthlyInstance from './components/MonthlyInstance';
import { useMeetingContext } from '../../contexts/MeetingContext';
import { useUserContext } from '../../contexts/UserContext';
import IonIcon from '@reacticons/ionicons';
import Button from 'src/utility_components/Button';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarPage() {
    const userContext = useUserContext();
    const meetingContext = useMeetingContext();
    const [month, setMonth] = useState(new Date());
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const [value, onChange] = useState<Value>(new Date());

    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const renderMonthlyMeetings = () => {
        console.log(
            Object.values(meetingContext.meetings)
                .filter(
                    (meeting) =>
                        meeting.startTime >= startOfMonth.getTime() && meeting.startTime <= endOfMonth.getTime(),
                )
                .sort((a, b) => a.startTime - b.startTime),
        );
        return Object.values(meetingContext.meetings)
            .filter(
                (meeting) => meeting.startTime >= startOfMonth.getTime() && meeting.startTime <= endOfMonth.getTime(),
            )
            .sort((a, b) => a.startTime - b.startTime)
            .map((meeting) => {
                return <MonthlyInstance key={meeting.id} meeting={meeting} />;
            });
    };

    return (
        <div className="pageComponent">
            {/* CALENDAR/EVENT COLLECTION DIV */}
            <div className="flex flex-col h-full w-full md:w-1/2">
                <div className="flex-row text-center mt-8 mb-8 text-[#262B6C]">
                    <Button
                        size="custom"
                        color="#262a6c"
                        extraStyles="px-4 py-4 rounded-sm w-20 relative overflow-hidden transition duration-300 active:-translate-x-1"
                        onClick={() => {
                            setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
                        }}
                    >
                        <span className="absolute inset-0 bg-white opacity-20 transition-opacity duration-300 hover:opacity-30"></span>
                        <IonIcon name="chevron-back-outline" size="large" />
                    </Button>

                    <div className="inline-block w-1/2 text-xl font-bold">
                        {/*{months[month.getMonth()]} {month.getFullYear()}*/}
                        <DatePicker
                            onChange={(date) => setMonth(date as Date)}
                            value={month}
                            maxDetail="year"
                            format="MMM yyyy"
                            clearIcon={null}
                            calendarClassName="bg-[#262a6c] text-[#bdc3e3]"
                        />
                    </div>

                    <Button
                        size="custom"
                        color="#262a6c"
                        extraStyles="px-4 py-4 rounded-sm w-20 relative overflow-hidden transition duration-300"
                        onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                    >
                        <span className="absolute inset-0 bg-white opacity-20 transition-opacity duration-300 hover:opacity-30"></span>
                        <IonIcon name="chevron-forward-outline" size="large" />
                    </Button>
                </div>
                {userContext.hasPermission('VIEW_MEETINGS') && renderMonthlyMeetings()}
            </div>
        </div>
    );
}
