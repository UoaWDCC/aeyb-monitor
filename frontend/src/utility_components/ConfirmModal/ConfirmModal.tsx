import React from 'react'

export default function ConfirmModal(props: {header: string; text: string; accept: string; cancel: string; setOpenModal: any; onAccept: any;}){
    return (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 w-80 h-80">
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            props.setOpenModal(false);
                        }}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                        X
                    </button>
                </div>
                <div className="text-center mt-4">
                    <h1 className="text-xl font-bold">{props.header}</h1>
                </div>
                <div className="text-center mt-8">
                    <p className="text-lg font-medium text-gray-700">{props.text}</p>
                </div>
                <div className="mt-14 flex justify-center space-x-4">
                    <button
                        onClick={() => {
                            props.onAccept();
                            props.setOpenModal(false);
                        }}
                        className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                    >
                        {props.accept}
                    </button>
                    <button
                        onClick={() => {
                            props.setOpenModal(false);
                        }}
                        className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
                    >
                        {props.cancel}
                    </button>
                </div>
            </div>
        </div>
    );
}

