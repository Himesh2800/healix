import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, Loader2, X } from 'lucide-react';

const SOSButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [contactCount, setContactCount] = useState(0);

    React.useEffect(() => {
        if (isOpen) {
            fetchContacts();
        }
    }, [isOpen]);

    const fetchContacts = async () => {
        try {
            const response = await fetch('http://localhost:5000/contacts', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setContactCount(data.contacts.length);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleSOS = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        setSending(true);

        const sendAlert = async (latitude, longitude) => {
            try {
                const response = await fetch('http://localhost:5000/sos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        latitude,
                        longitude
                    }),
                    credentials: 'include'
                });

                if (response.ok) {
                    setSent(true);
                    // Simulate redirect to emergency dialer
                    setTimeout(() => {
                        window.location.href = "tel:112";
                    }, 1500);
                }
            } catch (error) {
                console.error("Failed to send SOS", error);
                alert("Failed to send alert to server.");
            } finally {
                setSending(false);
            }
        };

        if (!navigator.geolocation) {
            // Fallback for browsers without geolocation support
            sendAlert(0, 0);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                sendAlert(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.error("Error getting location", error);
                // Fallback if location access is denied or fails
                // We still want to send the alert, just without precise location
                sendAlert(0, 0);
            },
            { timeout: 10000 }
        );
    };

    return (
        <>
            <motion.button
                className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <AlertTriangle className="h-6 w-6" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl relative"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                                    <AlertTriangle className="h-8 w-8 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Emergency SOS</h3>
                                <p className="text-gray-500 mb-8">
                                    This will send your current location to <strong>{contactCount}</strong> emergency contacts and dial emergency services.
                                </p>

                                {sent ? (
                                    <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-4">
                                        <p className="font-medium">Alert Sent!</p>
                                        <p className="text-sm">Help is on the way.</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleSOS}
                                        disabled={sending}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center transition-all"
                                    >
                                        {sending ? (
                                            <>
                                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                                Sending Alert...
                                            </>
                                        ) : (
                                            <>
                                                <Phone className="h-5 w-5 mr-2" />
                                                SEND SOS NOW
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SOSButton;
