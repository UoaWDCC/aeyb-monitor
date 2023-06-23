import RoleDTO from '@shared/dtos/RoleDTO';
import { useUserContext } from '../../../contexts/UserContext';
import TabManager from '../../../utility_components/tabs/TabManager';
import { ViewPermissions } from './ViewPermissions';

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

        // console.log(data)
        if (data) {
            const newRoles = { ...roles, [role.id]: role };
            setRoles(newRoles);
        }
    }

    return (
        <TabManager
            content={content}
            loader={(data) => {
                return (
                    <div className="p-6 w-full">
                        <h1 className="font-semibold text-2xl">{`${data.tabContent.name} role's permissions`}</h1>
                        <div>
                            <ViewPermissions role={data.tabContent} savePermissions={savePermissions} />
                        </div>
                        {/* {data.tabContent.permissions} */}
                    </div>
                );
            }}
        />
    );
}
