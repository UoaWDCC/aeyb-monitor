import React, { useRef, useState } from 'react';
import Switch from '@mui/material/Switch';

enum Permissions {
    VIEW_ROLES = 'VIEW_ROLES',
    DELETE_ROLES = 'DELETE_ROLES',
    UPDATE_ROLES = 'UPDATE_ROLES',
    ADD_ROLES = 'ADD_ROLES',
    GIVE_ROLE = 'GIVE_ROLE',
    REMOVE_ROLE = 'REMOVE_ROLE',

    VIEW_USERS = 'VIEW_USERS',
    UPDATE_USERS = 'UPDATE_USERS',

    VIEW_EVENTS = 'VIEW_EVENTS',
    UPDATE_EVENTS = 'UPDATE_EVENTS',
    DELETE_EVENTS = 'DELETE_EVENTS',
    ADD_EVENTS = 'ADD_EVENTS',
}

const PermissionsArray = Object.keys(Permissions) as Array<keyof typeof Permissions>;

const PermissionsLists = {
    roles: [0, 1, 2, 3, 4, 5],
    users: [6, 7],
    events: [8, 9, 10, 11],
};

export default function PermissionList() {
    const [allChecked, setAllChecked] = useState(false);
    const [allRolesChecked, setAllRolesChecked] = useState(false);
    const [allUsersChecked, setAllUsersChecked] = useState(false);
    const [allEventsChecked, setAllEventsChecked] = useState(false);

    const sectionStates = {
        allRolesChecked,
        setAllRolesChecked,
        allUsersChecked,
        setAllUsersChecked,
        allEventsChecked,
        setAllEventsChecked,
    };

    const [checked, setChecked] = useState(new Array(Object.keys(Permissions).length).fill(false));
    console.log(checked);

    function toggleSection(key, value) {
        let keyName = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();

        setChecked(
            checked.map((item, index) => {
                if (value.includes(index)) {
                    return !sectionStates[`all${keyName}Checked`];
                }
                return item;
            }),
        );
        sectionStates[`setAll${keyName}Checked`](!sectionStates[`all${keyName}Checked`]);
    }
    return (
        <>
            <h1 className="text-3xl text-white">Permissions</h1>
            <div className="flex justify-end">
                <h2 className="text-2xl text-white">Select all</h2>
                <Switch
                    onChange={() => {
                        setChecked(checked.map((item) => !allChecked));

                        setAllChecked(!allChecked);
                    }}
                />
            </div>

            <div className="flex flex-col overflow-scroll">
                {(Object.entries(PermissionsLists) as [keyof typeof PermissionsLists, Array<number>][]).map(
                    ([key, value]) => {
                        return (
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-2 flex">
                                    <h1 className="text-3xl text-white ">
                                        {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                                    </h1>
                                    <Switch
                                        onChange={() => {
                                            toggleSection(key, value);
                                        }}
                                    />
                                </div>
                                {value.map((index) => {
                                    return (
                                        <div className="p-2 text-[#262b6c] text-2xl bg-[#bdc3e3] mt-1 flex justify-between align-bottom">
                                            <p>
                                                {(
                                                    PermissionsArray[index].charAt(0).toUpperCase() +
                                                    PermissionsArray[index].slice(1).toLowerCase()
                                                ).replace('_', ' ')}
                                            </p>
                                            <Switch
                                                color="secondary"
                                                checked={checked[index]}
                                                onClick={() =>
                                                    setChecked((oldArray) => {
                                                        const newArray = [...oldArray];
                                                        newArray[index] = !newArray[index];
                                                        return newArray;
                                                    })
                                                }
                                            />
                                        </div>
                                    );
                                })}
                                ;
                            </div>
                        );
                    },
                )}

                {/* {(Object.keys(Permissions) as Array<keyof typeof Permissions>).map((permission, key) => {
                    return (
                        <div className="p-2 text-[#262b6c] text-2xl bg-[#bdc3e3] mt-1 flex justify-between align-bottom">
                            <p>
                                {(permission.charAt(0).toUpperCase() + permission.slice(1).toLowerCase()).replace(
                                    '_',
                                    ' ',
                                )}
                            </p>
                            <Switch
                                color="secondary"
                                checked={checked[key]}
                                onClick={() =>
                                    setChecked((oldArray) => {
                                        const newArray = [...oldArray];
                                        newArray[key] = !newArray[key];
                                        return newArray;
                                    })
                                }
                            />
                        </div>
                    );
                })} */}
            </div>
        </>
    );
}
