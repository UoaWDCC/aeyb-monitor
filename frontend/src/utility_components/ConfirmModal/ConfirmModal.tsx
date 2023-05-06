import React from "react";

type ConfirmModalProps = {
    header: string;
    text: string;
    accept: string;
    cancel: string;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    onAccept: () => void;
};
export default function ConfirmModal({header, text, accept, cancel, setOpenModal, onAccept,}: ConfirmModalProps) {
    return (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-12 w-96">
                <div className="flex justify-end">
                    <button
                        onClick={() => {setOpenModal(false);}}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                        X
                    </button>
                </div>
                <div className="text-center mt-6">
                    <h1 className="text-3xl font-bold">{header}</h1>
                </div>
                <div className="text-center mt-8">
                    <p className="text-lg font-medium text-gray-700">{text}</p>
                </div>
                <div className="mt-12 flex justify-center space-x-4">
                    <button
                        onClick={() => {setOpenModal(false);}}
                        className="px-6 py-3 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
                    >
                        {cancel}
                    </button>
                    <button
                        onClick={() => {
                            onAccept();
                            setOpenModal(false);
                        }}
                        className="px-6 py-3 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                    >
                        {accept}
                    </button>
                </div>
            </div>
        </div>
    );
}