import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon, SparklesIcon, CurrencyDollarIcon, HeartIcon } from '@heroicons/react/24/outline';

const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] text-center">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700 mb-6 drop-shadow-sm">
                    Take Control of Your Life.
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-10 font-medium">
                    Quit your addiction. Track your streaks. Save real money you would have wasted, and unlock it when you reach your goal.
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
                    <Link to="/register">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
                        >
                            Start Your Journey
                        </motion.button>
                    </Link>
                    <Link to="/login">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-8 py-4 bg-white text-teal-600 border border-teal-200 rounded-full text-lg font-bold shadow-md hover:shadow-lg transition-all"
                        >
                            I Already Have an Account
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl"
            >
                <div className="glass p-8 rounded-3xl text-left border-t-4 border-teal-500">
                    <SparklesIcon className="h-10 w-10 text-teal-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Track Progress</h3>
                    <p className="text-gray-600">Daily streaks and motivational milestones to keep you clean and focused.</p>
                </div>
                <div className="glass p-8 rounded-3xl text-left border-t-4 border-blue-500">
                    <CurrencyDollarIcon className="h-10 w-10 text-blue-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Save Money</h3>
                    <p className="text-gray-600">Deposit the money you'd spend on addiction every day. It's locked until you succeed.</p>
                </div>
                <div className="glass p-8 rounded-3xl text-left border-t-4 border-pink-500">
                    <HeartIcon className="h-10 w-10 text-pink-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Improve Health</h3>
                    <p className="text-gray-600">Watch your body heal and read about the science behind your recovery journey.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Landing;
