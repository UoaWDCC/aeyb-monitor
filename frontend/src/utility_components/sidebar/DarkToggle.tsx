import React from 'react';
import { useDarkMode } from '../DarkModeContext';

export default function DarkToggle() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className={`relative w-10 h-6 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
            <span
                className={`absolute left-0 top-0 w-5 h-5 rounded-full transform transition-transform ${
                    darkMode ? 'translate-x-full bg-white' : 'bg-gray-400'
                }`}
            />
        </button>
    );
}
