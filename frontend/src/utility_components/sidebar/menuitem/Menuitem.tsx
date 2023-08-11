import './menuitem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { MenuItemData } from '../Sidebar';

export default function Menuitem(props: { data: MenuItemData; isMenuOpen: boolean; isCurrentPage: boolean }) {
    const navigate = useNavigate();

    const loadAPage = () => {
        navigate(props.data.url, { replace: true });
    };

    return (
        <div className={'menuItem ' + (props.isMenuOpen ? 'w-[250px]' : 'w-[90px]')} onClick={loadAPage}>
            <div className="iconBox">
                <FontAwesomeIcon
                    icon={props.data.icon}
                    size="2x"
                    className={
                        'relative active:opacity-95 ' +
                        (props.isCurrentPage ? 'opacity-[.85] hover:opacity-90' : 'opacity-70 hover:opacity-80')
                    }
                />
            </div>
            <p className={'iconTitle ' + (props.isMenuOpen ? 'ml-[20px]' : 'ml-[-300px]')}>{props.data.title}</p>
        </div>
    );
}
