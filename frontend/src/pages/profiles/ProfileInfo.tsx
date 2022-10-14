import './UserProfile.css';
import NotifBar from './components/NotificationBar';
import SettingsBar from './components/Settings';
import { useUserContext } from '../../contexts/UserContext';

function ProfileInfo() {

    const userContext = useUserContext();
    const user = userContext.user;
    const roleStyle = {
        border: `2px solid ${user.roles[0].color}`,
        color: `${user.roles[0].color}`
    }

    return (
        <div>
            <div className='overflow-scroll flex flex-col items-center w-screem h-screen'>
                {/*Basic Information Div
                    - one role shown which is their main role 
                    - main role should always be the first role given to the user 
                      OR group the roles into categories 
                 */}
                <div className='w-full space-x-7 flex flex-row items-center justify-center mt-9'>
                    <div>
                        <img className='rounded-full w-full' alt='profile_picture' src={user.profileUrl} />
                    </div>
                    <div className='text-3xl md:text-4xl'>
                        <p className='font-bold mb-2 text-[#262B6C]'>{user.name}</p>
                        <span className='rounded-md px-4 text-3xl' style={roleStyle}>{user.roles[0].name}</span>
                    </div>
                </div>

                {/*Settings Div 
                    - output will depend on main role
                */}
                <SettingsBar />
            </div>
            <NotifBar />
        </div >
    );
};

export default ProfileInfo;
