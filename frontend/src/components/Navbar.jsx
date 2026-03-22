import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed w-full top-0 z-50 glass py-3">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <Link to={user ? "/dashboard" : "/"} className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                    💙 BreakFree
                </Link>
                <div className="space-x-4 flex items-center">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Dashboard</Link>
                            <Link to="/health" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Health</Link>
                            <Link to="/craving" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Craving!</Link>
                            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold shadow-md transition-all">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Login</Link>
                            <Link to="/register" className="px-5 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all scale-100 hover:scale-105">
                                Start Recovery
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
