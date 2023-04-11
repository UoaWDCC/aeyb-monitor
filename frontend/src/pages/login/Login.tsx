import { useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../images/AEYB_A0_CircleBlackWardlineSmaller.png';
import { useUserContext } from '../../contexts/UserContext';
import useLocalStorage from '../../hooks/UseLocastrorage';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';


function Login() {
    const userContext = useUserContext();
    const navigate = useNavigate();
    const [storedToken,] = useLocalStorage('userToken', null);

    useEffect(() => {
        if (!userContext.user && storedToken) {
            userContext.relogin()
        }
    }, [storedToken, userContext.user, userContext.relogin, userContext, navigate])

    const onError = () => {
        console.log("GoogleLogin Error");
    };


    const handleLogin = (googleData: CredentialResponse) => {
        userContext.onLogin(googleData).then(() => {
            navigate('/', { replace: true });
        })
    };

    return (
        <div className="loginPage">
            <div className="loginPageHeader">
                <img src={Logo} alt='AEYB meetings logo' className='meetingsLogo'></img>
                <p className='loginTitle'>M E E T I N G S</p>
                <GoogleLogin
                    onSuccess={res => handleLogin(res)}
                    onError={onError}
                />
            </div>
        </div>
    );
}

export default Login;
