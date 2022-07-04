import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import './Login.css';

function Login() {
    const onFailure = (error) => {
        alert(error);
    };
    const onSuccess = (googleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log(googleData);
    };
    return (
        <div className="loginPage">
            <header className="loginPageHeader">
                <h1>Welcome to the AEYB Portal</h1>
                <GoogleLogin
                    clientId="931818604859-0jd0r03np411c0v0pp89daplg1eansep.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </header>
        </div>
    );
}

export default Login;
