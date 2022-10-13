import MeetingDTO from '../../../shared/Types/dtos/MeetingDTO';

function WeeklyInstance(props: { meeting: MeetingDTO }) {
    return (
        <div>
            <div className='flex justify-center overflow-scroll'>
                <div className={`flex-col mb-4 w-full lg:w-3/4 py-4 px-4  rounded-lg text-[#262B6C] bg-slate-100`}>
                    <p className='font-bold text-3xl'>{props.meeting.name}</p>
                    <div className='text-xl text-[#464a83]'>{
                        props.meeting.description === undefined ?
                            <p>no description.</p>
                            : <p>{props.meeting.description}</p>
                    }</div>
                    <p className='text-xl mt-4'>{props.meeting.location}</p>
                </div>
            </div>
        </div>
    );
};

export default WeeklyInstance; 