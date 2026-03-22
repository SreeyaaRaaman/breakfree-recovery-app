import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { BoltIcon } from '@heroicons/react/24/solid';

const Craving = () => {
    const [chatLog, setChatLog] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showEmergency, setShowEmergency] = useState(false);

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        
        const userMsg = { sender: 'user', text: message };
        setChatLog([...chatLog, userMsg]);
        setMessage('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/chat', { message });
            setChatLog(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
        } catch (error) {
            console.error('Error with chatbot', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-6 flex flex-col lg:flex-row gap-8 min-h-[80vh]">
            <div className="flex-1 flex flex-col justify-center items-center">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEmergency(true)}
                    className="w-full max-w-md aspect-square bg-gradient-to-br from-red-500 to-rose-700 rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_60px_rgba(225,29,72,0.6)] border-8 border-red-400/50 hover:shadow-[0_0_80px_rgba(225,29,72,0.8)] transition-all cursor-pointer"
                >
                    <BoltIcon className="h-24 w-24 mb-4" />
                    <span className="text-4xl font-extrabold text-center drop-shadow-md px-4">I AM HAVING<br/>A CRAVING</span>
                </motion.button>
            </div>

            {/* Chatbot Section */}
            <div className="flex-1 glass rounded-3xl flex flex-col overflow-hidden shadow-2xl h-[600px]">
                <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-white">
                    <h2 className="text-2xl font-bold">Motivation Buddy</h2>
                    <p className="opacity-90 mt-1">Talk to me, I'm here to support you.</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/50">
                    <AnimatePresence>
                        {chatLog.map((log, index) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={index} 
                                className={`flex ${log.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] rounded-2xl px-6 py-3 shadow-md font-medium ${log.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'glass-dark text-white rounded-bl-none'}`}>
                                    {log.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {loading && (
                        <div className="flex justify-start">
                            <div className="glass-dark text-white rounded-2xl rounded-bl-none px-6 py-3 flex space-x-2">
                                <span className="animate-bounce">●</span><span className="animate-bounce delay-100">●</span><span className="animate-bounce delay-200">●</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t border-gray-200 flex space-x-2">
                    <input 
                        type="text" 
                        value={message}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-medium"
                        placeholder="e.g. I feel like giving up..."
                    />
                    <button onClick={handleSendMessage} className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 py-3 font-bold transition-colors shadow-md">
                        Send
                    </button>
                </div>
            </div>

            {/* Emergency Modal overlay */}
            <AnimatePresence>
                {showEmergency && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white p-10 rounded-[40px] max-w-lg w-full shadow-2xl relative text-center"
                        >
                            <button onClick={() => setShowEmergency(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 font-bold text-2xl">&times;</button>
                            
                            <h2 className="text-4xl font-extrabold text-red-600 mb-6 drop-shadow-sm">STOP. BREATHE.</h2>
                            <p className="text-xl text-gray-700 mb-8 font-medium">A craving typically lasts only 10 to 15 minutes. You can outlast this. You are stronger.</p>
                            
                            <div className="bg-blue-50 p-6 rounded-3xl mb-8 border border-blue-100">
                                <h3 className="font-bold text-blue-800 text-lg mb-2">4-7-8 Breathing Technique:</h3>
                                <ul className="text-blue-700 space-y-2 font-medium text-left mx-auto max-w-xs list-disc pl-5">
                                    <li>Inhale quietly through your nose for 4 seconds.</li>
                                    <li>Hold your breath for 7 seconds.</li>
                                    <li>Exhale completely through your mouth for 8 seconds.</li>
                                </ul>
                            </div>
                            
                            <h4 className="italic text-gray-500 font-medium">"Your future self is begging you not to give in."</h4>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Craving;
