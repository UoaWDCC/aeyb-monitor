import IonIcon from '@reacticons/ionicons';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext';
import { useDarkMode } from '../../../utility_components/DarkModeContext';
import '../../../utility_components/darkmode.css';
import Roles from '../../roles/Roles';
import Button from 'src/utility_components/Button';

const SettingsBar = () => {
    const { darkMode } = useDarkMode(); // Get the dark mode state
    const userContext = useUserContext();
    const navigate = useNavigate();
    const navToRoles = () => {
        navigate('/profilepage/roles');
    };

    const lightTheme = '#262a6c';
    const darkTheme = '#4b58c9';

    return (
        <div className={'flex flex-col w-3/4 md:w-3/5 mt-[5%] text-3xl'}>
            <Button
                size="custom"
                extraStyles="my-2 px-7 py-10 text-left flex-row inline-flex"
                color={darkMode ? darkTheme : lightTheme}
            >
                <p className="w-3/4 h-full">Personal Stats</p>
                <div className="w-1/4 text-right relative">
                    <span className="absolute inset-y-0 right-0 w-24 bg-white opacity-10 -mr-7 -my-10"></span>
                    <IonIcon name="chevron-forward-outline" />
                </div>
            </Button>
            <Button
                size="custom"
                extraStyles="my-2 px-7 py-10 text-left flex-row inline-flex"
                color={darkMode ? darkTheme : lightTheme}
            >
                <p className="w-3/4 h-full">Meeting Stats</p>
                <div className="w-1/4 text-right relative">
                    <span className="absolute inset-y-0 right-0 w-24 bg-white opacity-10 -mr-7 -my-10"></span>
                    <IonIcon name="chevron-forward-outline" />
                </div>
            </Button>
            {userContext.hasPermission('VIEW_ROLES') && (
                <Button
                    size="custom"
                    extraStyles="my-2 px-7 py-10 text-left flex-row inline-flex"
                    color={darkMode ? darkTheme : lightTheme}
                    onClick={navToRoles}
                >
                    <p className="w-3/4 h-full">Roles</p>
                    <div className="w-1/4 text-right relative">
                        <span className="absolute inset-y-0 right-0 w-24 bg-white opacity-10 -mr-7 -my-10"></span>
                        <IonIcon name="chevron-forward-outline" />
                    </div>
                </Button>
            )}
        </div>
    );
};

export default SettingsBar;
