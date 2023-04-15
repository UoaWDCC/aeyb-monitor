import { useEffect, useState } from 'react';
import UserDTO from '@shared/dtos/UserDTO';

interface Props {
    users: Record<string, UserDTO>;
}

export default function UserList(props: Props) {
    const [visibileUsers, setVisibleUsers] = useState<string[]>(Object.keys(props.users));

    useEffect(() => {
        setVisibleUsers(Object.keys(props.users));
    }, [props.users]);

    function handleUserSearch(search: string) {
        const loweredSearch = search.toLowerCase();
        if (search === '') {
            setVisibleUsers(Object.keys(props.users));
        } else {
            setVisibleUsers(Object.values(props.users)
                .filter((user) => user.name.toLowerCase().includes(loweredSearch))
                .map((user) => user.id));
        }
    }

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
                {visibileUsers.map((userId) => {
                    const user = props.users[userId];
                    return (
                        <div
                            className="text-lg p-2 text-[#262b6c] bg-[#bdc3e3] mt-1 hover:text-[#bdc3e3] hover:bg-[#262b6c]"
                            key={userId}
                            onClick={() => {
                                console.log(`Clicked ${userId}`)
                            }}
                        >
                            <p>{user.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
