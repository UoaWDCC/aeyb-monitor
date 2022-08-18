import React from 'react'
import './sidebar.css'
import Mainlogo from './Mainlogo/Mainlogo'
import Menuitem from './Menuitem/Menuitem'

export default function Sidebar(prop: { isClicked: any; toggleMenu: React.MouseEventHandler<HTMLDivElement> | undefined; setSelectedItem: (arg0: number) => any; selectedItem: number }) {

    const selectItem = () => {
        prop.setSelectedItem(1)
    }

    return (
        <div className={prop.isClicked ? "sidebar menuOpen" : "sidebar"}>
            <div className='logoBox' onClick={prop.toggleMenu}>
                <Mainlogo />
            </div>
            <Menuitem index={0} isClicked={prop.isClicked} onClick={selectItem} isSelected={prop.selectedItem === 0} />
            <Menuitem index={1} isClicked={prop.isClicked} onClick={selectItem} isSelected={prop.selectedItem === 1} />
            <Menuitem index={2} isClicked={prop.isClicked} onClick={selectItem} isSelected={prop.selectedItem === 2} />
        </div>
    )
}
