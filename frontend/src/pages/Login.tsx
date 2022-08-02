import React from 'react';
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
import './Login.css';
import axios from 'axios';

function Login() {
    const onFailure = () => {
        console.log('Invalid account');
    };

    const onSuccess = (googleData: GoogleLoginResponse) => {
        axios
            .post('http://localhost:5000/api/users/login', {
                credential: googleData.tokenId,
            })
            .then((response) => {
                console.log(response.data);
            });
    };

    return (
        <div className="loginPage">
            <header className="loginPageHeader">
                <h1>Welcome to AEYB</h1>
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
            </header>
        </div>
    );
}

export default Login;
