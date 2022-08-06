import IonIcon from '@reacticons/ionicons'; 
import img from "../../images/logos/AEYB_A0_Circle.png";
import React, { useState } from 'react';

const NavBar = () =>{
    const [open,setOpen] = useState(false);
    return( 
        <div className = {`absolute md:top-0 left-0 md:h-screen ${open? "md:w-72":"md:w-32"} duration-300 m-0 flex md:flex-col sm:bottom-0 sm:inset-x-0 sm:min-w-screen sm:h-32 sm:space-x-24 text-blue-800 font-bold md:space-y-40 md:space-x-12 shadow-lg bg-white`}>
            <img src={img} className='hidden w-32 mt-8 md:block cursor-pointer' onClick={()=>setOpen(!open)}></img>
            <button className='flex gap-x-12 hover:text-blue-500'>
                <div><IonIcon name="calendar-clear" size='large'/></div>
                <span className={`hidden ${open? "md:block":"md:hidden"} text-2xl`}>CALENDAR</span>
            </button>
            <button className='flex gap-x-12 hover:text-blue-500'>
                <div><IonIcon name="home" size='large'/></div>
                <span className={`hidden ${open? "md:block":"md:hidden"} text-2xl`}>HOME</span>
            </button>
            <button className='flex gap-x-12 hover:text-blue-500'>
                <div><IonIcon name="person" size='large'/></div>
                <span className={`hidden ${open? "md:block":"md:hidden"} text-2xl`}>PROFILE</span>
            </button>
        </div>
    );
}

export default NavBar; 
