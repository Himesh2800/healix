import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Shield, RefreshCw } from 'lucide-react';

const PredictionResult = ({ result, onReset }) => {
    if (!result) return null;

    const { predictions, final_prediction } = result;

    const container = {
        hidden: { opacity: 0, scale: 0.95 },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="w-full max-w-2xl mx-auto mt-8"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* Diagnosis Card */}
            <motion.div
                className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100 dark:border-gray-700"
                variants={item}
            >
                <div className="bg-gradient-to-r from-primary to-accent p-6 text-white text-center">
                    <h2 className="text-sm uppercase tracking-wider font-semibold opacity-90">Diagnosis Result</h2>
                    <h1 className="text-4xl font-bold mt-2">{final_prediction}</h1>
                    <p className="text-sm mt-2 opacity-80">Based on AI analysis of your symptoms</p>
                </div>

                <div className="p-6">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Model Confidence</h3>
                    <div className="space-y-4">
                        {Object.entries(predictions).map(([model, data]) => (
                            <div key={model} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-lighter rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-800 dark:text-white">{model}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{data.disease}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${data.confidence}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        ></motion.div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 w-12 text-right">{data.confidence}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Remedies Section */}
                {result.remedies && result.remedies.length > 0 && (
                    <motion.div
                        className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
                        variants={item}
                    >
                        <div className="flex items-center mb-4 text-secondary">
                            <Heart className="h-6 w-6 mr-2" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Home Remedies</h3>
                        </div>
                        <ul className="space-y-3">
                            {result.remedies.map((remedy, index) => (
                                <li key={index} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                                    <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5 mr-2 flex-shrink-0"></span>
                                    {remedy}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* Exercises Section */}
                {result.exercises && result.exercises.length > 0 && (
                    <motion.div
                        className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
                        variants={item}
                    >
                        <div className="flex items-center mb-4 text-accent">
                            <Shield className="h-6 w-6 mr-2" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Exercises</h3>
                        </div>
                        <ul className="space-y-3">
                            {result.exercises.map((exercise, index) => (
                                <li key={index} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 mr-2 flex-shrink-0"></span>
                                    {exercise}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </div>

            <motion.button
                onClick={onReset}
                className="w-full mt-8 bg-gray-900 hover:bg-gray-800 dark:bg-primary dark:hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <RefreshCw className="h-5 w-5 mr-2" />
                Start New Analysis
            </motion.button>
        </motion.div>
    );
};

export default PredictionResult;
