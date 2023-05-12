import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { UserContextProvider, useUserContext } from './contexts/UserContext';
import { MeetingContextProvider } from './contexts/MeetingContext';
import Login from './pages/login/Login';
import NotFound from './pages/not_found/NotFound';
import Roles from './pages/roles/Roles';
import Homepage from './pages/home/Homepage';
import UserProfile from './pages/profiles/ProfileInfo';
import CalendarPage from './pages/calendar/CalendarPage';
import Sidebar from './utility_components/sidebar/Sidebar';
import ActiveMeeting from './pages/active_meeting/ActiveMeeting';
import AfterMeeting from './pages/active_meeting/AfterMeeting';

function MeetingContextLayout() {
    return (
        <MeetingContextProvider>
            <Outlet />
        </MeetingContextProvider>
    )
}

function App() {

    const AppRoutes = () => {
        const userContext = useUserContext();

        return (
            <Routes >
                {userContext.user ? (
                    <>
                        <Route path="/" element={<Sidebar />}>
                            <Route element={<MeetingContextLayout />} >
                                <Route path="/" element={<Homepage />} />
                                <Route path="calendarpage" element={<CalendarPage />} />
                                <Route path="activemeetingpage" element={<ActiveMeeting />} />
                                <Route path="aftermeetingpage" element={<AfterMeeting />} />
                            </Route>
                            <Route path="profilepage/roles" element={<Roles />} />
                            <Route path="profilepage/*" element={<UserProfile />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/login" element={<Login />} />
                    </>
                ) : <Route path="*" element={<Login />} />}

            </Routes>
        );
    }

    return (
        <Router>
            <UserContextProvider>
                <AppRoutes />
            </UserContextProvider>
        </Router>
    );
}

export default App;
