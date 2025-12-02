import React, { useState } from 'react';
import SymptomSelector from '../components/SymptomSelector';
import DoctorFinder from '../components/DoctorFinder';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Activity, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SymptomChecker = () => {
    const navigate = useNavigate();
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePredict = async () => {
        if (selectedSymptoms.length === 0) {
            setError("Please select at least one symptom.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms: selectedSymptoms }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Prediction failed');
            }

            const data = await response.json();
            navigate('/result', { state: { result: data } });
        } catch (err) {
            console.error(err);
            setError("Failed to get prediction. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-light dark:bg-dark font-sans transition-colors duration-300">
            <Navbar />

            <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-dark-card rounded-2xl shadow-sm mb-6">
                        <Activity className="h-8 w-8 text-primary dark:text-primary-light" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Symptom Checker</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Select your symptoms to get an instant AI-powered health assessment.
                    </p>
                </motion.div>

                <motion.div
                    className="w-full max-w-2xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
                        <SymptomSelector
                            selectedSymptoms={selectedSymptoms}
                            setSelectedSymptoms={setSelectedSymptoms}
                        />

                        {error && (
                            <motion.div
                                className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl flex items-center border border-red-100 dark:border-red-800"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <button
                            onClick={handlePredict}
                            disabled={loading}
                            className={`mt-8 w-full bg-gradient-to-r from-primary to-accent hover:from-teal-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-300 ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-xl'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    Analyzing Symptoms...
                                </span>
                            ) : (
                                "Analyze Symptoms"
                            )}
                        </button>
                    </div>
                    <div className="mt-8">
                        <DoctorFinder />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SymptomChecker;
