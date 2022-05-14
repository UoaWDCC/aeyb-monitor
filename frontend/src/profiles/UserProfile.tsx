import './Profile.css';
import ProfileInfo from './ProfileInfo';
import { Profile, UserStatus, Roles } from './Interface';

let profileList = {
    profilePictureUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVsnxFu-un8fqA5jQRLW9XCTF8L8dYg1WO_w&usqp=CAU',
    name: 'Nicole',

    status: UserStatus.Available,
    roles: [Roles.TeamLeader],
};

function UserProfile() {
    return <ProfileInfo profile={profileList} />;
}

export default UserProfile;
