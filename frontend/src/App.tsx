import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Homepage from './pages/Homepage';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="homepage" element={<Homepage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;