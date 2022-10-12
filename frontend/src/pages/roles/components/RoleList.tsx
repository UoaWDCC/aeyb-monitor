import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function RoleList(props) {
    const { allRoles, setActiveRole } = props;

    const [roles, setRoles] = React.useState(allRoles);

    //Open new role input box
    const [openAddRole, setOpenAddRole] = React.useState(false);

    return (
        <div className=" bg-[#D5D9ED] p-2 rounded-md h-full overflow-hidden space-y-1">
            <div className="flex flex-row items-center justify-between pr-2 text-[#262B6C] font-bold">
                <h1 className="text-2xl">Roles</h1>

                {/*Icon to open/close add role box  */}
                <FontAwesomeIcon
                    icon={openAddRole ? faXmark : faPlus}
                    size="lg"
                    color="[#262B6C]"
                    onClick={() => setOpenAddRole(!openAddRole)}
                />
            </div>

            {/*Add role box */}
            <div className={' flex flex-row items-center justify-between bg-white rounded-sm pr-1 ' + (openAddRole ? 'flex' : 'hidden')}>
                <input
                    className="text bg-white w-full rounded-sm border-none outline-0 p-1"
                    type="text"
                    placeholder="Add a role"
                    id="role-input"
                />

                {/* Confirmation icon to add roles */}
                <FontAwesomeIcon
                    icon={faCheck}
                    size="lg"
                    className="text-[#262b6c]"
                    onClick={() => {
                        if ((document.getElementById('role-input') as HTMLInputElement).value !== '') {
                            setRoles([...roles, (document.getElementById('role-input') as HTMLInputElement).value]);
                            setOpenAddRole(false);
                            (document.getElementById('role-input') as HTMLInputElement).value = '';
                        }

                        setOpenAddRole(false);
                    }}
                />
            </div>

            <div className={`overflow-y-scroll ${openAddRole ? "h-3/4" : "h-[85%]"}`}>
                {/* Displays each role */}
                {roles.map((role) => {
                    return (
                        <div
                            className="text-lg p-2 text-[#262b6c] bg-[#bdc3e3] mt-1 hover:text-[#bdc3e3] hover:bg-[#262b6c]"
                            key={role}
                            onClick={() => {
                                setActiveRole(role);
                            }}
                        >
                            <p>{role}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
