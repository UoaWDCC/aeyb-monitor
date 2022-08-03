import React from 'react'
import './sidebar.css'
import Mainlogo from './Mainlogo/Mainlogo'
import Menuitem from './Menuitem/Menuitem'

export default function sidebar() {
    return (
        <div className='sidebar'>
            <Mainlogo></Mainlogo>
            <Menuitem iconIndex={0} />
            <Menuitem iconIndex={1} />
            <Menuitem iconIndex={2} />
        </div>
    )
}
