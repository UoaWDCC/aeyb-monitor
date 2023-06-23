import IonIcon from '@reacticons/ionicons';
import Popover from '@mui/material/Popover';
import React, { useEffect, useRef, useState } from 'react';
import './Roles.css';

import UserList from './components/UserList';
import RoleList from './components/RoleList';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import RoleDTO from '@shared/dtos/RoleDTO';
import UserDTO from '@shared/dtos/UserDTO';
import LoadingSpinner from '../../utility_components/LoadingSpinner';
import { Permission } from '@shared/utils/Permission';
import PermissionsList from './components/PermissionsList';
import Button from 'src/utility_components/Button';
import Switch from '@mui/material/Switch';
import TabManager from '../../utility_components/tabs';
import { ViewPermissions } from './components/ViewPermissions';
import { ViewRolesWindow } from './components/ViewRolesWindow';
import { UserRoleRow } from './components/UserRoleRow';

function Roles() {
    const userContext = useUserContext();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState<Record<string, RoleDTO>>({});
    const [users, setUsers] = useState<Record<string, UserDTO>>({});
    const [activeRole, setActiveRole] = useState<string | null>(null);

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

        const fetchUsers = async () => {
            const data = await userContext.fetcher('GET /api/users');
            if (data) {
                const users: Record<string, UserDTO> = {};
                data.users.forEach((user) => (users[user.id] = user));
                setUsers(users);
            }
        };

        setIsLoading(true);
        Promise.all([fetchRoles(), fetchUsers()]).finally(() => setIsLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Navigation back to profile page
    const returntoProfile = () => {
        navigate('/profilepage/');
    };

    const handleAddRole = async (roleName: string) => {
        const data = await userContext.fetcher('POST /api/roles', {
            name: roleName,
            color: '#262b6c',
            permissions: [],
        });
        if (data) {
            setRoles({ ...roles, [data.role.id]: data.role });
        }
    };

    const handleSetPermissions = (newPermissions: Permission[]) => {
        const updatedRole: RoleDTO = { ...roles[activeRole], permissions: newPermissions };
        setRoles({ ...roles, [updatedRole.id]: updatedRole });
    };

    const handleSaveRole = async () => {
        await userContext.fetcher(
            'PATCH /api/roles/:roleId',
            {
                permissions: roles[activeRole].permissions,
            },
            { roleId: roles[activeRole].id },
        );
    };

    return (
        <div className=" md:pl-[90px] bg-white mx-2 h-screen flex flex-col max-h-screen min-h-0">
            <div className="my-2 flex flex-row">
                <span
                    onClick={returntoProfile}
                    className="flex flex-row items-center px-2 py-1 pr-3 cursor-pointer border-slate-300 border-solid border-[1px] rounded-md"
                >
                    <IonIcon name="chevron-back-outline" />
                    Back
                </span>
                {/* <Button size="medium" color="#262a6c" onClick={returntoProfile}>
                    <IonIcon name="chevron-back-outline" /> Back{' '}
                </Button> */}
            </div>
            <TabManager
                orientation="row"
                content={[
                    { tabTitle: 'Wowzers', tabData: ['role1', 'role2'] },
                    { tabTitle: 'Roles' },
                    { tabTitle: 'Users', tabData: ['user1', 'user2'] },
                ]}
                loader={(data) => {
                    if (data.tabTitle === 'Wowzers') {
                        data.tabData; // readonly ['role1', 'role2']
                        // return data.tabData.map((val, index) => {
                        //     data.tabData // readonly ['user1', 'user2']
                        //     return <div key={index}>{val}</div>;
                        // });
                        return (
                            <TabManager
                                orientation="column"
                                content={[
                                    { tabTitle: 'Thexboss', tabData: ['Awesome', '🥚'] },
                                    { tabTitle: 'Timothy', tabData: ['HELLO 😁'] },
                                    { tabTitle: 'Hello World!', tabData: ['HELLO 😁', '😀😀😀😀😀'] },
                                    { tabTitle: 'Hello World!', tabData: ['HELLO2 😁', '😀😀😀😀😀'] },
                                    { tabTitle: 'This is another tab', tabData: ['🐣', '>', '🍗', '=', '😀 + 😋'] },
                                    { tabTitle: '🌟', tabData: ['🌌'] },
                                    {
                                        tabTitle: 'lorem',
                                        tabData: [
                                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus nullam eget felis eget nunc lobortis mattis aliquam. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Consequat id porta nibh venenatis cras sed. Sapien faucibus et molestie ac feugiat. Eu nisl nunc mi ipsum. Diam vulputate ut pharetra sit amet aliquam id diam maecenas. Natoque penatibus et magnis dis parturient. Sit amet commodo nulla facilisi nullam vehicula. Egestas sed sed risus pretium quam. Porttitor massa id neque aliquam vestibulum morbi. Urna molestie at elementum eu facilisis sed odio. Mattis molestie a iaculis at erat pellentesque. Pellentesque elit ullamcorper dignissim cras. Convallis convallis tellus id interdum velit laoreet. Volutpat blandit aliquam etiam erat velit. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Gravida in fermentum et sollicitudin ac orci. Ut porttitor leo a diam sollicitudin tempor id eu. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Dignissim suspendisse in est ante. Consectetur adipiscing elit ut aliquam purus. Nunc sed velit dignissim sodales ut eu sem integer. Tincidunt augue interdum velit euismod in pellentesque massa placerat duis. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Vulputate odio ut enim blandit volutpat maecenas volutpat. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Donec adipiscing tristique risus nec. Urna et pharetra pharetra massa massa ultricies. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum a. Et malesuada fames ac turpis egestas integer eget aliquet. Risus in hendrerit gravida rutrum quisque non tellus orci ac. Dictum sit amet justo donec enim. Risus nullam eget felis eget. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Justo laoreet sit amet cursus. Curabitur gravida arcu ac tortor dignissim convallis aenean. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Lacus vel facilisis volutpat est velit. Maecenas accumsan lacus vel facilisis volutpat est velit egestas dui.',
                                        ],
                                    },
                                    { tabTitle: '🤪', tabData: ['🤪🤪🤪'] },
                                    { tabTitle: 'nested :D', tabData: [] },
                                ]}
                                loader={(data) => {
                                    if (data.tabTitle != 'nested :D') {
                                        return data.tabData.map((val, index) => {
                                            return <div key={index}>{val}</div>;
                                        });
                                    } else {
                                        return (
                                            <TabManager
                                                orientation="row"
                                                content={[{ tabTitle: '1' }, { tabTitle: '2' }]}
                                                loader={() => {
                                                    return (
                                                        <TabManager
                                                            orientation="column"
                                                            content={[{ tabTitle: '1' }, { tabTitle: '2' }]}
                                                            loader={() => {
                                                                return (
                                                                    <TabManager
                                                                        orientation="row"
                                                                        content={[{ tabTitle: '1' }, { tabTitle: '2' }]}
                                                                        loader={(data) => {
                                                                            return (
                                                                                <TabManager
                                                                                    orientation="column"
                                                                                    content={[
                                                                                        { tabTitle: '1' },
                                                                                        { tabTitle: '2' },
                                                                                    ]}
                                                                                    loader={() => {
                                                                                        return (
                                                                                            <TabManager
                                                                                                orientation="row"
                                                                                                content={[
                                                                                                    { tabTitle: '1' },
                                                                                                    { tabTitle: '2' },
                                                                                                ]}
                                                                                                loader={(data) => {
                                                                                                    return (
                                                                                                        <TabManager
                                                                                                            orientation="column"
                                                                                                            content={[
                                                                                                                {
                                                                                                                    tabTitle:
                                                                                                                        '1',
                                                                                                                },
                                                                                                                {
                                                                                                                    tabTitle:
                                                                                                                        '2',
                                                                                                                },
                                                                                                            ]}
                                                                                                            loader={() => {
                                                                                                                return (
                                                                                                                    <TabManager
                                                                                                                        orientation="row"
                                                                                                                        content={[
                                                                                                                            {
                                                                                                                                tabTitle:
                                                                                                                                    '1',
                                                                                                                            },
                                                                                                                            {
                                                                                                                                tabTitle:
                                                                                                                                    '2',
                                                                                                                            },
                                                                                                                        ]}
                                                                                                                        loader={(
                                                                                                                            data,
                                                                                                                        ) => {
                                                                                                                            return (
                                                                                                                                <TabManager
                                                                                                                                    orientation="column"
                                                                                                                                    content={[
                                                                                                                                        {
                                                                                                                                            tabTitle:
                                                                                                                                                '1',
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            tabTitle:
                                                                                                                                                '2',
                                                                                                                                        },
                                                                                                                                    ]}
                                                                                                                                    loader={() => {
                                                                                                                                        return (
                                                                                                                                            <TabManager
                                                                                                                                                orientation="row"
                                                                                                                                                content={[
                                                                                                                                                    {
                                                                                                                                                        tabTitle:
                                                                                                                                                            '1',
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        tabTitle:
                                                                                                                                                            '2',
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        tabTitle:
                                                                                                                                                            '3',
                                                                                                                                                        tabData:
                                                                                                                                                            {
                                                                                                                                                                content:
                                                                                                                                                                    'Hello',
                                                                                                                                                            },
                                                                                                                                                    },
                                                                                                                                                ]}
                                                                                                                                                loader={(
                                                                                                                                                    data,
                                                                                                                                                ) => {
                                                                                                                                                    if (
                                                                                                                                                        data.tabTitle !=
                                                                                                                                                        '3'
                                                                                                                                                    ) {
                                                                                                                                                        return (
                                                                                                                                                            <>
                                                                                                                                                                {
                                                                                                                                                                    data.tabTitle
                                                                                                                                                                }
                                                                                                                                                            </>
                                                                                                                                                        );
                                                                                                                                                    } else {
                                                                                                                                                        return (
                                                                                                                                                            <>
                                                                                                                                                                {
                                                                                                                                                                    data
                                                                                                                                                                        .tabData
                                                                                                                                                                        .content
                                                                                                                                                                }
                                                                                                                                                            </>
                                                                                                                                                        );
                                                                                                                                                    }
                                                                                                                                                }}
                                                                                                                                            />
                                                                                                                                        );
                                                                                                                                    }}
                                                                                                                                />
                                                                                                                            );
                                                                                                                        }}
                                                                                                                    />
                                                                                                                );
                                                                                                            }}
                                                                                                        />
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            );
                                                                        }}
                                                                    />
                                                                );
                                                            }}
                                                        />
                                                    );
                                                }}
                                            />
                                        );
                                    }
                                }}
                            />
                        );
                    } else if (data.tabTitle === 'Roles') {
                        data.tabData;
                        return <ViewRolesWindow roles={roles} setRoles={setRoles} />;
                    } else if (data.tabTitle === 'Users') {
                        data.tabData; // readonly ['user1', 'user2']
                        return <ViewUserWindow users={users} setUsers={setUsers} roles={roles} />;
                    }

                    return <></>;
                }}
            />
        </div>
    );
}

export default Roles;

function ViewUserWindow({
    users,
    setUsers,
    roles,
}: {
    users: Record<string, UserDTO>;
    setUsers: (users: Record<string, UserDTO>) => void;
    roles: Record<string, RoleDTO>;
}) {
    const content = Object.keys(users).map((username) => {
        return {
            tabTitle: users[username].name,
            tabData: { ...users[username] },
        };
    });

    const userContext = useUserContext();
    async function removeRole(role: RoleDTO, userId: string) {
        if (['Admin', 'Default'].indexOf(role.name) !== -1) {
            return;
        }

        const data = await userContext.fetcher(
            'DELETE /api/users/:userId/roles',
            {
                roleIds: [role.id],
            },
            { userId },
        );

        if (data) {
            const newUsers = { ...users, [userId]: data.user };
            setUsers(newUsers);
        }
    }

    async function addRole(role: RoleDTO, userId: string) {
        const data = await userContext.fetcher(
            'POST /api/users/:userId/roles',
            {
                roleIds: [role.id],
            },
            { userId },
        );

        if (data) {
            const newUsers = { ...users, [userId]: data.user };
            setUsers(newUsers);
        }
    }

    return (
        <div className="p-4 flex flex-col gap-3 overflow-scroll w-full">
            {content.map((data, index) => {
                return (
                    <UserRoleRow
                        key={index}
                        roles={Object.values(roles)}
                        user={data.tabData}
                        removeRole={removeRole}
                        addRole={addRole}
                    />
                );
            })}
        </div>
    );
}
