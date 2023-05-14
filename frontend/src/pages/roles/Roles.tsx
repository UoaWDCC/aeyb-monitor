import IonIcon from '@reacticons/ionicons';
import React, { useEffect, useState } from 'react';
import './Roles.css';

import UserList from './components/UserList';
import RoleList from './components/RoleList';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import RoleDTO from '@shared/dtos/RoleDTO';
import UserDTO from '@shared/dtos/UserDTO';
import LoadingSpinner from './components/LoadingSpinner';
import { Permission } from '@shared/utils/Permission';
import PermissionsList from './components/PermissionsList';
import Button from 'src/utility_components/Button';

function Roles() {
    const userContext = useUserContext();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState<Record<string, RoleDTO>>({});
    const [users, setUsers] = useState<Record<string, UserDTO>>({});
    const [activeRole, setActiveRole] = useState<string | null>(null);

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

    const handleAddRole = async (roleName: string) => {
        const data = await userContext.fetcher('POST /api/roles', {
            name: roleName,
            color: '#262b6c',
            permissions: [],
        });
        if (data) {
            setRoles({ ...roles, [data.role.id]: data.role });
        }
    };

    const handleSetPermissions = (newPermissions: Permission[]) => {
        const updatedRole: RoleDTO = { ...roles[activeRole], permissions: newPermissions };
        setRoles({ ...roles, [updatedRole.id]: updatedRole });
    };

    const handleSaveRole = async () => {
        await userContext.fetcher('PATCH /api/roles/:roleId', {
            permissions: roles[activeRole].permissions
        }, { roleId: roles[activeRole].id });
    }

    return (
        // Page container
        <div className=" md:pl-[90px] bg-white overflow-scroll h-screen md:ml-4">
            {/* Page heading */}
            <div className="px-4 pt-2 flex flex-row h-[5%]">
                {/* Return button */}
                <div className="">
                    <Button size='medium' color='#262a6c' onClick={returntoProfile}>
                        <IonIcon name="chevron-back-outline" /> Back </Button>
                </div>
            </div>
            <div className=" w-full p-4 rounded-md md:grid md:grid-cols-3 md:gap-12 overflow-scroll h-full">
                {/* Left column of roles and users */}
                <div className="flex flex-col">
                    <div className="h-[40%]">
                        <RoleList
                            roles={Object.values(roles)}
                            handleChangeActiveRole={setActiveRole}
                            handleAddRole={handleAddRole}
                        />
                    </div>
                    <div className="h-[40%]">
                        <UserList users={users} />
                    </div>
                </div>

                {/* Right column of permissions */}
                <div className="col-span-2 p-2 rounded-md mt-10 md:mt-0 h-fit">
                    {activeRole ? (
                        <>
                            <PermissionsList
                                activeRole={roles[activeRole].name}
                                permissions={roles[activeRole].permissions}
                                setPermissions={handleSetPermissions}
                            />
                            <Button size="medium" color="#262a6c" extraStyles="ml-[100%] translate-x-[-100%] mt-5" onClick={handleSaveRole}>Save</Button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="text-center text-[#262b6c] text-3xl">Select a role to view permissions</div>
                            {isLoading && (
                                <div className="flex items-center gap-2 justify-center text-[#bdc3e3]">
                                    <LoadingSpinner />
                                    <p className="text-2xl font-semibold">Loading...</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Roles;
