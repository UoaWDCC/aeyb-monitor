import React from 'react'
import './sidebar.css'
import Mainlogo from './Mainlogo/Mainlogo'
import Menuitem from './Menuitem/Menuitem'

export default function Sidebar(prop: { isMenuOpen: boolean; toggleMenu: React.MouseEventHandler<HTMLDivElement> | undefined }) {


    return (
        <div className={prop.isMenuOpen ? "sidebar menuOpen" : "sidebar"}>
            <div className='logoBox' onClick={prop.toggleMenu}>
                <Mainlogo />
            </div>
            <Menuitem index={0} isClicked={prop.isMenuOpen} />
            <Menuitem index={1} isClicked={prop.isMenuOpen} />
            <Menuitem index={2} isClicked={prop.isMenuOpen} />
        </div>
    )
}
