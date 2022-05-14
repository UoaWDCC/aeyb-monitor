import { ReactElement } from 'react';
import { Profile, UserStatus, Roles } from './Interface';

interface ProfileInformation {
    profile: Profile;
}

const getBGColour = (status: UserStatus): string => {
    switch (status) {
        case UserStatus.Available: {
            return 'green';
        }
        case UserStatus.Idle: {
            return 'yellow';
        }
        case UserStatus.Busy: {
            return 'red';
        }
        default: {
            return 'grey';
        }
    }
};

const ProfileInfo = (props: ProfileInformation): ReactElement => {
    return (
        <body>
            <div id="title">
                <h1>Profile</h1>
            </div>
            <div id="profile">
                <img src={props.profile.profilePictureUrl}></img>
                <span
                    id="status"
                    style={{ backgroundColor: props.profile.status }}
                ></span>

                <h2>{props.profile.name}</h2>
            </div>
        </body>
    );
};

export default ProfileInfo;
