import React from 'react'
import './sidebar.css'
import Mainlogo from './Mainlogo/Mainlogo'
import Menuitem from './Menuitem/Menuitem'

export default function sidebar(prop) {

    return (
        <div className={prop.isClicked ? "sidebar menuOpen" : "sidebar"}>
            <div className='logoBox' onClick={prop.toggleMenu}>
                <Mainlogo />
            </div>
            <Menuitem iconIndex={0} />
            <Menuitem iconIndex={1} />
            <Menuitem iconIndex={2} />
        </div>
    )
}
