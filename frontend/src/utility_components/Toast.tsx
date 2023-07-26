import React, { useEffect } from 'react';
import classNames from 'classnames';

interface ToastProps {
    message?: string; // Make the message prop optional
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            // Close the toast automatically after 3 seconds
            const timer = setTimeout(onClose, 3000);

            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) {
        return null; // If no message, don't render the toast at all
    }

    return (
        <div className="fixed top-0 left-0 w-full h-12 bg-blue-500 text-white text-center flex justify-center items-center">
            <span>{message}</span>
        </div>
    );
};

export default Toast;
