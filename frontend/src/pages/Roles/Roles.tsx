import React from 'react';
import './Roles.css';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

function Roles() {
    //Dummy test roles
    const allRoles = ['Admin', 'User', 'Guest', 'TestRole1', 'TestRole2', 'TestRole3', 'TestRole4', 'TestRole5'];

    const allUsers = ['Hillary', 'Grant', 'Violet', 'Lauren', 'Luke', 'Sarah', 'Helen', 'Josh', 'Tyler'];
    enum Permissions {
        VIEW_ROLES = 'VIEW_ROLES',
        DELETE_ROLES = 'DELETE_ROLES',
        UPDATE_ROLES = 'UPDATE_ROLES',
        ADD_ROLES = 'ADD_ROLES',
        GIVE_ROLE = 'GIVE_ROLE',
        REMOVE_ROLE = 'REMOVE_ROLE',

        VIEW_USERS = 'VIEW_USERS',
        UPDATE_USERS = 'UPDATE_USERS',

        VIEW_EVENTS = 'VIEW_EVENTS',
        UPDATE_EVENTS = 'UPDATE_EVENTS',
        DELETE_EVENTS = 'DELETE_EVENTS',
        ADD_EVENTS = 'ADD_EVENTS',
    }

    const [roles, setRoles] = React.useState(allRoles);
    const [users, setUsers] = React.useState(allUsers);

    function handleRoleSearch(search) {
        if (search === '') {
            setRoles(allRoles);
        } else {
            setRoles(allRoles.filter((role) => role.toLowerCase().includes(search.toLowerCase())));
        }
    }

    function handleUserSearch(search) {
        if (search === '') {
            setUsers(allUsers);
        } else {
            setUsers(allUsers.filter((user) => user.toLowerCase().includes(search.toLowerCase())));
        }
    }

    return (
        <div className="w-full bg-[#262b6c] bg-white h-screen pt-3 ">
            <div className="bg-[#bdc3e3] w-full lg:w-[80%] ml-auto p-4 h-[90%] rounded-md grid grid-cols-3 gap-12 overflow-hidden">
                <div className="flex flex-col">
                    <div className=" bg-[#5563ae] p-1 rounded-md h-[300px] border-2 border-[#262b6c]">
                        <h1 className="text-3xl text-white">Roles</h1>
                        <TextField
                            inputProps={{
                                style: {
                                    padding: 5,
                                },
                            }}
                            id="role-search"
                            className="text bg-white w-full rounded-sm border-none "
                            placeholder="Search for a Role"
                            onChange={(prop: any) => {
                                handleRoleSearch(prop.target.value);
                            }}
                        />

                        <div className="overflow-scroll h-3/4">
                            {roles.map((role) => {
                                return (
                                    <div className="p-2 text-[#262b6c] bg-[#bdc3e3] mt-1 hover:text-[#bdc3e3] hover:bg-[#262b6c]">
                                        <p>{role}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-[#5563ae] p-2 rounded-md h-[300px] mt-4  border-2 border-[#262b6c]">
                        <h1 className="text-3xl text-white">Users</h1>
                        <TextField
                            inputProps={{
                                style: {
                                    padding: 5,
                                },
                            }}
                            id="user-search"
                            className="text bg-white w-full rounded-sm border-none "
                            placeholder="Search for a User"
                            onChange={(prop: any) => {
                                handleUserSearch(prop.target.value);
                            }}
                        />
                        <div className="overflow-scroll h-3/4">
                            {users.map((user) => {
                                return (
                                    <div className="p-2 text-[#262b6c] bg-[#bdc3e3] mt-1 hover:text-[#bdc3e3] hover:bg-[#262b6c]">
                                        <p>{user}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="bg-[#262b6c] col-span-2 p-2 rounded-md">
                    <h1 className="text-3xl text-white">Permissions</h1>
                    <div className="grid grid-cols-2 gap-2">
                        {(Object.keys(Permissions) as Array<keyof typeof Permissions>).map((permission) => {
                            return (
                                <div className="p-2 text-[#262b6c] bg-[#bdc3e3] mt-1 flex justify-between align-bottom">
                                    <p>
                                        {(
                                            permission.charAt(0).toUpperCase() + permission.slice(1).toLowerCase()
                                        ).replace('_', ' ')}
                                    </p>
                                    <Switch color="secondary" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Roles;
