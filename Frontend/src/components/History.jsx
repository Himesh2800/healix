import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Activity, ChevronRight, Loader2 } from 'lucide-react';

const History = () => {
    const [activeTab, setActiveTab] = useState('symptoms');
    const [history, setHistory] = useState([]);
    const [dietHistory, setDietHistory] = useState([]);
    const [skinHistory, setSkinHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHistory = async () => {
        try {
            const [symptomRes, dietRes, skinRes] = await Promise.all([
                fetch('http://localhost:5000/history', { credentials: 'include' }),
                fetch('http://localhost:5000/diet-history', { credentials: 'include' }),
                fetch('http://localhost:5000/skin-history', { credentials: 'include' })
            ]);

            if (!symptomRes.ok || !dietRes.ok || !skinRes.ok) throw new Error("Failed to fetch history");

            const symptomData = await symptomRes.json();
            const dietData = await dietRes.json();
            const skinData = await skinRes.json();

            setHistory(symptomData.history);
            setDietHistory(dietData.history);
            setSkinHistory(skinData.history);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch history", err);
            setError("Could not load history.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleDelete = async (id, type) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;

        let endpoint = '';
        if (type === 'symptoms') endpoint = `history/${id}`;
        else if (type === 'diet') endpoint = `diet-history/${id}`;
        else return; // Skin history deletion not implemented yet

        try {
            const response = await fetch(`http://localhost:5000/${endpoint}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                if (type === 'symptoms') {
                    setHistory(history.filter(item => item.id !== id));
                } else if (type === 'diet') {
                    setDietHistory(dietHistory.filter(item => item.id !== id));
                }
            } else {
                alert("Failed to delete record");
            }
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("Error deleting record");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center p-12">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
    );

    if (error) return (
        <div className="text-center p-8 text-red-500 bg-red-50 rounded-xl border border-red-100">
            {error}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex space-x-4 border-b border-gray-200 pb-2 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('symptoms')}
                    className={`pb-2 px-1 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'symptoms' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Symptom Scans
                    {activeTab === 'symptoms' && (
                        <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('diet')}
                    className={`pb-2 px-1 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'diet' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Diet Plans
                    {activeTab === 'diet' && (
                        <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('skin')}
                    className={`pb-2 px-1 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'skin' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Skin Analysis
                    {activeTab === 'skin' && (
                        <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                </button>
            </div>

            {activeTab === 'symptoms' && (
                history.length === 0 ? (
                    <EmptyState message="No symptom scans yet." />
                ) : (
                    <div className="space-y-4">
                        {history.map((item, index) => (
                            <HistoryItem
                                key={item.id}
                                item={item}
                                index={index}
                                onDelete={() => handleDelete(item.id, 'symptoms')}
                                type="symptoms"
                            />
                        ))}
                    </div>
                )
            )}

            {activeTab === 'diet' && (
                dietHistory.length === 0 ? (
                    <EmptyState message="No diet plans generated yet." />
                ) : (
                    <div className="space-y-4">
                        {dietHistory.map((item, index) => (
                            <HistoryItem
                                key={item.id}
                                item={item}
                                index={index}
                                onDelete={() => handleDelete(item.id, 'diet')}
                                type="diet"
                            />
                        ))}
                    </div>
                )
            )}

            {activeTab === 'skin' && (
                skinHistory.length === 0 ? (
                    <EmptyState message="No skin analyses yet." />
                ) : (
                    <div className="space-y-4">
                        {skinHistory.map((item, index) => (
                            <HistoryItem
                                key={item.id}
                                item={item}
                                index={index}
                                onDelete={() => { }} // Not implemented
                                type="skin"
                            />
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

const EmptyState = ({ message }) => (
    <div className="text-center p-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">{message}</h3>
    </div>
);

const HistoryItem = ({ item, index, onDelete, type }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 group relative"
    >
        <button
            onClick={onDelete}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
            title="Delete Record"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        </button>

        {type === 'symptoms' ? (
            <div>
                <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {item.disease}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.date}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {item.symptoms.map((symptom, idx) => (
                        <span key={idx} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                            {symptom.replace(/_/g, ' ')}
                        </span>
                    ))}
                </div>
            </div>
        ) : type === 'diet' ? (
            <div>
                <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.goal.toUpperCase()}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.date}
                    </span>
                </div>
                <div className="mt-2">
                    <p className="text-sm font-medium text-gray-900">
                        {item.plan_data.calories} Calories
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                        P: {item.plan_data.macros.protein} • C: {item.plan_data.macros.carbs} • F: {item.plan_data.macros.fats}
                    </div>
                </div>
            </div>
        ) : (
            <div>
                <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {item.condition_name}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.date}
                    </span>
                </div>
                <div className="mt-2 flex items-center">
                    <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden mr-2">
                        <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{ width: `${item.probability}%` }}
                        ></div>
                    </div>
                    <span className="text-xs text-gray-500">{item.probability}% Confidence</span>
                </div>
            </div>
        )}
    </motion.div>
);

export default History;
