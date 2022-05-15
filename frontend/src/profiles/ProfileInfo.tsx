import { ReactElement } from 'react';
import { Profile, UserStatus } from './Interface';
import React, { useState } from 'react';
import IonIcon from '@reacticons/ionicons';

interface ProfileInformation {
    profile: Profile;
}

const ProfileInfo = (props: ProfileInformation): ReactElement => {
    const [status, setStatus] = React.useState<UserStatus>(UserStatus.Idle);
    const [editClick, setEdit] = React.useState(false);
    return (
        <body>
            <div id="title">
                <h1>Profile</h1>
            </div>
            <div id="mainbody">
                <nav>
                    <button>button 1</button>
                    <button>button2</button>
                </nav>
                <div id="profile">
                    <button id="editButton" onClick={() => setEdit(!editClick)}>
                        <span className="icon">
                            <IonIcon name="create-outline" />
                        </span>
                    </button>
                    <div
                        id="edit"
                        style={{ display: editClick ? 'block' : 'none' }}
                    >
                        <button onClick={() => setStatus(UserStatus.Available)}>
                            available
                        </button>
                        <button onClick={() => setStatus(UserStatus.Busy)}>
                            busy
                        </button>
                        <button onClick={() => setStatus(UserStatus.Idle)}>
                            idle
                        </button>
                    </div>
                    <div id="imageBox">
                        {' '}
                        <img src={props.profile.profilePictureUrl}></img>
                        <span
                            id="status"
                            style={{ backgroundColor: status }}
                        ></span>
                    </div>

                    <h2>{props.profile.name}</h2>
                </div>
                <div id="settings">
                    <button>button set</button>
                </div>
            </div>
        </body>
    );
};

export default ProfileInfo;
