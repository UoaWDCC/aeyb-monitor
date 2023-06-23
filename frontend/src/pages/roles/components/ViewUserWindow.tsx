import RoleDTO from '@shared/dtos/RoleDTO';
import UserDTO from '@shared/dtos/UserDTO';
import { useUserContext } from '../../../contexts/UserContext';
import { UserRoleRow } from './UserRoleRow';

export function ViewUserWindow({
    users,
    setUsers,
    roles,
}: {
    users: Record<string, UserDTO>;
    setUsers: (users: Record<string, UserDTO>) => void;
    roles: Record<string, RoleDTO>;
}) {
    const content = Object.keys(users).map((username) => {
        return {
            tabTitle: users[username].name,
            tabData: { ...users[username] },
        };
    });

    const userContext = useUserContext();
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

    return (
        <div className="p-4 flex flex-col gap-3 overflow-scroll w-full">
            {content.map((data, index) => {
                return (
                    <UserRoleRow
                        key={index}
                        roles={Object.values(roles)}
                        user={data.tabData}
                        removeRole={removeRole}
                        addRole={addRole}
                    />
                );
            })}
        </div>
    );
}
