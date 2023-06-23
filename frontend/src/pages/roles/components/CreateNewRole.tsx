import Switch from '@mui/material/Switch';
import { useEffect, useRef, useState } from 'react';
import tinycolor from 'tinycolor2';
import RoleDTO from '@shared/dtos/RoleDTO';
import { Permission } from '@shared/utils/Permission';
import { useUserContext } from '../../../contexts/UserContext';
import Button from '../../../utility_components/Button';

const PermissionsLists: { roles: Permission[]; users: Permission[]; meetings: Permission[] } = {
    roles: ['VIEW_ROLES', 'MANAGE_ROLES'],
    users: ['VIEW_USERS', 'MANAGE_USERS'],
    meetings: ['VIEW_MEETINGS', 'MANAGE_MEETINGS'],
};

export function CreateNewRole({
    roles,
    setRoles,
}: {
    roles: Record<string, RoleDTO>;
    setRoles: (val: Record<string, RoleDTO>) => void;
}) {
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
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

        setSubmitDisabled(true);
        const data = await userContext.fetcher('POST /api/roles', {
            color: tinycolor.random().toHexString(),
            name: nameRef.current.value,
            permissions: Array.from(permissions),
        });

        setSubmitDisabled(false);

        if (data) {
            setRoles({ ...roles, [data.role.id]: data.role });
            setPermissions(new Set());
            nameRef.current.value = '';
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
                    <div className="space-y-6 gap-4">
                        {Object.keys(PermissionsLists).map((category) => {
                            return (
                                <div key={category}>
                                    <h2>{category}</h2>
                                    <div className="grid grid-cols-2 gap-4 justify-between">
                                        {PermissionsLists[category].map((perm) => {
                                            return (
                                                <div
                                                    key={perm}
                                                    className="flex justify-between items-center p-2 bg-slate-200"
                                                >
                                                    {perm}
                                                    <Switch
                                                        checked={permissions.has(perm)}
                                                        onChange={() => checkSwitch(perm)}
                                                        disabled={submitDisabled}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="mt-4 flex flex-row-reverse">
                <Button onClick={createNewRole} disabled={submitDisabled}>
                    Create Role
                </Button>
            </div>
        </div>
    );
}
