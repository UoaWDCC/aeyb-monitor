import React from 'react';
import './Roles.css';

function Roles() {
    return (
        <div className="w-full bg-[#262b6c] bg-white h-screen pt-3 ">
            <div className="bg-[#bdc3e3] max-w-[1200px] ml-auto p-4 h-[80%] rounded-md flex grid grid-cols-3 gap-12">
                <div className="grid grid-rows-2 gap-6">
                    <div className=" bg-[#5563ae] p-2 rounded-md">
                        <h1>Roles</h1>
                    </div>
                    <div className="bg-[#5563ae] p-2 rounded-md">
                        <h1>Users</h1>
                    </div>
                </div>
                <div className="bg-[#262b6c] col-span-2 p-2 rounded-md">
                    <h1>Permissions</h1>
                </div>
            </div>
        </div>
    );
}

export default Roles;
