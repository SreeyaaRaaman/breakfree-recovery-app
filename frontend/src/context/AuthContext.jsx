import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/user');
            setUser(res.data);
        } catch (error) {
            console.error('Error fetching user', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
    };

    const register = async (userData) => {
        const res = await axios.post('http://localhost:5000/api/auth/register', userData);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};
