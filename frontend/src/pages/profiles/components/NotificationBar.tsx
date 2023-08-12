import IonIcon from '@reacticons/ionicons';
import React, { useState } from 'react';
import { useDarkMode } from '../../../utility_components/DarkModeContext';

const NotifBar = () => {
    const [show, setShow] = useState(false);
    const [notify] = useState(true);
    const { darkMode } = useDarkMode(); // Get the dark mode state

    const lightTheme = 'text-[#262a6c]';
    const darkTheme = 'text-[#7f8bf5]';

    return (
        <div className="absolute right-4 top-4 text-right inline-flex gap-x-3">
            <div className={`${show ? 'block' : 'hidden'} w-96 h-72 bg-indigo-200 shadow-lg`}></div>
            <div>
                <span
                    className={`${
                        notify && !show ? 'block' : 'hidden'
                    } animate-ping absolute inline-flex h-4 w-4 rounded-full bg-red-600 opacity-75`}
                ></span>
                <span
                    className={`${notify ? 'block' : 'hidden'} absolute inline-flex rounded-full h-3 w-3 bg-orange-500`}
                ></span>
                <IonIcon
                    name="notifications"
                    size="large"
                    className={'cursor-pointer ' + (darkMode ? darkTheme : lightTheme)}
                    onClick={() => setShow(!show)}
                />
            </div>
        </div>
    );
};

export default NotifBar;
