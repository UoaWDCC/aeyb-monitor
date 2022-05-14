import { ReactElement } from 'react';
import { Profile, UserStatus } from './Interface';
import React, { useState } from 'react';

interface ProfileInformation {
    profile: Profile;
}

const ProfileInfo = (props: ProfileInformation): ReactElement => {
    const [status, setStatus] = React.useState<UserStatus>(UserStatus.Idle);
    return (
        <body>
            <div id="title">
                <h1>Profile</h1>
            </div>
            <div id="profile">
                <img src={props.profile.profilePictureUrl}></img>
                <span id="status" style={{ backgroundColor: status }}></span>
                <button onClick={() => setStatus(UserStatus.Available)}>
                    available
                </button>
                <button onClick={() => setStatus(UserStatus.Busy)}>busy</button>
                <button onClick={() => setStatus(UserStatus.Idle)}>idle</button>

                <h2>{props.profile.name}</h2>
            </div>
        </body>
    );
};

export default ProfileInfo;
