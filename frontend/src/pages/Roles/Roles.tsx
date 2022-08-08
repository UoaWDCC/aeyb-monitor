import React from 'react';
import './Roles.css';

import UserList from './components/UserList';
import RoleList from './components/RoleList';
import PermissionList from './components/PermissionsList';

function Roles() {
    //Dummy test users
    const allUsers = ['Hillary', 'Grant', 'Violet', 'Lauren', 'Luke', 'Sarah', 'Helen', 'Josh', 'Tyler'];
    const allRoles = ['Admin', 'User', 'Guest', 'TestRole1', 'TestRole2'];

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
                    <PermissionList />
                </div>
            </div>
        </div>
    );
}

export default Roles;
