import React from 'react'
import './menuitem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

export default function Menuitem(prop) {

    const icons = [faCalendar, faHouse, faUser]

    return (
        <div className='iconBox'>
            <FontAwesomeIcon icon={icons[prop.iconIndex]} size="2x" className='icon' />
        </div>
    )
}
