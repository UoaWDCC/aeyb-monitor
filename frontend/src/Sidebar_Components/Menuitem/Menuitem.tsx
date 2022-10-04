import React from 'react'
import './menuitem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

export default function Menuitem(prop: { iconIndex: number; isMenuOpen: boolean; currentPage: number; setCurrentPage: Function }) {

    enum Page {
        HOME,
        CALENDAR,
        PROFILE
    }

    const icons = [faHouse, faCalendar, faUser]

    const navigate = useNavigate();

    const loadAPage = () => {
        if (prop.iconIndex !== prop.currentPage) {
            navigate(`../${Page[prop.iconIndex].toLowerCase()}page`, { replace: true })
            prop.setCurrentPage(prop.iconIndex)
        }
    }

    return (
        <div className='menuItem' onClick={loadAPage}>
            <div className='iconBox'>
                <FontAwesomeIcon icon={icons[prop.iconIndex]} size="2x" className={'relative active:opacity-95 ' + (prop.currentPage === prop.iconIndex ? 'opacity-[.85] hover:opacity-90' : 'opacity-70 hover:opacity-80')} />
            </div >
            <p className={'iconTitle ' + (prop.isMenuOpen ? 'ml-[20px]' : 'ml-[-300px]')}>
                {Page[prop.iconIndex]}
            </p>
        </div >

    )
}
