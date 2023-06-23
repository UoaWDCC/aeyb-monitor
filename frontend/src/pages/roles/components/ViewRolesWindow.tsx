import RoleDTO from '@shared/dtos/RoleDTO';
import { useUserContext } from '../../../contexts/UserContext';
import Switch from '@mui/material/Switch';
import TabManager from '../../../utility_components/tabs/TabManager';
import { ViewPermissions } from './ViewPermissions';
import { Permission } from '@shared/utils/Permission';
import { useEffect, useRef, useState } from 'react';
import Button from '../../../utility_components/Button';

const PermissionsLists: { roles: Permission[]; users: Permission[]; meetings: Permission[] } = {
    roles: ['VIEW_ROLES', 'MANAGE_ROLES'],
    users: ['VIEW_USERS', 'MANAGE_USERS'],
    meetings: ['VIEW_MEETINGS', 'MANAGE_MEETINGS'],
};

export function ViewRolesWindow({
    roles,
    setRoles,
}: {
    roles: Record<string, RoleDTO>;
    setRoles: (roles: Record<string, RoleDTO>) => void;
}) {
    const content = Object.keys(roles).map((id) => {
        return {
            tabTitle: roles[id].name,
            tabContent: { ...roles[id] },
        };
    });

    const userContext = useUserContext();
    async function savePermissions(role: RoleDTO) {
        const data = await userContext.fetcher('PATCH /api/roles/:roleId', role, {
            roleId: role.id,
        });

        if (data) {
            const newRoles = { ...roles, [role.id]: role };
            setRoles(newRoles);
        }
    }

    function isNotCreate(
        data: typeof content[number] | { tabTitle: 'Create New Role'; tabContent: { isNotTab: true } },
    ): asserts data is typeof content[number] {
        if (data.tabTitle === 'Create New Role' && 'isNotTab' in data.tabContent) {
            throw new Error();
        }
    }

    return (
        <TabManager
            content={[{ tabTitle: 'Create New Role', tabContent: { isNotTab: true } }, ...content]}
            loader={(data) => {
                if ('isNotTab' in data.tabContent) {
                    return <CreateNewRole roles={roles} setRoles={setRoles} />;
                } else {
                    isNotCreate(data);

                    return (
                        <div className="p-6 w-full">
                            <h1 className="font-semibold text-2xl">{`${data.tabContent.name} role's permissions`}</h1>
                            <div>
                                <ViewPermissions role={data.tabContent} savePermissions={savePermissions} />
                            </div>
                        </div>
                    );
                }
            }}
        />
    );
}

function CreateNewRole({
    roles,
    setRoles,
}: {
    roles: Record<string, RoleDTO>;
    setRoles: (val: Record<string, RoleDTO>) => void;
}) {
    const [permissions, setPermissions] = useState<Set<Permission>>(new Set());
    const nameRef = useRef<HTMLInputElement>(null);
    const userContext = useUserContext();

    function checkSwitch(perm: Permission) {
        if (permissions.has(perm)) {
            permissions.delete(perm);
        } else {
            permissions.add(perm);
        }
        setPermissions(new Set(Array.from(permissions)));
    }

    async function createNewRole() {
        if (nameRef.current === null) {
            return;
        }

        if (nameRef.current.value.trim() === '') {
            return;
        }

        const data = await userContext.fetcher('POST /api/roles', {
            color: `#${(~~(Math.random() * 256)).toString(16)}${(~~(Math.random() * 256)).toString(16)}${(~~(
                Math.random() * 256
            )).toString(16)}`,
            name: nameRef.current.value,
            permissions: Array.from(permissions),
        });

        console.log(data);
        if (data) {
            setRoles({ ...roles, [data.role.id]: data.role });
        }
    }

    useEffect(() => {
        console.log(permissions);
    }, [permissions]);

    return (
        <div className="p-6 w-full">
            <h1 className="font-semibold text-2xl">Create new role</h1>
            <br />
            <div>
                <label>
                    Role name:
                    <input className="bg-slate-100 p-2 w-full rounded-sm" type="text" ref={nameRef} required />
                </label>

                <div className="flex py-6 flex-col w-full">
                    <h2>Set permissions</h2>
                    <div className="span-y-6 gap-4">
                        <div>
                            <h2>Users</h2>
                            <div className="grid grid-cols-2 gap-4 justify-between">
                                {PermissionsLists.users.map((perm) => {
                                    return (
                                        <div key={perm} className="flex justify-between items-center p-2 bg-slate-200">
                                            {perm}
                                            <Switch
                                                checked={permissions.has(perm)}
                                                onChange={() => checkSwitch(perm)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <h2>Meetings</h2>
                        <div className="grid grid-cols-2 gap-4 justify-between">
                            {PermissionsLists.meetings.map((perm) => {
                                return (
                                    <div
                                        key={perm}
                                        className="flex justify-between items-center p-2 bg-slate-200 rounded-sm"
                                    >
                                        {perm}
                                        <Switch checked={permissions.has(perm)} onChange={() => checkSwitch(perm)} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <h2>Roles</h2>
                        <div className="grid grid-cols-2 gap-4 justify-between">
                            {PermissionsLists.roles.map((perm) => {
                                return (
                                    <div
                                        key={perm}
                                        className="flex justify-between items-center p-2 bg-slate-200 rounded-sm"
                                    >
                                        {perm}
                                        <Switch checked={permissions.has(perm)} onChange={() => checkSwitch(perm)} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex flex-row-reverse">
                <Button onClick={createNewRole}>Create Role</Button>
            </div>
        </div>
    );
}
