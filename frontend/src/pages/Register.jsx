import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '', addictionType: 'Alcohol', goalDuration: '30', customAddiction: '', customDuration: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        const actualAddiction = formData.addictionType === 'Other' ? formData.customAddiction : formData.addictionType;
        const actualDuration = formData.goalDuration === 'Custom' ? parseInt(formData.customDuration) : parseInt(formData.goalDuration);

        if (!actualDuration || actualDuration <= 0) return setError("Invalid duration");

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                addictionType: actualAddiction,
                goalDuration: actualDuration
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center py-10 min-h-[85vh]">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-10 rounded-3xl shadow-xl w-full max-w-xl"
            >
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 text-center mb-8">Start Your Journey</h2>
                {error && <p className="text-red-500 text-center mb-4 font-bold bg-white/50 p-2 rounded-lg">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 text-gray-800 bg-white" required onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 text-gray-800 bg-white" required onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">Password</label>
                            <input type="password" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 text-gray-800 bg-white" required onChange={e => setFormData({...formData, password: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">Confirm</label>
                            <input type="password" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 text-gray-800 bg-white" required onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">What are you quitting?</label>
                            <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 text-gray-800 bg-white" onChange={e => setFormData({...formData, addictionType: e.target.value})}>
                                <option>Alcohol</option>
                                <option>Cigarette</option>
                                <option>Cocaine</option>
                                <option>Heroin</option>
                                <option>Cannabis</option>
                                <option>Vape</option>
                                <option>Prescription Drugs</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">Goal Duration</label>
                            <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 text-gray-800 bg-white" onChange={e => setFormData({...formData, goalDuration: e.target.value})}>
                                <option value="7">7 Days</option>
                                <option value="21">21 Days</option>
                                <option value="30">30 Days</option>
                                <option value="60">60 Days</option>
                                <option value="90">90 Days</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </div>
                    </div>

                    {formData.addictionType === 'Other' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                            <input type="text" placeholder="Please specify your addiction" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 text-gray-800 bg-white" required onChange={e => setFormData({...formData, customAddiction: e.target.value})} />
                        </motion.div>
                    )}

                    {formData.goalDuration === 'Custom' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                            <input type="number" placeholder="Number of days" min="1" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 text-gray-800 bg-white" required onChange={e => setFormData({...formData, customDuration: e.target.value})} />
                        </motion.div>
                    )}

                    <button type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-bold text-xl hover:shadow-xl transition-all hover:-translate-y-1">
                        Break Free Now
                    </button>
                    
                    <p className="text-center mt-6 text-gray-600 font-medium">
                        Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Register;
