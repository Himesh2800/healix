import React, { useState } from 'react';
import { MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const DoctorFinder = () => {
    const [loading, setLoading] = useState(false);

    const findDoctors = () => {
        setLoading(true);
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://www.google.com/maps/search/doctors+near+me/@${latitude},${longitude},14z`;
                window.open(url, '_blank');
                setLoading(false);
            },
            (error) => {
                console.error("Error getting location", error);
                // Fallback to generic search if location fails
                window.open('https://www.google.com/maps/search/doctors+near+me', '_blank');
                setLoading(false);
            }
        );
    };

    return (
        <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-50 rounded-xl mr-4">
                    <MapPin className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Find Nearby Doctors</h3>
                    <p className="text-sm text-gray-500">Locate medical professionals near you</p>
                </div>
            </div>

            <button
                onClick={findDoctors}
                disabled={loading}
                className="w-full mt-2 bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
            >
                {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                    <>
                        Find Doctors Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </>
                )}
            </button>
        </motion.div>
    );
};

export default DoctorFinder;
