import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Tag, Loader2 } from 'lucide-react';

const SymptomSelector = ({ selectedSymptoms, setSelectedSymptoms }) => {
    const [symptoms, setSymptoms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/symptoms', { credentials: 'include' })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch symptoms");
                return res.json();
            })
            .then(data => {
                setSymptoms(data.symptoms);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch symptoms", err);
                setLoading(false);
            });
    }, []);

    const toggleSymptom = (symptom) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        }
    };

    const clearAll = () => {
        setSelectedSymptoms([]);
    };

    const filteredSymptoms = symptoms.filter(s =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center items-center p-8">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
    );

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Select Symptoms</h2>
                {selectedSymptoms.length > 0 && (
                    <button
                        onClick={clearAll}
                        className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Selected Symptoms Chips */}
            <AnimatePresence>
                {selectedSymptoms.length > 0 && (
                    <motion.div
                        className="flex flex-wrap gap-2 mb-6 p-4 bg-gray-50 dark:bg-dark-lighter rounded-xl border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {selectedSymptoms.map(symptom => (
                            <motion.span
                                key={symptom}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                            >
                                {symptom.replace(/_/g, ' ')}
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleSymptom(symptom); }}
                                    className="ml-2 hover:text-red-500 focus:outline-none"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </motion.span>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Input */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search symptoms (e.g., fever, headache)..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-dark-lighter text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Symptoms List */}
            <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                {filteredSymptoms.map(symptom => (
                    <motion.div
                        key={symptom}
                        layoutId={symptom}
                        onClick={() => toggleSymptom(symptom)}
                        className={`group p-3 rounded-xl cursor-pointer flex justify-between items-center transition-all duration-200 border ${selectedSymptoms.includes(symptom)
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white dark:bg-dark-lighter border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="flex items-center">
                            <div className={`p-2 rounded-lg mr-3 ${selectedSymptoms.includes(symptom) ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600'}`}>
                                <Tag className={`h-4 w-4 ${selectedSymptoms.includes(symptom) ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                            </div>
                            <span className="capitalize font-medium">{symptom.replace(/_/g, ' ')}</span>
                        </div>

                        {selectedSymptoms.includes(symptom) && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                <div className="bg-white/20 rounded-full p-1">
                                    <X className="h-4 w-4 text-white" />
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
                {filteredSymptoms.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No symptoms found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>Total Symptoms: {symptoms.length}</span>
                <span>Selected: <span className="font-bold text-primary">{selectedSymptoms.length}</span></span>
            </div>
        </div>
    );
};

export default SymptomSelector;
