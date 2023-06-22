import Switch from '@mui/material/Switch';
import { Permission } from '@shared/utils/Permission';
import { useUserContext } from '../../../contexts/UserContext';
import { createElement, useState } from 'react';

//groups each permission by type
const PermissionsLists: { roles: Permission[]; users: Permission[]; meetings: Permission[] } = {
    roles: ['VIEW_ROLES', 'MANAGE_ROLES'],
    users: ['VIEW_USERS', 'MANAGE_USERS'],
    meetings: ['VIEW_MEETINGS', 'MANAGE_MEETINGS'],
};

const allPermissions = Object.values(PermissionsLists).flat();

interface Props {
    activeRole: string;
    permissions: Permission[];
    setPermissions: (newPermissions: Permission[]) => void;
}

export default function PermissionsList(props: Props) {
    const userContext = useUserContext();
    //toggle all / section states
    const allChecked = allPermissions.every((permission) => props.permissions.includes(permission));

    //Toggles all permissions in a section
    function toggleSection(sectionPermissions: Permission[], isChecked: boolean) {
        if (isChecked) {
            props.setPermissions([...new Set([...sectionPermissions, ...props.permissions])]);
        } else {
            props.setPermissions(props.permissions.filter((permission) => !sectionPermissions.includes(permission)));
        }
    }
    return <>{/* <TabManager tabs={[{ tabTitle: 'Roles' }, { tabTitle: 'Permissions' }]}></TabManager> */}</>;
}
//
