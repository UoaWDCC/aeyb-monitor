import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function RoleList(props) {
    const { allRoles } = props;

    const [roles, setRoles] = React.useState(allRoles);

    const [openAddRole, setOpenAddRole] = React.useState(false);

    return (
        <div className=" bg-[#5563ae] p-1 rounded-md h-full border-2 border-[#262b6c] overflow-hidden">
            <div className="flex justify-between pr-2">
                <h1 className="text-3xl text-white">Roles</h1>
                <FontAwesomeIcon
                    icon={openAddRole ? faXmark : faPlus}
                    size="2x"
                    color="white"
                    onClick={() => setOpenAddRole(!openAddRole)}
                />
            </div>
            <div className={' justify-between bg-white rounded-sm pr-1 ' + (openAddRole ? 'flex' : 'hidden')}>
                <input
                    className="text bg-white w-full rounded-sm border-none outline-0 p-1"
                    type="text"
                    placeholder="Add a role"
                    id="role-input"
                />
                <FontAwesomeIcon
                    icon={faCheck}
                    size="2x"
                    className="text-[#262b6c]"
                    onClick={() => {
                        if ((document.getElementById('role-input') as HTMLInputElement).value !== '') {
                            setRoles([...roles, (document.getElementById('role-input') as HTMLInputElement).value]);
                            setOpenAddRole(false);
                            (document.getElementById('role-input') as HTMLInputElement).value = '';
                        }

                        console.log(roles);
                        setOpenAddRole(false);
                    }}
                />
            </div>

            <div className="overflow-scroll h-5/6">
                {roles.map((role) => {
                    return (
                        <div className="text-lg p-2 text-[#262b6c] bg-[#bdc3e3] mt-1 hover:text-[#bdc3e3] hover:bg-[#262b6c]">
                            <p>{role}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
