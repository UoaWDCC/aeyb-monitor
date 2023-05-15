import React from 'react';
import './NotFound.css';

function NotFound() {
    return (
        <html>
            <body className="m-1">
                <div className="flex-container bg-white flex flex-col md:flex-row justify-center items-center h-screen">
                    <div className="imagebox w-3/4 md:w-1/2 flex items-center">
                        <img
                            className="image404 mx-auto"
                            // src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                            src="/src/images/edited/AEYB_A0_CircleBlackWardlineSmaller.png"
                            alt="NotFound.png"
                        />
                    </div>

                    <div className="text-box w-3/4 md:w-1/2 flex flex-col items-center justify-center px-4">
                        <h1 className="oops-text text-7xl md:text-9xl font-extrabold text-center mt-6">OOPS!</h1>

                        <p className="text-xl md:text-2xl text-center whitespace-normal max-w-2xl mt-6 break-words">
                            The page you are looking for might have been removed, had its name changed or is temporarily
                            unavailable.
                        </p>

                        {/* Temp HTML button - Not using Generalised Component because not pushed yet */}
                        <button
                            className="home-page-button bg-[#272C6C] text-white mt-6 px-6 py-3 rounded-md"
                            onClick={() => console.log('Button Clicked')}
                        >
                            Go To Homepage
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}

export default NotFound;
