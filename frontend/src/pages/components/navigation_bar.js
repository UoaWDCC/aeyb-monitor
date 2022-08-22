import IonIcon from '@reacticons/ionicons'; 
import img from "../../images/logos/AEYB_A0_Circle.png";
import React, { useState } from 'react';

const NavBar = () =>{
    const [open,setOpen] = useState(false);
    return( 
        <div className = {`sticky md:top-0 left-0 md:h-screen ${open? "md:w-72":"md:w-32"} duration-300 m-0 flex md:flex-col bottom-0 inset-x-0 min-w-screen h-24 space-x-[22%] text-blue-800 font-bold md:space-y-40 md:space-x-12 bg-white border-t-2 items-center md:items-baseline md:border-r-2`}>
            <img src={img} className='hidden w-44 mt-8 md:block cursor-pointer' onClick={()=>setOpen(!open)}></img>
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
