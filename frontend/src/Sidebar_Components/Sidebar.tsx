import React, { useState } from 'react'
import './sidebar.css'
import logo from '../images/edited/AEYB_A0_Circle_resized.png'
import Menuitem from './Menuitem/Menuitem'

export default function Sidebar(prop: { isMenuOpen: boolean; toggleMenu: React.MouseEventHandler<HTMLDivElement> }) {

    const [currentPage, setCurrentPage] = useState<number>(0)

    return (
        <div className={'sidebar ' + (prop.isMenuOpen ? 'w-[250px]' : 'w-[90px]')}>
            <div className='mb-[7vh]' onClick={prop.toggleMenu}>
                <img
                    className='relative aspect-square h-[60px] m-[15px] transition-all duration-200 active:left-[0.5px] active:top-[0.5px]'
                    src={logo}
                    alt="AEYB logo"
                />
            </div>
            <Menuitem iconIndex={0} isMenuOpen={prop.isMenuOpen} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <Menuitem iconIndex={1} isMenuOpen={prop.isMenuOpen} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <Menuitem iconIndex={2} isMenuOpen={prop.isMenuOpen} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}
