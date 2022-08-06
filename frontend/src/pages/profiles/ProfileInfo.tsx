import IonIcon from '@reacticons/ionicons'; 

import { ReactElement } from 'react';
import { Profile, UserStatus, Roles } from './Interface';
import NavBar from '../components/navigation_bar.js';
import NotifBar from '../components/notification_bar.js';
import React, { useState } from 'react';

interface ProfileInformation {
    profile: Profile;
}

const ProfileInfo = (props: ProfileInformation): ReactElement => {

    return (
        <div>
            <div className='flex flex-col items-center w-screem h-screen'>
                {/*Basic Information Div
                    - one role shown which is their main role 
                    - main role should always be the first role given to the user 
                      OR group the roles into categories 
                 */}
                <div className='w-1/3 flex flex-row justify-center mt-9'>
                    <div>
                        <img className='rounded-full scale-90' src={props.profile.profilePictureUrl}/>
                    </div>
                    <div className='mt-10 ml-10 space-y-8 text-4xl'>
                        <p className='font-bold mb-3 text-[#262B6C]'>{props.profile.name}</p>
                        <span className=' border-[#FF0201] text-[#FF0201] border-2 rounded-md px-4'>{props.profile.roles[0]}</span>
                    </div>
                </div>

                {/*Settings Div 
                    - output will depend on main role
                */}
                <div className='flex flex-col w-1/3 mt-10 text-4xl text-[#262B6C]'>
                    <button className='border-solid border-t border-[#262B6C] text-left flex-row inline-flex px-8'>
                        <p className='py-16 w-3/4 h-full'>Personal Stats</p>
                        <div className='py-16 w-1/4 h-full text-right'><IonIcon name="chevron-forward-outline"/></div>
                    </button>
                    <button className='border-solid border-t border-[#262B6C] text-left flex-row inline-flex px-8'>
                        <p className='py-16 w-3/4 h-full'>Meeting Stats</p>
                        <div className='py-16 w-1/4 h-full text-right'><IonIcon name="chevron-forward-outline"/></div>
                    </button>
                    <button className='border-solid border-t border-[#262B6C] text-left flex-row inline-flex px-8'>
                        <p className='py-16 w-3/4 h-full'>Roles</p>
                        <div className='py-16 w-1/4 h-full text-right'><IonIcon name="chevron-forward-outline"/></div>
                    </button>
                </div>
            </div>

            <NavBar/> 
            <NotifBar/>
        </div>
    );
};

export default ProfileInfo;
