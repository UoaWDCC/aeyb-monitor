import React, { ReactElement } from 'react';
import MeetingDTO from '../../../shared/Types/dtos/MeetingDTO';

function WeeklyInstance(props: { meeting: MeetingDTO }) {
    return (
        <div>
            <div className='flex justify-center overflow-scroll'>
                <div className={`flex-col mb-4 w-full lg:w-3/4 py-4 px-4 bg-slate-100`}>
                    <p className='font-bold text-3xl'>{props.meeting.name}</p>
                    <p className='font-bold text-2xl'>{props.meeting.time}</p>
                    <p className='text-2xl'>{props.meeting.description}</p>
                </div>
            </div>
        </div>
    );
};

export default WeeklyInstance; 