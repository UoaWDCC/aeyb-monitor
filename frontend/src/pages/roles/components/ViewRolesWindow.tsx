import RoleDTO from '@shared/dtos/RoleDTO';
import { useUserContext } from '../../../contexts/UserContext';
import TabManager from '../../../utility_components/tabs/TabManager';
import { CreateNewRole } from './CreateNewRole';
import { ViewPermissions } from './ViewPermissions';
import UserDTO from '../../../../../shared/dtos/UserDTO';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../utility_components/LoadingSpinner';

export function ViewRolesWindow() {
    const userContext = useUserContext();

    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState<Record<string, RoleDTO>>({});

    useEffect(() => {
        if (isLoading) return;

        const fetchRoles = async () => {
            const data = await userContext.fetcher('GET /api/roles');
            if (data) {
                const roles: Record<string, RoleDTO> = {};
                data.roles.forEach((role) => (roles[role.id] = role));
                setRoles(roles);
            }
        };

        setIsLoading(true);
        Promise.all([fetchRoles()]).finally(() => setIsLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const content = Object.keys(roles).map((id) => ({
        tabTitle: roles[id].name,
        tabData: { ...roles[id] },
    }));

    async function savePermissions(role: RoleDTO) {
        const data = await userContext.fetcher('PATCH /api/roles/:roleId', role, {
            roleId: role.id,
        });

        if (data) {
            const newRoles = { ...roles, [role.id]: role };
            setRoles(newRoles);
        }
    }

    async function deleteRole(role: RoleDTO) {
        const data = await userContext.fetcher('DELETE /api/roles/:roleId', undefined, {
            roleId: role.id,
        });

        if (data) {
            const newRoles = { ...roles };
            delete newRoles[role.id];
            setRoles(newRoles);
        }
    }

    function isNotCreate(
        data: typeof content[number] | { tabTitle: 'Create New Role'; tabData: { isNotTab: true } },
    ): asserts data is typeof content[number] {
        if (data.tabTitle === 'Create New Role' && 'isNotTab' in data.tabData) {
            throw new Error();
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <TabManager
            content={[{ tabTitle: 'Create New Role', tabData: { isNotTab: true } }, ...content]}
            contentLoader={(data) => {
                if ('isNotTab' in data.tabData) {
                    return <CreateNewRole roles={roles} setRoles={setRoles} />;
                } else {
                    isNotCreate(data);

                    return (
                        <div className="p-6 w-full">
                            <div className="flex justify-between items-baseline">
                                <h1 className="font-semibold text-2xl">{`${data.tabData.name} role's permissions`}</h1>
                                {!['Admin', 'Default'].includes(data.tabTitle) && (
                                    <span
                                        onClick={() => deleteRole(data.tabData)}
                                        className="text-rose-600 text-sm cursor-pointer"
                                    >
                                        Delete
                                    </span>
                                )}
                            </div>
                            <div>
                                <ViewPermissions role={data.tabData} savePermissions={savePermissions} />
                            </div>
                        </div>
                    );
                }
            }}
            tabLoader={(content, activeTab, orientation, setActiveTab) => {
                return content.map((tab, index) => {
                    if ('isNotTab' in tab.tabData) {
                        return (
                            <div key={index} className="sticky top-0 bg-white">
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
                                        border-b-slate-200
                                        border-r-1
                                        items-center
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
                                key={index}
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
