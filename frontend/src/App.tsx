import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Roles from './pages/Roles/Roles';

import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="roles" element={<Roles />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
