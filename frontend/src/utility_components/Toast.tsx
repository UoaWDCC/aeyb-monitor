import React, { useEffect } from 'react';

interface ToastProps {
    message?: string;
    onClose: () => void;
}

const Toast = ({ message, onClose }: ToastProps) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(onClose, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    return (
        <>
            {message.length > 0 && (
                <div className="fixed top-0 left-0 w-full h-12 bg-blue-500 text-white text-center flex justify-center items-center">
                    {message}
                </div>
            )}
        </>
    );
};

export default Toast;
