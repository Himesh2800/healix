import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Clock, Phone, Navigation } from 'lucide-react';

const DoctorFinder = () => {
    const [specialty, setSpecialty] = useState('');
    const [location, setLocation] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!specialty || !location) return;

        setLoading(true);
        setSearched(true);
        setError('');
        setDoctors([]);

        try {
            const response = await fetch('http://localhost:5000/doctors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ specialty, location }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setDoctors(data.doctors);
            } else {
                if (response.status === 401) {
                    setError('Session expired. Please login again.');
                } else {
                    setError('Failed to fetch doctors. Please try again.');
                }
            }
        } catch (error) {
            console.error("Error finding doctors:", error);
            setError('Network error. Is the backend server running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-300">
            <Navbar />
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Find Specialist Doctors
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Search for top-rated specialists near you. Get reviews, ratings, and clinic details instantly.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 mb-12 border border-gray-100 dark:border-gray-700 max-w-3xl mx-auto"
                >
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Specialty (e.g. Cardiologist)"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-dark-lighter text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Location (e.g. New York)"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-dark-lighter text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Searching...
                                </span>
                            ) : (
                                'Find Doctors'
                            )}
                        </button>
                    </form>
                </motion.div>

                {
                    error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-8 text-center"
                        >
                            {error}
                        </motion.div>
                    )
                }

                {
                    searched && !loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {doctors.length > 0 ? (
                                doctors.map((doctor, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white dark:bg-dark-card rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
                                    >
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{doctor.name}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                                        <MapPin className="h-3 w-3 mr-1" /> {doctor.address}
                                                    </p>
                                                </div>
                                                <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                                                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                                                    <span className="text-sm font-bold text-yellow-700 dark:text-yellow-500">{doctor.rating}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                    <Clock className="h-4 w-4 mr-2 text-primary" />
                                                    {doctor.timings}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                    <Phone className="h-4 w-4 mr-2 text-primary" />
                                                    {doctor.phone}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {doctor.reviews}
                                                </div>
                                            </div>

                                            <button className="w-full py-2 px-4 bg-gray-50 dark:bg-dark-lighter text-primary dark:text-primary-light font-medium rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors flex items-center justify-center">
                                                <Navigation className="h-4 w-4 mr-2" />
                                                Get Directions
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400 text-lg">No doctors found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    )
                }
            </div >
        </div >
    );
};

export default DoctorFinder;
