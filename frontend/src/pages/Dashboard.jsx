import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';
import { FireIcon, LockClosedIcon, CheckBadgeIcon, CurrencyRupeeIcon } from '@heroicons/react/24/solid';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { user, token, fetchUser } = useContext(AuthContext);
    const [progress, setProgress] = useState(null);
    const [saveAmount, setSaveAmount] = useState('');
    const [upiId, setUpiId] = useState('');
    const [loading, setLoading] = useState(true);

    const loadProgress = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/progress');
            setProgress(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to load progress', err);
        }
    };

    useEffect(() => {
        loadProgress();
    }, []);

    const handleSaveMoney = async () => {
        if (!saveAmount || isNaN(saveAmount) || saveAmount <= 0) return alert('Enter a valid amount');
        try {
            const orderRes = await axios.post('http://localhost:5000/api/payment/create-order', { amount: parseInt(saveAmount) });
            const { id, amount, key } = orderRes.data;

            const options = {
                key: key,
                amount: amount.toString(),
                currency: "INR",
                name: "BreakFree Savings",
                description: "Invest in your healthy future",
                order_id: id,
                handler: async function (response) {
                    try {
                        await axios.post('http://localhost:5000/api/payment/verify-payment', {
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            amount: parseInt(saveAmount)
                        });
                        alert('Payment successful and logged!');
                        setSaveAmount('');
                        loadProgress();
                        fetchUser();
                    } catch (error) {
                        alert('Payment verification failed.');
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: { color: "#0d9488" }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error opening Razorpay', error);
            alert('Failed to initialize payment: ' + (error.response?.data?.error || 'Check console'));
        }
    };

    const handleWithdraw = async () => {
        if (!upiId) return alert('Please enter your UPI ID');
        try {
            await axios.post('http://localhost:5000/api/payment/withdraw', { upiId });
            alert(`Withdrawal of ₹${progress.totalSaved} transferred successfully to ${upiId}!`);
            loadProgress();
            fetchUser();
        } catch (err) {
            alert(err.response?.data?.msg || 'Withdrawal failed');
        }
    };

    if (loading || !progress) return <div className="text-center py-20 text-xl font-bold">Loading your journey...</div>;

    const chartData = {
        labels: progress.logs.map((log, index) => `Day ${index + 1}`),
        datasets: [
            {
                label: 'Daily Savings (₹)',
                data: progress.logs.map(log => log.amount),
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14, 165, 233, 0.2)',
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: '#0ea5e9',
            }
        ]
    };

    const renderBadges = () => {
        const milestones = [1, 7, 30, 90];
        return milestones.map(m => (
            <div key={m} className={`flex flex-col items-center p-4 rounded-xl shadow-md ${progress.streak >= m ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 scale-105' : 'glass opacity-50'}`}>
                <CheckBadgeIcon className="h-10 w-10 mb-2" />
                <span className="font-bold">{m} Days</span>
            </div>
        ));
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700">
                    Welcome back, {user.name}
                </h1>
                <p className="text-xl text-gray-600 mt-3 font-medium">You are {progress.streak} days clean. Keep going.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass p-6 rounded-3xl flex items-center shadow-lg hover:-translate-y-1 transition-transform">
                    <FireIcon className="h-14 w-14 text-orange-500 mr-4" />
                    <div>
                        <p className="text-gray-500 font-bold uppercase text-sm">Current Streak</p>
                        <p className="text-3xl font-extrabold text-gray-800">{progress.streak} Days</p>
                    </div>
                </div>
                <div className="glass p-6 rounded-3xl flex items-center shadow-lg hover:-translate-y-1 transition-transform">
                    <LockClosedIcon className="h-14 w-14 text-teal-600 mr-4" />
                    <div>
                        <p className="text-gray-500 font-bold uppercase text-sm">Locked Balance</p>
                        <p className="text-3xl font-extrabold text-gray-800">₹{progress.totalSaved}</p>
                    </div>
                </div>
                <div className="glass p-6 rounded-3xl flex items-center shadow-lg md:col-span-2">
                    <div className="flex-1">
                        <p className="text-gray-500 font-bold uppercase text-sm mb-2">Journey Progress</p>
                        <p className="text-xl font-bold text-gray-800 mb-2">{progress.daysCompleted} completed / {progress.daysRemaining} remaining</p>
                        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                            <div className="bg-gradient-to-r from-teal-400 to-blue-500 h-4 rounded-full" style={{ width: `${Math.min(100, (progress.daysCompleted / user.goalDuration) * 100)}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-3xl shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><CurrencyRupeeIcon className="h-8 w-8 mr-2 text-teal-600"/> Daily Deposit</h2>
                    <p className="text-gray-600 mb-4 font-medium">How much would you normally spend today on your addiction?</p>
                    <div className="flex items-center space-x-4 mb-6">
                        <span className="text-2xl font-bold text-gray-700">₹</span>
                        <input 
                            type="number" 
                            className="flex-1 w-full px-4 py-3 rounded-xl border-2 border-teal-200 focus:border-teal-500 focus:outline-none text-xl font-bold text-gray-800 bg-white shadow-sm"
                            value={saveAmount}
                            onChange={(e) => setSaveAmount(e.target.value)}
                            placeholder="Amount in INR"
                        />
                    </div>
                    <button onClick={handleSaveMoney} className="w-full py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-xl font-extrabold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                        👉 Save Money for Your Future
                    </button>
                </div>

                <div className="glass p-8 rounded-3xl shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Savings History</h2>
                    <div className="h-48 w-full">
                        <Line data={chartData} options={{ maintainAspectRatio: false, responsive: true }} />
                    </div>
                </div>
            </div>

            {user.withdrawable ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gradient-to-r from-green-400 to-emerald-600 p-8 rounded-3xl shadow-2xl text-white text-center">
                    <h2 className="text-3xl font-bold mb-2">🎉 Goal Completed!</h2>
                    <p className="text-xl mb-6 font-medium">Congratulations! You have successfully reached your {user.goalDuration}-day goal. You can now withdraw your locked savings of ₹{progress.totalSaved}.</p>
                    <div className="max-w-md mx-auto flex flex-col items-center">
                        <input 
                            type="text" 
                            className="w-full px-5 py-3 rounded-xl border-none focus:outline-none text-gray-800 font-bold mb-4 shadow-inner"
                            placeholder="Enter UPI ID (e.g. name@upi)"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                        <button onClick={handleWithdraw} className="w-full py-3 bg-white text-emerald-700 rounded-xl font-extrabold text-xl shadow-lg hover:bg-gray-100 transition-all">
                            Withdraw Savings
                        </button>
                    </div>
                </motion.div>
            ) : (
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-8 rounded-3xl text-center text-gray-600 shadow-inner">
                    <LockClosedIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p className="text-lg font-bold">Withdrawal Locked</p>
                    <p className="font-medium">Complete your {user.goalDuration}-day goal to unlock your savings.</p>
                </div>
            )}

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Achievements</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {renderBadges()}
                </div>
            </div>

        </motion.div>
    );
};

export default Dashboard;
