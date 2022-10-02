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
        //TODO add navbar component

        // Page container
        <div className=" md:pl-[90px] bg-[#bdc3e3] overflow-scroll h-screen">
            {/* Page heading */}
            <div className="px-4 pt-2">
                <h1 className="text-5xl text-[#262b6c]">Permissions</h1>
            </div>
            <div className=" w-full p-4  rounded-md md:grid md:grid-cols-3 md:gap-12 overflow-scroll">
                {/* Left column of roles and users */}
                <div className="flex flex-col">
                    <div className="h-[300px]">
                        <RoleList allRoles={allRoles} setActiveRole={setActiveRole} />
                    </div>

                    <div className="h-[300px]">
                        <UserList allUsers={allUsers} setActiveRole={setActiveRole} />
                    </div>
                    {/* Return button */}
                    <div className="mt-10">
                        <button className="text-3xl text-[#ffffff] bg-[#262b6c] p-4 border-2 rounded-md" onClick={returntoProfile} >Return to Profile</button>
                    </div>
                </div>

                {/* Right column of permissions */}
                <div className="bg-[#262b6c] col-span-2 p-2 rounded-md mt-10 md:mt-0 h-fit">
                    {activeRole !== '' ? (
                        <PermissionList activeRole={activeRole} />
                    ) : (
                        <div className="text-center text-white text-3xl">Select a role to view permissions</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Roles;
