import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="931818604859-0jd0r03np411c0v0pp89daplg1eansep.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>;

    </React.StrictMode>,
    document.getElementById('root'),
);
