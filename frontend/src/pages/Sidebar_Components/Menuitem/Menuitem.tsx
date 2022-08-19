import React from 'react'
import './menuitem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

export default function Menuitem(prop: { iconIndex: number; isMenuOpen: boolean; currentPage: number }) {

    const icons = [faHouse, faCalendar, faUser]
    const names = ['HOME', 'CALENDAR', 'PROFILE']

    const navigate = useNavigate();

    const loadAPage = () => {
        if (prop.iconIndex !== prop.currentPage) {
            console.log(`switching to ${names[prop.iconIndex].toLowerCase()}`)
            navigate(`../${names[prop.iconIndex].toLowerCase()}page`, { replace: true });
        } else {
            console.log('staying on the page')
        }
    }

    return (
        <div className='menuItem' onClick={loadAPage}>
            <div className='iconBox'>
                <FontAwesomeIcon icon={icons[prop.iconIndex]} size="2x" className={prop.currentPage === prop.iconIndex ? 'icon selectedItem' : 'icon'} />
            </div >
            <p className={prop.isMenuOpen ? 'iconTitle' : 'iconTitle invisibleText'} > {names[prop.iconIndex]}</p>
        </div >

    )
}
