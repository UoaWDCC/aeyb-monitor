import { ReactElement } from 'react';
import IonIcon from '@reacticons/ionicons'; 
import img from "../../images/logos/IG_story1.jpg";

const NavBar = () =>{
    return( 
        <div className = "absolute top-0 left-0 min-h-screen w-32 m-0 flex flex-col text-blue-800 font-bold items-center space-y-56 shadow-lg">
            <img src={img}></img>
            <button><IonIcon name="calendar-clear" size='large' className='hover:text-blue-500'/></button>
            <button><IonIcon name="home" size='large' className='hover:text-blue-500'/></button>
            <button><IonIcon name="person" size='large' className='hover:text-blue-500'/></button>
        </div>
    );
}

export default NavBar; 
