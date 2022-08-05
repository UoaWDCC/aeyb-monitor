import React from 'react'
import './menuitem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

export default function Menuitem(prop) {

    const icons = [faCalendar, faHouse, faUser]
    const names = ['HOME', 'CALENDAR', 'PROFILE']

    return (
        <div className='menuItem'>
            <div className='iconBox'>
                <FontAwesomeIcon icon={icons[prop.index]} size="2x" className='icon' />
            </div >
            <p className='iconTitle' style={{ 'visibility': prop.isClicked ? 'visible' : 'hidden' }} > {names[prop.index]}</p>
        </div >

    )
}
