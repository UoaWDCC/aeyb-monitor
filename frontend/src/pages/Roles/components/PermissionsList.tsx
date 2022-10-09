import React, { useState } from 'react';
import Switch from '@mui/material/Switch';

//All permissiion copied over from backend - will need to fetch these somehow
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

//Above enum as an array
const PermissionsArray = Object.keys(Permissions) as Array<keyof typeof Permissions>;

//groups each permission by type
const PermissionsLists = {
    roles: [0, 1, 2, 3, 4, 5],
    users: [6, 7],
    events: [8, 9, 10, 11],
};

export default function PermissionList(props) {
    const { activeRole } = props;
    //toggle all / section states
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

    //Array containing states of each permission
    const [checked, setChecked] = useState(new Array(Object.keys(Permissions).length).fill(false));

    //Toggles all permissions in a section
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
            <div className="flex items-center flex-col ">
                <h1 className="text-4xl text-white ">{activeRole}</h1>

                {/* Select all */}
                <div className="flex sm:justify-end pt-2">
                    <h2 className="text-2xl text-white">Select all</h2>
                    <Switch
                        onChange={() => {
                            setChecked(checked.map((item) => !allChecked));
                            setAllRolesChecked(!allChecked);
                            setAllUsersChecked(!allChecked);
                            setAllEventsChecked(!allChecked);

                            setAllChecked(!allChecked);
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col overflow-scroll mt-2">
                {/* Map through each section permission section */}
                {(Object.entries(PermissionsLists) as [keyof typeof PermissionsLists, Array<number>][]).map(
                    ([key, value]) => {
                        return (
                            <div className="md:grid grid-cols-2 gap-2 mb-3" key={key}>
                                {/* Section header */}
                                <div className="col-span-2 flex">
                                    {/* Section nam */}
                                    <h1 className="text-3xl text-white ">
                                        {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                                    </h1>
                                    {/* Toggle section switch */}
                                    <Switch
                                        onChange={() => {
                                            toggleSection(key, value);
                                        }}
                                        checked={
                                            sectionStates[
                                            `all${key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}Checked`
                                            ]
                                        }
                                    />
                                </div>
                                {/* Map through each permission in the section */}
                                {value.map((index) => {
                                    return (
                                        <div
                                            className="p-2 text-[#262b6c] text-2xl bg-[#bdc3e3] mt-1 flex justify-between align-bottom"
                                            key={index}
                                        >
                                            {/* Permission name */}
                                            <p>
                                                {(
                                                    PermissionsArray[index].charAt(0).toUpperCase() +
                                                    PermissionsArray[index].slice(1).toLowerCase()
                                                ).replace('_', ' ')}
                                            </p>

                                            {/* Toggle individual permission switch */}
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
                            </div>
                        );
                    },
                )}
            </div>
        </>
    );
}
