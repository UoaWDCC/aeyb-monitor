import React from 'react';
import './Roles.css';
import Switch from '@mui/material/Switch';

import UserList from './components/UserList';
import RoleList from './components/RoleList';

function Roles() {
    //Dummy test users
    const allUsers = ['Hillary', 'Grant', 'Violet', 'Lauren', 'Luke', 'Sarah', 'Helen', 'Josh', 'Tyler'];
    const allRoles = ['Admin', 'User', 'Guest', 'TestRole1', 'TestRole2'];

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

    return (
        <div className="w-full bg-[#262b6c] bg-white h-screen pt-3 ">
            <div className="bg-[#bdc3e3] w-full lg:w-[80%] ml-auto p-4 h-[90%] rounded-md grid grid-cols-3 gap-12 overflow-hidden">
                <div className="flex flex-col">
                    <div className="h-[300px]">
                        <RoleList allRoles={allRoles} />
                    </div>

                    <div className="h-[300px]">
                        <UserList allUsers={allUsers} />
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
