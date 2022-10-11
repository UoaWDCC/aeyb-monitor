import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import { MeetingContextProvider } from './contexts/MeetingContext';
import Login from './pages/login/Login';
import NotFound from './pages/not_found/NotFound';
import Roles from './pages/roles/Roles';
import Homepage from './pages/home/Homepage';
import UserProfile from './pages/profiles/UserProfile';
import CalendarPage from './pages/calendar/CalendarPage';
import Sidebar from './utility_components/sidebar/Sidebar';
import ActiveMeeting from './pages/active_meeting/ActiveMeeting';
import AfterMeeting from './pages/active_meeting/AfterMeeting';

function App() {
    return (
        <Router>
            <UserContextProvider>
                <MeetingContextProvider>
                    <Routes >
                        <Route path="/" element={<Sidebar />}>
                            <Route path="/" element={<Homepage />} />
                            <Route path="profilepage/roles" element={<Roles />} />
                            <Route path="calendarpage" element={<CalendarPage />} />
                            <Route path="profilepage/*" element={<UserProfile />} />
                            <Route path="activemeetingpage" element={<ActiveMeeting />} />
                            <Route path="aftermeetingpage" element={<AfterMeeting />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </MeetingContextProvider>
            </UserContextProvider>
        </Router>
    );
}

export default App;
