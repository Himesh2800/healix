import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Upload, Camera, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const SkinAnalysis = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResult(null);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setLoading(true);

        // Simulate form data - in a real app, you'd send the file
        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await fetch('http://localhost:5000/predict-skin', {
                method: 'POST',
                body: formData, // Send formData directly, do not set Content-Type header manually
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Analysis failed');

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error analyzing skin:", error);
            alert("Failed to analyze image. Please try again.");
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
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Skin Health Analysis</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Upload a photo of your skin concern for an instant AI assessment.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <motion.div
                        className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-primary transition-colors relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md" />
                            ) : (
                                <div className="space-y-4">
                                    <div className="mx-auto h-16 w-16 bg-gray-100 dark:bg-dark-lighter rounded-full flex items-center justify-center">
                                        <Camera className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Click to upload or drag and drop</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={!selectedImage || loading}
                            className={`mt-6 w-full bg-primary hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center ${(!selectedImage || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Upload className="h-5 w-5 mr-2" />
                                    Analyze Image
                                </>
                            )}
                        </button>
                    </motion.div>

                    {/* Result Section */}
                    <motion.div
                        className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 flex flex-col justify-center border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {result ? (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 text-primary dark:text-primary-light">
                                    <CheckCircle className="h-8 w-8" />
                                    <h2 className="text-2xl font-bold">Analysis Complete</h2>
                                </div>

                                <div className="bg-gray-50 dark:bg-dark-lighter p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Detected Condition</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{result.name}</p>
                                    <div className="mt-2 flex items-center">
                                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-3">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${result.probability}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{result.probability}%</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Recommendation</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{result.recommendation}</p>
                                </div>

                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl flex items-start">
                                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                                        This is an AI-generated assessment and not a medical diagnosis. Please consult a dermatologist for accurate diagnosis and treatment.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 dark:text-gray-500">
                                <div className="mx-auto h-24 w-24 bg-gray-50 dark:bg-dark-lighter rounded-full flex items-center justify-center mb-4">
                                    <Upload className="h-10 w-10 opacity-20" />
                                </div>
                                <p>Upload an image to see the analysis results here.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SkinAnalysis;
