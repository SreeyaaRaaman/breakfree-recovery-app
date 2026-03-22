import React from 'react';
import { HeartIcon, ExclamationTriangleIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Health = () => {
    return (
        <div className="py-10">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 text-center mb-10">
                Healing Your Body & Mind
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="glass p-8 rounded-3xl hover:shadow-2xl transition-all border-t-8 border-yellow-500">
                    <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Smoking Risks</h2>
                    <p className="text-gray-600 font-medium">
                        Smoking damages your lungs, heart, and blood vessels. It decreases oxygen to your brain and significantly increases the risk of stroke and cancer. The sooner you quit, the faster your body can begin repairing the damage.
                    </p>
                </div>

                <div className="glass p-8 rounded-3xl hover:shadow-2xl transition-all border-t-8 border-violet-500">
                    <HeartIcon className="h-12 w-12 text-violet-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Alcohol Impacts</h2>
                    <p className="text-gray-600 font-medium">
                        Heavy drinking stresses the liver, inflames the pancreas, and can lead to severe cardiovascular issues. Quitting alcohol leads to improved sleep, weight loss, clearer skin, and significantly boosted mental clarity.
                    </p>
                </div>

                <div className="glass p-8 rounded-3xl hover:shadow-2xl transition-all border-t-8 border-teal-500">
                    <SparklesIcon className="h-12 w-12 text-teal-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Drug Impacts</h2>
                    <p className="text-gray-600 font-medium">
                        Substance abuse hijacks your brain’s reward pathways, causing severe mood swings, cognitive decline, and physical deterioration. Recovery reinstates natural joy, restores memory, and rebuilds your immune system resilience.
                    </p>
                </div>
            </div>
            
            <div className="mt-16 bg-white p-10 rounded-3xl shadow-xl max-w-4xl mx-auto text-center border border-gray-100">
                <h3 className="text-3xl font-bold text-teal-600 mb-4">Did you know?</h3>
                <p className="text-xl text-gray-700 italic font-medium">
                    "Within just 48 hours of quitting smoking, your nerve endings begin to regenerate, and your sense of smell and taste start returning to normal."
                </p>
            </div>
        </div>
    );
};

export default Health;
