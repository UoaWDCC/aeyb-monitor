import Popover from '@mui/material/Popover';
import RoleDTO from '@shared/dtos/RoleDTO';
import UserDTO from '@shared/dtos/UserDTO';
import { useRef, useState } from 'react';

export function UserRoleRow({
    user,
    roles,
    removeRole,
    addRole,
}: {
    user: UserDTO;
    roles: RoleDTO[];
    removeRole: (role: RoleDTO, userId: string) => void;
    addRole: (role: RoleDTO, userId: string) => void;
}) {
    const colors = [
        'bg-[#ae49b8]',
        'bg-[#7d259d]',
        'bg-[#748f9a]',
        'bg-[#455a64]',
        'bg-[#f44279]',
        'bg-[#c91e5c]',
        'bg-[#586bbb]',
        'bg-[#0087cc]',
        'bg-[#005898]',
        'bg-[#0097a3]',
        'bg-[#008779]',
        'bg-[#004d41]',
        'bg-[#629d44]',
        'bg-[#2f6929]',
        'bg-[#8d6e64]',
        'bg-[#60423c]',
        'bg-[#7e58bd]',
        'bg-[#5232a2]',
        'bg-[#f86c27]',
        'bg-[#ff5231]',
        'bg-[#c63921]',
    ];
    const color = colors[user.name.length % colors.length];

    const [showRoles, setShowRoles] = useState<boolean>(false);
    const ref = useRef(null);

    return (
        <>
            <div className="flex flex-row gap-2 items-center w-full border-b-[1px] border-slate-300 pb-3">
                <div className="flex flex-row items-center gap-2 w-[300px]">
                    <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-xl text-white capitalize select-none ${color}`}
                    >
                        <span className="translate-x-[0.5px] translate-y-[-0.5px]">{user.name.slice(0)[0]}</span>
                    </span>
                    <span className="h-min">{user.name}</span>
                </div>
                <div className="flex gap-1 flex-wrap w-full min-w-0">
                    {user.roles.map((role) => {
                        return (
                            <span
                                onClick={() => removeRole(role, user.id)}
                                key={`${user.name} ${role.id} ${Math.random()}`}
                                className={`px-2 py-1 bg-slate-200 rounded-md text-sm text-slate-700 ${
                                    ['Admin', 'Default'].indexOf(role.name) === -1 && 'hover:line-through'
                                } hover:bg-slate-300 cursor-pointer select-none`}
                            >
                                {role.name}
                            </span>
                        );
                    })}
                    <div
                        onClick={() => setShowRoles(true)}
                        className="px-2 py-1 leading-tight bg-slate-200 rounded-md hover:bg-slate-300 cursor-pointer select-none relative"
                        ref={ref}
                    >
                        +
                    </div>
                    <Popover
                        open={showRoles}
                        onClose={() => setShowRoles(false)}
                        anchorEl={ref.current}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <>
                            <div className="w-80 max-h-[200px] p-2">
                                <h2>Roles</h2>
                            </div>
                            {roles
                                .filter(
                                    (role) =>
                                        ['Admin', 'Default', ...user.roles.map((role) => role.name)].indexOf(
                                            role.name,
                                        ) === -1,
                                )
                                .map((role) => {
                                    return (
                                        <div
                                            className="p-2 hover:bg-slate-200 cursor-pointer"
                                            onClick={() => addRole(role, user.id)}
                                        >
                                            {role.name}
                                        </div>
                                    );
                                })}
                        </>
                    </Popover>
                </div>
            </div>
        </>
    );
}
