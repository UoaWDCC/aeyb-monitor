import IonIcon from '@reacticons/ionicons';

import { ReactElement } from 'react';
import { Profile, UserStatus, Roles } from './Interface';
import Sidebar from '../Sidebar_Components/Sidebar'
import NotifBar from './components/Notification_Bar';
import SettingsBar from './components/Settings';
import React, { useState } from 'react';

interface ProfileInformation {
    profile: Profile;
}

const ProfileInfo = (props: ProfileInformation): ReactElement => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // toggles the sidebar being open and closed
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div>
            <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} currentPage={2} />
            <div className='overflow-scroll flex flex-col items-center w-screem h-screen'>
                {/*Basic Information Div
                    - one role shown which is their main role 
                    - main role should always be the first role given to the user 
                      OR group the roles into categories 
                 */}
                <div className='w-4/5 space-x-0 flex flex-row items-center justify-center mt-9'>
                    <div>
                        <img className='rounded-full w-4/5' src={props.profile.profilePictureUrl} />
                    </div>
                    <div className='ml-10 text-3xl md:text-4xl'>
                        <p className='font-bold mb-4 text-[#262B6C]'>{props.profile.name}</p>
                        <span className=' border-[#FF0201] text-[#FF0201] border-2 rounded-md px-4'>{props.profile.roles[0]}</span>
                    </div>
                </div>

                {/*Settings Div 
                    - output will depend on main role
                */}
                <SettingsBar />
            </div>
            <NotifBar />
        </div>
    );
};

export default ProfileInfo;
