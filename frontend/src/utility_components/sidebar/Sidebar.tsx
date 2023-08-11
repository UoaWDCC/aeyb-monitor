import { useState } from 'react';
import './sidebar.css';
import logo from '../../images/edited/AEYB_A0_Circle_resized.png';
import Menuitem from './menuitem/Menuitem';
import { Outlet, useLocation } from 'react-router-dom';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { faCalendar, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '../../contexts/UserContext';
import Button from '../Button';
import DarkToggle from './DarkToggle';
import { useDarkMode } from '../DarkModeContext';

export interface MenuItemData {
    url: string;
    icon: FontAwesomeIconProps['icon'];
    title: string;
}

const MenuItems: MenuItemData[] = [
    {
        url: '/',
        icon: faHouse,
        title: 'HOME',
    },
    {
        url: '/calendarpage',
        icon: faCalendar,
        title: 'CALENDAR',
    },
    {
        url: '/profilepage',
        icon: faUser,
        title: 'PROFILE',
    },
];

export default function Sidebar() {
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const userContext = useUserContext();
    const { darkMode } = useDarkMode(); // Get the dark mode state

    // toggles the sidebar being open and closed
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logout = () => {
        userContext.logout();
    };

    const renderMenuItems = () => {
        return MenuItems.map((page) => (
            <Menuitem
                key={page.title}
                data={page}
                isCurrentPage={page.url === location.pathname}
                isMenuOpen={isMenuOpen}
            />
        ));
    };

    return (
        <>
            <div
                className={
                    'sidebar ' + (isMenuOpen ? 'w-[250px] ' : 'w-[90px] ') + (darkMode ? 'darkSideBar' : 'sidebarBG')
                }
            >
                <div className={'mb-[7vh] flex flex-row items-center w-[90px]'}>
                    <div className={(darkMode ? 'darkSideBar ' : 'bg-white ') + 'aspect-square z-10 w-[89px]'}>
                        <img
                            onClick={toggleMenu}
                            className="aspect-square h-[60px] m-[15px] transition-all duration-200 active:left-[0.5px] active:top-[0.5px]"
                            src={logo}
                            alt="AEYB logo"
                        />
                    </div>
                    <div
                        className={
                            'absolute z-0 min-w-[120px] transition-all duration-500 flex flex-col gap-y-2 ' +
                            (isMenuOpen ? 'left-[110px]' : 'left-[-300px]')
                        }
                    >
                        <div>
                            <div className="text-sm">Welcome,</div>
                            <div className="font-bold leading-4 text-lg">{userContext.user.name}</div>
                        </div>
                        <Button size="small" color="#262a6c" onClick={logout}>
                            Log Out
                        </Button>
                    </div>
                </div>
                {renderMenuItems()}
                <div className="pl-6">
                    <DarkToggle />
                </div>
            </div>
            <Outlet />
        </>
    );
}
