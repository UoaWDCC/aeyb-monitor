import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MeetingContextLayout } from './contexts/MeetingContext';
import { UserContextProvider, useUserContext } from './contexts/UserContext';
import ActiveMeeting from './pages/active_meeting/ActiveMeeting';
import AfterMeeting from './pages/active_meeting/AfterMeeting';
import CalendarPage from './pages/calendar/CalendarPage';
import Homepage from './pages/home/Homepage';
import Login from './pages/login/Login';
import NotFound from './pages/not_found/NotFound';
import UserProfile from './pages/profiles/ProfileInfo';
import Roles from './pages/roles/Roles';
import Sidebar from './utility_components/sidebar/Sidebar';


function App() {
    const AppRoutes = () => {
        const userContext = useUserContext();

        return (
            <Routes>
                {userContext.user ? (
                    <>
                        <Route path="/" element={<Sidebar />}>
                            <Route element={<MeetingContextLayout />} >
                                <Route path="/" element={<Homepage />} />
                                <Route path="calendarpage" element={<CalendarPage />} />
                                <Route path="activemeeting/:meetingId" element={<ActiveMeeting />} />
                                <Route path="aftermeetingpage" element={<AfterMeeting />} />
                            </Route>
                            <Route path="profilepage/roles" element={<Roles />} />
                            <Route path="profilepage/*" element={<UserProfile />} />
                        </Route >
                        <Route path="*" element={<NotFound />} />
                        <Route path="/login" element={<Login />} />
                    </>
                ) : (
                    <Route path="*" element={<Login />} />
                )
                }
            </Routes >
        );
    };

    return (
        <Router>
            <UserContextProvider>
                <AppRoutes />
            </UserContextProvider>
        </Router>
    );
}

export default App;
