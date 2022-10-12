import { useState } from 'react'
import './sidebar.css'
import logo from '../../images/edited/AEYB_A0_Circle_resized.png'
import Menuitem from './menuitem/Menuitem'
import { Outlet } from 'react-router-dom';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { faCalendar, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import LogoutButton from '../LogoutButton';
import { useUserContext } from '../../contexts/UserContext';

export interface MenuItemData {
    url: string;
    icon: FontAwesomeIconProps["icon"],
    title: string;
}

const MenuItems: MenuItemData[] = [{
    url: '/',
    icon: faHouse,
    title: 'HOME',
}, {
    url: '/calendarpage',
    icon: faCalendar,
    title: 'CALENDAR',
}, {
    url: '/profilepage',
    icon: faUser,
    title: 'PROFILE'
}];

export default function Sidebar() {

    const [currentPage, setCurrentPage] = useState('HOME')
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const userContext = useUserContext()

    // toggles the sidebar being open and closed
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const renderMenuItems = () => {
        return MenuItems.map(page => (
            <Menuitem
                key={page.title}
                data={page}
                isCurrentPage={page.title === currentPage}
                isMenuOpen={isMenuOpen}
                setCurrentPage={setCurrentPage}
            />
        ));
    }

    return (
        <>
            <div className={'sidebar ' + (isMenuOpen ? 'w-[250px]' : 'w-[90px]')}>
                <div className='iconbox mb-[7vh] flex items-center'>
                    <img
                        onClick={toggleMenu}
                        className='relative aspect-square h-[60px] m-[15px] transition-all duration-200 active:left-[0.5px] active:top-[0.5px]'
                        src={logo}
                        alt="AEYB logo"
                    />
                    <div className={'min-w-[120px] transition-all duration-500 ' + (isMenuOpen ? '' : 'hidden')}>
                        <div>Welcome, </div>
                        <div className='font-bold'>{userContext.user.name}</div>
                        <LogoutButton></LogoutButton>
                    </div>
                </div>
                {renderMenuItems()}
            </div>
            <Outlet />
        </>

    )
}
