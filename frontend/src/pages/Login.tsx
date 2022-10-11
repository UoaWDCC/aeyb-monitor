import React, { useEffect } from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logos/AEYB-meetings-logo.png';
import { useUserContext } from '../context/UserContext';
import useLocalStorage from '../hook/UseLocastrorage';

function Login() {
    const userContext = useUserContext();
    const navigate = useNavigate();
    const [storedToken,] = useLocalStorage('userToken', null);

    useEffect(() => {
        if (!userContext.user && storedToken) {
            userContext.relogin().then(() => {
                navigate('/', { replace: true });
            })
        }
    }, [storedToken, userContext.user, userContext.relogin, userContext, navigate])

    const onFailure = (error: Error) => {
        console.log(error);
    };


    const handleLogin = (googleData: GoogleLoginResponse) => {
        userContext.onLogin(googleData).then(() => {
            navigate('/', { replace: true });
        })
    };

    return (
        <div className="loginPage">
            <header className="loginPageHeader">
                <img src={Logo} alt='AEYB meetings logo' className='meetingsLogo'></img>
                <GoogleLogin
                    className="loginBox"
                    clientId="931818604859-0jd0r03np411c0v0pp89daplg1eansep.apps.googleusercontent.com"
                    onSuccess={(res) => handleLogin(res as GoogleLoginResponse)}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                >
                    Sign in with Google
                </GoogleLogin>
            </header>
        </div>
    );
}

export default Login;
