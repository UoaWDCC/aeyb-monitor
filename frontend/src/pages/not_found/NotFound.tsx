import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/utility_components/Button';

export default function NotFound() {
    const navigate = useNavigate();
    // Navigation back to Home Page
    const returntoHomePage = () => {
        navigate('/');
    };

    return (
        <div className="flex-container bg-white flex flex-col md:flex-row justify-center items-center h-screen m-1">
            <div className="imagebox w-3/4 md:w-1/2 flex items-center">
                <img
                    className="image404 mx-auto md:w-3/4"
                    src="/src/images/edited/AEYB_A0_CircleBlackWardlineSmaller.png"
                    alt="AEYB Logo with WARD line"
                />
            </div>

            <div className="text-box w-3/4 md:w-1/2 flex flex-col items-center justify-center px-4">
                <h1 className="oops-text text-7xl md:text-9xl font-extrabold text-center mt-6">OOPS!</h1>

                <p className="text-xl md:text-2xl text-center whitespace-normal max-w-2xl mt-6 break-words">
                    The page you are looking for might have been removed, had its name changed or is temporarily
                    unavailable.
                </p>

                <Button color="#272C6C" extraStyles="mt-6" onClick={returntoHomePage}>
                    Go To Homepage
                </Button>
            </div>
        </div>
    );
}
