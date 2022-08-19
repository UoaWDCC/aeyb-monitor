import React from 'react'
import './sidebar.css'
import Mainlogo from './Mainlogo/Mainlogo'
import Menuitem from './Menuitem/Menuitem'

export default function Sidebar(prop: { isMenuOpen: boolean; toggleMenu: React.MouseEventHandler<HTMLDivElement> | undefined; currentPage: number }) {

    return (
        <div className={prop.isMenuOpen ? "sidebar menuOpen" : "sidebar"}>
            <div className='logoBox' onClick={prop.toggleMenu}>
                <Mainlogo />
            </div>
            <Menuitem iconIndex={0} isClicked={prop.isMenuOpen} currentPage={prop.currentPage} />
            <Menuitem iconIndex={1} isClicked={prop.isMenuOpen} currentPage={prop.currentPage} />
            <Menuitem iconIndex={2} isClicked={prop.isMenuOpen} currentPage={prop.currentPage} />
        </div>
    )
}
