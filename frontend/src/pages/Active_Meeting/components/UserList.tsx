import React from 'react';

export default function UserList(props) {
    const { allUsers, setActiveUser } = props;

    const [showUsers, setShowUsers] = React.useState(false);

    function handleUserSearch(search) {
        if (search === '') {
            setUsers(allUsers);
            setShowUsers(false);
            console.log("blank");

        } else {
            setShowUsers(true);
            setUsers(allUsers.filter((user) => user.toLowerCase().includes(search.toLowerCase())));
        }
    }

    //Users to display in the list
    const [users, setUsers] = React.useState(allUsers);


    return (
        <div className="p-2 rounded-md h-full relative">
            <h1 className="text-3xl text-white">Users</h1>


            {/* Search box */}
            <input

                className="text bg-gray-200 w-full rounded-md border-none outline-0 p-2 m-0 mt-2"
                id="user-search"
                type="text"
                placeholder="Search for a User"
                onChange={(prop: any) => {
                    handleUserSearch(prop.target.value);
                }}
            />

            <div className={"absolute top-5/6 overflow-scroll w-full pr-4 " + (showUsers ? 'visible' : 'invisible')}>
                {/* Displays each user that has been searched for */}
                {users.map((user) => {
                    return (
                        <div
                            className="text-lg p-2 w-full rounded-md text-[#262b6c] bg-[#bdc3e3] mt-1 hover:text-[#bdc3e3] hover:bg-[#262b6c]"
                            key={user}
                            onClick={() => {
                                setActiveUser(user);
                                setShowUsers(false);
                                (document.getElementById("user-search") as HTMLInputElement).value = "";
                            }}
                        >
                            <p>{user}</p>
                        </div>
                    );
                })}
            </div>
        </div >
    );
}
