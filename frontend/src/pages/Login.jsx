import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-10 rounded-3xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-gray-800 bg-white"
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-gray-800 bg-white"
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full py-4 mt-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600 font-medium">
                    Don't have an account? <Link to="/register" className="text-teal-600 font-bold hover:underline">Register here</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
