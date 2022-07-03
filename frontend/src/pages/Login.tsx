import React from 'react';
import GoogleLogin from 'react-google-login';
import { idText } from 'typescript';
import './Login.css';

function Login() {
    const onFailure = (result) => {
        alert(result);
    };
    const onSuccess = (googleData) => {
        console.log(googleData);
    };
    return (
        <div className="loginPage">
            <header className="loginPageHeader">
                <h1>Welcome to the AEYB Portal</h1>
                <GoogleLogin
                    //need id
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
            </header>
        </div>
    );
}

export default Login;
