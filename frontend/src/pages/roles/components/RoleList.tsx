import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import RoleDTO from '@shared/dtos/RoleDTO';
import { useUserContext } from '../../../contexts/UserContext';

interface Props {
    roles: RoleDTO[],
    handleChangeActiveRole(roleId: string): void
    handleAddRole(roleName: string): void;
}

export default function RoleList(props: Props) {
    //Open new role input box
    const [openAddRole, setOpenAddRole] = useState(false);
    const userContext = useUserContext();

    const handleAddRole = async () => {
        if ((document.getElementById('role-input') as HTMLInputElement).value !== '') {
            props.handleAddRole((document.getElementById('role-input') as HTMLInputElement).value);
            setOpenAddRole(false);
            (document.getElementById('role-input') as HTMLInputElement).value = '';
        }

        setOpenAddRole(false);
    }

    return (
        <div className=" bg-[#D5D9ED] p-2 rounded-md h-full overflow-hidden space-y-1">
            <div className="flex flex-row items-center justify-between pr-2 text-[#262B6C] font-bold">
                <h1 className="text-2xl">Roles</h1>

                {/*Icon to open/close add role box  */}
                {userContext.hasPermission('MANAGE_ROLES') && <FontAwesomeIcon
                    icon={openAddRole ? faXmark : faPlus}
                    size="lg"
                    color="[#262B6C]"
                    onClick={() => setOpenAddRole(!openAddRole)}
                />}
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
                    onClick={handleAddRole}
                />
            </div>

            <div className={`overflow-y-scroll ${openAddRole ? "h-3/4" : "h-[85%]"}`}>
                {/* Displays each role */}
                {props.roles.map((role) => {
                    return (
                        <div
                            className="text-lg p-2 text-[#262b6c] bg-[#bdc3e3] mt-1 hover:text-[#bdc3e3] hover:bg-[#262b6c]"
                            key={role.id}
                            onClick={() => props.handleChangeActiveRole(role.id)}
                        >
                            <p>{role.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
