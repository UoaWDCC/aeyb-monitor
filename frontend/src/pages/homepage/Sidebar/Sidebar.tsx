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
            <Menuitem index={0} isClicked={prop.isClicked} />
            <Menuitem index={1} isClicked={prop.isClicked} />
            <Menuitem index={2} isClicked={prop.isClicked} />
        </div>
    )
}
