import RoleDTO from '@shared/dtos/RoleDTO';
import UserDTO from '@shared/dtos/UserDTO';
import { useUserContext } from '../../../contexts/UserContext';
import { UserRoleRow } from './UserRoleRow';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../utility_components/Loading/LoadingSpinner';

export function ViewUserWindow() {
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState<Record<string, RoleDTO>>({});
    const [users, setUsers] = useState<Record<string, UserDTO>>({});

    const content = Object.keys(users).map((username) => {
        return {
            tabTitle: users[username].name,
            tabData: { ...users[username] },
        };
    });

    const userContext = useUserContext();

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
    }, []);

    async function removeRole(role: RoleDTO, userId: string) {
        if (['Admin', 'Default'].includes(role.name)) {
            return;
        }

        const data = await userContext.fetcher(
            'DELETE /api/users/:userId/roles',
            {
                roleIds: [role.id],
            },
            { userId },
        );

        if (data) {
            const newUsers = { ...users, [userId]: data.user };
            setUsers(newUsers);
        }
    }

    async function addRole(role: RoleDTO, userId: string) {
        const data = await userContext.fetcher(
            'POST /api/users/:userId/roles',
            {
                roleIds: [role.id],
            },
            { userId },
        );

        if (data) {
            const newUsers = { ...users, [userId]: data.user };
            setUsers(newUsers);
        }
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-4 flex flex-col gap-3 overflow-scroll w-full">
            {content.map((data, index) => (
                <UserRoleRow
                    key={index}
                    roles={Object.values(roles)}
                    user={data.tabData}
                    removeRole={removeRole}
                    addRole={addRole}
                />
            ))}
        </div>
    );
}
