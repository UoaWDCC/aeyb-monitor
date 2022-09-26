import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Roles from './pages/Roles/Roles';
import Homepage from './pages/Hompage/Homepage';
import UserProfile from './pages/Profiles_Page/UserProfile';
import CalendarPage from './pages/Calendar_Page/CalendarPage';
import ActiveMeeting from './pages/Active_Meeting/ActiveMeeting';


function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="profilepage/roles" element={<Roles />} />
                    <Route path="homepage" element={<Homepage />} />
                    <Route path="calendarpage" element={<CalendarPage />} />
                    <Route path="profilepage" element={<UserProfile />} />
                    <Route path="activemeetingpage" element={<ActiveMeeting />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
