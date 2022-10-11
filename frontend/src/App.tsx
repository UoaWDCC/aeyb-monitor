import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Roles from './pages/Roles/Roles';
import Homepage from './pages/Hompage/Homepage';
import UserProfile from './pages/Profiles_Page/UserProfile';
import CalendarPage from './pages/Calendar_Page/CalendarPage';
import Sidebar from './Sidebar_Components/Sidebar';
import ActiveMeeting from './pages/Active_Meeting/ActiveMeeting';
import AfterMeeting from './pages/Active_Meeting/AfterMeeting';

function App() {
    return (
        <Router>
            <UserContextProvider>
                <Routes>
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
            </UserContextProvider>
        </Router>
    );
}

export default App;
