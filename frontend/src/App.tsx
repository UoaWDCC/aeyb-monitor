import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import Roles from './pages/Roles/Roles';

import './App.css';

import Homepage from './pages/Hompage/Homepage';
import ProfilePage from './pages/Profile_Page/ProfilePage';
import CalendarPage from './pages/Calendar_Page/CalendarPage';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="roles" element={<Roles />} />
                    <Route path="homepage" element={<Homepage />} />
                    <Route path="calendarpage" element={<CalendarPage />} />
                    <Route path="profilepage" element={<ProfilePage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
