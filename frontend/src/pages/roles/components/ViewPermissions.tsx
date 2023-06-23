import Switch from '@mui/material/Switch';
import RoleDTO from '@shared/dtos/RoleDTO';
import { Permission } from '@shared/utils/Permission';
import { useState } from 'react';

const PermissionsLists: { roles: Permission[]; users: Permission[]; meetings: Permission[] } = {
    roles: ['VIEW_ROLES', 'MANAGE_ROLES'],
    users: ['VIEW_USERS', 'MANAGE_USERS'],
    meetings: ['VIEW_MEETINGS', 'MANAGE_MEETINGS'],
};

export function ViewPermissions({
    role,
    savePermissions,
}: {
    role: RoleDTO;
    savePermissions: (role: RoleDTO) => void;
}) {
    const [beingUpdatedSwitch, setBeingUpdatedSwitch] = useState<Set<string>>(new Set());

    function checkSwitch(perm: Permission) {
        if (['Admin', 'Default'].indexOf(role.name) !== -1) {
            return;
        }

        const perms = new Set(role.permissions);
        if (perms.has(perm)) {
            console.log('delete');
            perms.delete(perm);
        } else {
            perms.add(perm);
        }
        savePermissions({
            ...role,
            ['permissions']: Array.from(perms) as Permission[],
        });
        // setRoles(newRoles)
        // console.log('124yu1r9ifh')
    }

    return (
        <div className="py-6 gap-4 flex flex-col w-full">
            <div>
                <h2>Users</h2>
                <div className="grid grid-cols-2 gap-4 justify-between">
                    {PermissionsLists.users.map((perm) => {
                        return (
                            <div key={perm} className="flex justify-between items-center p-2 bg-slate-200">
                                {perm}
                                <Switch
                                    checked={role.permissions.indexOf(perm) !== -1}
                                    onChange={() => checkSwitch(perm)}
                                    disabled={['Admin', 'Default'].indexOf(role.name) !== -1}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <h2>Meetings</h2>
                <div className="grid grid-cols-2 gap-4 justify-between">
                    {PermissionsLists.meetings.map((perm) => {
                        return (
                            <div key={perm} className="flex justify-between items-center p-2 bg-slate-200 rounded-sm">
                                {perm}
                                <Switch
                                    checked={role.permissions.indexOf(perm) !== -1}
                                    onChange={() => checkSwitch(perm)}
                                    disabled={['Admin', 'Default'].indexOf(role.name) !== -1}
                                />
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
                            <div key={perm} className="flex justify-between items-center p-2 bg-slate-200 rounded-sm">
                                {perm}
                                <Switch
                                    checked={role.permissions.indexOf(perm) !== -1}
                                    onChange={() => checkSwitch(perm)}
                                    disabled={['Admin', 'Default'].indexOf(role.name) !== -1}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}