import React from 'react'
import './menuitem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

export default function Menuitem(prop) {

    const icons = [faHouse, faCalendar, faUser]
    const names = ['HOME', 'CALENDAR', 'PROFILE']

    return (
        <div className={prop.isSelected ? 'menuItem selectedItem' : 'menuItem'}>
            <div className='iconBox'>
                <FontAwesomeIcon icon={icons[prop.index]} size="2x" className='icon' />
            </div >
            <p className={prop.isClicked ? 'iconTitle' : 'iconTitle visibleText'} > {names[prop.index]}</p>
        </div >

    )
}
