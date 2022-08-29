import IonIcon from '@reacticons/ionicons';
import React, { useState } from 'react';

const SettingsBar = () => {
    return (
        <div className='flex flex-col w-3/4 md:w-3/5 mt-[5%] text-4xl text-[#262B6C]'>
            <button className='border-solid border-t border-[#262B6C] text-left flex-row inline-flex px-8'>
                <p className='py-16 w-3/4 h-full'>Personal Stats</p>
                <div className='py-16 w-1/4 h-full text-right'><IonIcon name="chevron-forward-outline" /></div>
            </button>
            <button className='border-solid border-t border-[#262B6C] text-left flex-row inline-flex px-8'>
                <p className='py-16 w-3/4 h-full'>Meeting Stats</p>
                <div className='py-16 w-1/4 h-full text-right'><IonIcon name="chevron-forward-outline" /></div>
            </button>
            <button className='border-solid border-t border-[#262B6C] text-left flex-row inline-flex px-8'>
                <p className='py-16 w-3/4 h-full'>Roles</p>
                <div className='py-16 w-1/4 h-full text-right'><IonIcon name="chevron-forward-outline" /></div>
            </button>
        </div>
    );
}

export default SettingsBar; 