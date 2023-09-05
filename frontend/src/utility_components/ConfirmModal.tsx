import React from 'react';
import Button from './Button';

type ConfirmModalProps = {
    header: string;
    text: string;
    leftButtonText: string;
    rightButtonText: string;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    onAccept: () => void;
};
export default function ConfirmModal({
    header,
    text,
    leftButtonText,
    rightButtonText,
    setOpenModal,
    onAccept,
}: ConfirmModalProps) {
    return (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-12 w-">
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="42"
                            height="42"
                            fill="currentColor"
                            className="bi bi-x"
                            viewBox="0 0 16 16"
                        >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </div>
                <div className="text-center mt-6">
                    <h1 className="text-3xl font-bold">{header}</h1>
                </div>
                <div className="text-center mt-8">
                    <p className="text-lg font-medium text-gray-700">{text}</p>
                </div>
                <div className="mt-12 flex justify-center space-x-4">
                    <Button
                        onClick={() => {
                            onAccept();
                            setOpenModal(false);
                        }}
                        className="px-6 py-3 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                    >
                        {leftButtonText}
                    </Button>
                    <Button
                        onClick={() => setOpenModal(false)}
                        className="px-6 py-3 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
                    >
                        {rightButtonText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
