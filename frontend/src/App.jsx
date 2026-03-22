import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Health from './pages/Health';
import Craving from './pages/Craving';

const PrivateRoute = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <div className="min-h-screen">
                <Navbar />
                <div className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/health" element={
                            <PrivateRoute>
                                <Health />
                            </PrivateRoute>
                        } />
                        <Route path="/craving" element={
                            <PrivateRoute>
                                <Craving />
                            </PrivateRoute>
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
