import React from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/edited/AEYB_A0_CircleBlackWardline.png';

function Login() {
    const onFailure = () => {
        console.log('Invalid account');
    };

    const navigate = useNavigate();

    const onSuccess = (googleData: GoogleLoginResponse) => {
        axios
            .post('http://localhost:5000/api/users/login', {
                credential: googleData.tokenId,
            })
            .then((response) => {
                console.log(response.data);
            });

        navigate('homepage', { replace: true });
    };

    return (
        <div className="loginPage">
            <div className="loginPageHeader">
                <img src={Logo} alt='AEYB meetings logo' className='meetingsLogo'></img>
                <p className='loginTitle'>M E E T I N G S</p>
                <GoogleLogin
                    className="loginBox"
                    clientId="931818604859-0jd0r03np411c0v0pp89daplg1eansep.apps.googleusercontent.com"
                    onSuccess={(res) => onSuccess(res as GoogleLoginResponse)}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                >
                    Sign in with Google
                </GoogleLogin>
            </div>
        </div>
    );
}

export default Login;
