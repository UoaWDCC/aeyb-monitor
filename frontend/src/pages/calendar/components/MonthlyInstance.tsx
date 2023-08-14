import MeetingDTO from '@shared/dtos/MeetingDTO';
import IonIcon from '@reacticons/ionicons';
import { nth } from '../../../utils/timeUtil';

interface MonthlyInstanceProps {
    meeting: MeetingDTO;
}

export default function MonthlyInstance({ meeting }: MonthlyInstanceProps) {
    // day and date components
    const { name, startTime, description, location } = meeting;
    const days = ['Sunday ', 'Monday ', 'Tuesday ', 'Wednesday ', 'Thursday ', 'Friday ', 'Saturday '];
    const date = new Date(startTime);

    return (
        <div>
            <div className="flex justify-center overflow-scroll">
                <div className={`flex-col mb-4 w-full lg:w-3/4 py-4 px-4  rounded-lg text-[#262B6C] bg-slate-100`}>
                    <p className="font-bold text-3xl">{name}</p>
                    <div className="text-xl text-[#464a83]">
                        {description ? <p>{description}</p> : <p>no description</p>}
                    </div>

                    <div className="flex items-center">
                        <IonIcon name="time-outline" className="text-2xl pr-1" />
                        <p className="text-xl">
                            {days[date.getDay()]} {date.getDate()}
                            {nth(date.getDate())} at {date.getHours() % 12}:
                            {date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}{' '}
                            {date.getHours() >= 12 ? 'PM' : 'AM'}
                        </p>
                    </div>

                    <div className="flex items-center">
                        <IonIcon name="location-outline" className="text-2xl pr-1" />
                        <p className="text-xl">{location.location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
