import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Homepage from './pages/Hompage/Homepage';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="homepage" element={<Homepage />} />
                    {/* <Route path="calendar" element={<calendar />} />
                    <Route path="profile" element={<profile />} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;