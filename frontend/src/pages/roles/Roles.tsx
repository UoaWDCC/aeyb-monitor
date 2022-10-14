import IonIcon from '@reacticons/ionicons';
import React from 'react';
import './Roles.css';

import UserList from './components/UserList';
import RoleList from './components/RoleList';
import PermissionList from './components/PermissionsList';
import { useNavigate } from 'react-router-dom';

function Roles() {
    //Dummy test users
    const allUsers = ['Hillary', 'Grant', 'Violet', 'Lauren', 'Luke', 'Sarah', 'Helen', 'Josh', 'Tyler'];
    const allRoles = ['Admin', 'User', 'Guest', 'TestRole1', 'TestRole2'];
    const [activeRole, setActiveRole] = React.useState('');

    // Navigation back to profile page
    const navigate = useNavigate();
    const returntoProfile = () => {
        navigate("/profilepage/")
    }

    return (
        // Page container
        <div className=" md:pl-[90px] bg-white overflow-scroll h-screen md:ml-4xw">
            <div className="w-full p-4 rounded-md md:grid md:grid-cols-3 md:gap-12 overflow-scroll h-full mt-2">
                {/* Left column of roles and users */}
                <div className="flex flex-col h-screen">
                    <div className="h-[45%]">
                        <RoleList allRoles={allRoles} setActiveRole={setActiveRole} />
                    </div>

                    <div className="h-[45%]">
                        <UserList allUsers={allUsers} setActiveRole={setActiveRole} />
                    </div>
                </div>

                {/* Right column of permissions */}
                <div className="col-span-2 p-2 rounded-md mt-10 md:mt-0 h-fit">
                    {activeRole !== '' ? (
                        <PermissionList activeRole={activeRole} />
                    ) : (
                        <div className="text-center text-[#262b6c] text-3xl">Select a role to view permissions</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Roles;
