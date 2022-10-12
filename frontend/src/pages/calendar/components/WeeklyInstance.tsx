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
                return (
                    <div className='flex justify-center overflow-scroll'>
                        <div className={`flex-col mb-4 w-full lg:w-3/4 py-4 px-4`} style={{ backgroundColor: event.status }}>
                            <p className='font-bold text-3xl'>{event.title}</p>
                            <p className='font-bold text-2xl'>{event.time}</p>
                            <p className='text-2xl'>{event.description}</p>
                        </div>
                    </div>

                );
            })}
        </div>
    );
};

export default WeeklyInstance; 