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
    const content = Object.keys(roles).map((id) => ({
        tabTitle: roles[id].name,
        tabContent: { ...roles[id] },
    }));

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
            contentLoader={(data) => {
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
            tabLoader={(content, activeTab, orientation, setActiveTab) => {
                return content.map((tab, index) => {
                    if ('isNotTab' in tab.tabContent) {
                        return (
                            <div className="sticky top-0 bg-white">
                                <div
                                    key={Math.random()}
                                    onClick={() => {
                                        setActiveTab(index);
                                    }}
                                    className={`px-4 py-8 
                                        min-w-fit 
                                        cursor-pointer
                                        flex justify-between
                                        sticky
                                        top-0
                                        bg-white
                                        border-b
                                        border-slate-200
                                        items-center
                                        border-r-slate-200
                                        ${
                                            index === activeTab
                                                ? 'bg-slate-300 border-r-slate-500'
                                                : 'hover:bg-slate-200 border-transparent'
                                        } 
                                        ${orientation === 'row' ? 'border-b-2' : 'border-r-2'}`}
                                >
                                    <span>{tab.tabTitle}</span>
                                    <span className="text-xl">+</span>
                                </div>
                            </div>
                        );
                    } else {
                        isNotCreate(tab);

                        return (
                            <span
                                key={Math.random()}
                                onClick={() => {
                                    setActiveTab(index);
                                }}
                                className={`px-4 py-2 
                                        min-w-fit 
                                        cursor-pointer 
                                        ${
                                            index === activeTab
                                                ? 'bg-slate-300 border-slate-500'
                                                : 'hover:bg-slate-200 border-transparent'
                                        } 
                                        ${orientation === 'row' ? 'border-b-2' : 'border-r-2'}`}
                            >
                                {tab.tabTitle}
                            </span>
                        );
                    }
                });
            }}
        />
    );
}
