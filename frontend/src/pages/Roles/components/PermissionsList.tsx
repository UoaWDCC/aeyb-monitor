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

export default function PermissionList() {
    const [allChecked, setAllChecked] = useState(false);
    const [checked, setChecked] = useState(new Array(Object.keys(Permissions).length).fill(false));
    console.log(checked);

    return (
        <>
            <h1 className="text-3xl text-white">Permissions</h1>
            <Switch
                onChange={() => {
                    setChecked(checked.map((value, index) => !allChecked));
                    setAllChecked(!allChecked);
                }}
            />
            <div className="grid grid-cols-2 gap-2">
                {(Object.keys(Permissions) as Array<keyof typeof Permissions>).map((permission, key) => {
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
                })}
            </div>
        </>
    );
}
