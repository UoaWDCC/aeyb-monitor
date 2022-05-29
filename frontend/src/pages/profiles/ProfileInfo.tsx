import { ReactElement } from 'react';
import { Profile, UserStatus, Roles } from './Interface';
import React, { useState } from 'react';
import IonIcon from '@reacticons/ionicons';

interface ProfileInformation {
    profile: Profile;
}

const ProfileInfo = (props: ProfileInformation): ReactElement => {
    // updates the status during onclick events
    const [status, setStatus] = React.useState<UserStatus>(UserStatus.Idle);
    // makes the nsub navigation for setStatus visibile during an on click event
    const [editClick, setEdit] = React.useState(false);

    return (
        <div>
            <div id="title">
                <h1>Profile</h1>
            </div>
            <div id="mainbody">
                <nav>
                    <div id="navi">
                        <button>
                            <span className="icon">
                                <IonIcon name="home" />
                                <h4>HOME</h4>
                            </span>
                        </button>
                        <button>
                            <span className="icon">
                                <IonIcon name="calendar-clear" />
                                <h4>CALENDER</h4>
                            </span>
                        </button>
                        <button>
                            <span className="icon">
                                <IonIcon name="heart" />
                                <h4>STATS</h4>
                            </span>
                        </button>
                    </div>
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
                    <div id="roles">
                        {props.profile.roles.map((role) => {
                            return <span>{role}</span>;
                        })}
                    </div>
                </div>
                <div id="settings">
                    <button>Role Permissions</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
