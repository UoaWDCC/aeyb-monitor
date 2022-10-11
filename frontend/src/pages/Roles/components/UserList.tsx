import React from 'react';

export default function UserList(props) {
    const { allUsers, setActiveRole } = props;

    function handleUserSearch(search) {
        if (search === '') {
            setUsers(allUsers);
        } else {
            setUsers(allUsers.filter((user) => user.toLowerCase().includes(search.toLowerCase())));
        }
    }

    //Users to display in the list
    const [users, setUsers] = React.useState(allUsers);

    return (
        <div className="bg-[#D5D9ED] p-2 rounded-md h-full mt-4 space-y-1">
            <h1 className="text-2xl text-[#262B6C] font-bold">Users</h1>

            {/* Search box */}
            <input
                className="text bg-white w-full rounded-sm border-none outline-0 p-1"
                type="text"
                placeholder="Search for a User"
                onChange={(prop: any) => {
                    handleUserSearch(prop.target.value);
                }}
            />

            <div className="overflow-scroll h-3/4">
                {/* Displays each user that has been searched for */}
                {users.map((user) => {
                    return (
                        <div
                            className="text-lg p-2 text-[#262b6c] bg-[#bdc3e3] mt-1 hover:text-[#bdc3e3] hover:bg-[#262b6c]"
                            key={user}
                            onClick={() => {
                                setActiveRole(user);
                            }}
                        >
                            <p>{user}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
