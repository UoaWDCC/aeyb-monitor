import RoleDTO from '@shared/dtos/RoleDTO';
import { useUserContext } from '../../../contexts/UserContext';
import TabManager from '../../../utility_components/tabs/TabManager';
import { CreateNewRole } from './CreateNewRole';
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
