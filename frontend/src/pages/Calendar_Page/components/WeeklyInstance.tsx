import React, { ReactElement } from 'react';
import { Weekly } from '../CalendarInterface';

interface eventList {
    weekly: Weekly
};

const WeeklyInstance = (props: eventList): ReactElement => {
    return (
        <div>
            {/*creates a div per event*/}
            {props.weekly.listOfEvents.map((event) => {
                return (<div>{event.title}</div>);
            })}
        </div>
    );
};

export default WeeklyInstance; 