import Popover from '@mui/material/Popover';
import RoleDTO from '@shared/dtos/RoleDTO';
import UserDTO from '@shared/dtos/UserDTO';
import { useRef, useState } from 'react';
import FakeProfile from '../../../utility_components/FakeProfile/FakeProfile';

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
    const [showRoles, setShowRoles] = useState<boolean>(false);
    const ref = useRef(null);

    function availableRolesToAdd() {
        const rolesToAdd = roles.filter(
            (role) => ['Admin', 'Default', ...user.roles.map((role) => role.name)].indexOf(role.name) === -1,
        );

        if (rolesToAdd.length === 0 && showRoles) {
            setShowRoles(false);
        }

        return rolesToAdd;
    }

    return (
        <>
            <div className="flex flex-row gap-2 items-center w-full border-b-[1px] border-slate-300 pb-3">
                <FakeProfile name={user.name} />
                <div className="flex gap-1 flex-wrap w-full min-w-0">
                    {user.roles.map((role) => {
                        return (
                            <span
                                onClick={() => removeRole(role, user.id)}
                                key={`${user.name} ${role.id} ${Math.random()}`}
                                className={`px-2 py-1 bg-slate-200 rounded-md text-sm text-slate-700 select-none ${
                                    ['Admin', 'Default'].indexOf(role.name) === -1 && 'hover:line-through'
                                } hover:bg-slate-300 cursor-pointer select-none`}
                            >
                                {role.name}
                            </span>
                        );
                    })}
                    {availableRolesToAdd().length !== 0 && (
                        <>
                            <div
                                onClick={() => setShowRoles(true)}
                                className="px-2 py-1 leading-none bg-slate-200 rounded-md hover:bg-slate-300 cursor-pointer select-none relative select-none"
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
                                    {availableRolesToAdd().map((role) => {
                                        return (
                                            <div
                                                className="p-2 hover:bg-slate-200 cursor-pointer select-none"
                                                key={`${role.id}`}
                                                onClick={() => addRole(role, user.id)}
                                            >
                                                {role.name}
                                            </div>
                                        );
                                    })}
                                </>
                            </Popover>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
