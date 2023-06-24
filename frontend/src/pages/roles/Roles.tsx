import IonIcon from '@reacticons/ionicons';
import RoleDTO from '@shared/dtos/RoleDTO';
import UserDTO from '@shared/dtos/UserDTO';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import TabManager from '../../utility_components/tabs';
import { ViewRolesWindow } from './components/ViewRolesWindow';
import { ViewUserWindow } from './components/ViewUserWindow';

import './Roles.css';

function Roles() {
    const userContext = useUserContext();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState<Record<string, RoleDTO>>({});
    const [users, setUsers] = useState<Record<string, UserDTO>>({});

    useEffect(() => {
        if (isLoading) return;

        const fetchRoles = async () => {
            const data = await userContext.fetcher('GET /api/roles');
            if (data) {
                const roles: Record<string, RoleDTO> = {};
                data.roles.forEach((role) => (roles[role.id] = role));
                setRoles(roles);
            }
        };

        const fetchUsers = async () => {
            const data = await userContext.fetcher('GET /api/users');
            if (data) {
                const users: Record<string, UserDTO> = {};
                data.users.forEach((user) => (users[user.id] = user));
                setUsers(users);
            }
        };

        setIsLoading(true);
        Promise.all([fetchRoles(), fetchUsers()]).finally(() => setIsLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Navigation back to profile page
    const returntoProfile = () => {
        navigate('/profilepage/');
    };

    return (
        <div className=" md:pl-[90px] bg-white mx-2 h-screen flex flex-col max-h-screen min-h-0">
            <div className="my-2 flex flex-row">
                <span
                    onClick={returntoProfile}
                    className="flex flex-row items-center px-2 py-1 pr-3 cursor-pointer border-slate-300 border-solid border-[1px] rounded-md"
                >
                    <IonIcon name="chevron-back-outline" />
                    Back
                </span>
            </div>
            <TabManager
                orientation="row"
                content={[{ tabTitle: 'Roles' }, { tabTitle: 'Users' }]}
                ContentLoader={({ data }) => {
                    if (data.tabTitle === 'Roles') {
                        return <ViewRolesWindow roles={roles} setRoles={setRoles} />;
                    } else if (data.tabTitle === 'Users') {
                        return <ViewUserWindow users={users} setUsers={setUsers} roles={roles} />;
                    }

                    return <></>;
                }}
            />
        </div>
    );
}

export default Roles;
