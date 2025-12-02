import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PredictionResult from '../components/PredictionResult';
import { ArrowLeft } from 'lucide-react';

const PredictionResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;

    if (!result) {
        return (
            <div className="min-h-screen bg-light dark:bg-dark font-sans transition-colors duration-300">
                <Navbar />
                <div className="max-w-4xl mx-auto py-24 px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No result found</h2>
                    <button
                        onClick={() => navigate('/symptom-checker')}
                        className="mt-4 text-primary hover:underline"
                    >
                        Return to Symptom Checker
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light dark:bg-dark font-sans transition-colors duration-300">
            <Navbar />
            <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="mb-6 flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Dashboard
                </button>

                <PredictionResult result={result} onReset={() => navigate('/symptom-checker')} />
            </div>
        </div>
    );
};

export default PredictionResultPage;
