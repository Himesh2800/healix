import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Activity, Flame, Clock, Calendar, TrendingUp, Dumbbell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExerciseTracker = () => {
    const [exerciseType, setExerciseType] = useState('');
    const [duration, setDuration] = useState('');
    const [history, setHistory] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHistory();
        fetchRecommendations();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch('http://localhost:5000/exercise/history', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setHistory(data.history);
            }
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    const fetchRecommendations = async () => {
        try {
            const response = await fetch('http://localhost:5000/exercise/recommendations', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setRecommendations(data.recommendations);
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    const handleLogExercise = async (e) => {
        e.preventDefault();
        if (!exerciseType || !duration) return;

        setLoading(true);
        // Simple calorie estimation: 5-10 calories per minute depending on intensity
        // For this demo, we'll use a random multiplier between 5 and 10
        const calories = Math.round(duration * (Math.random() * 5 + 5));

        try {
            const response = await fetch('http://localhost:5000/exercise', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    exercise_type: exerciseType,
                    duration_minutes: duration,
                    calories_burnt: calories
                }),
                credentials: 'include'
            });

            if (response.ok) {
                setExerciseType('');
                setDuration('');
                fetchHistory(); // Refresh history
            }
        } catch (error) {
            console.error("Error logging exercise:", error);
        } finally {
            setLoading(false);
        }
    };

    // Process data for chart - aggregate calories by date
    const chartData = history.reduce((acc, curr) => {
        const existing = acc.find(item => item.date === curr.date);
        if (existing) {
            existing.calories += curr.calories_burnt;
        } else {
            acc.push({ date: curr.date, calories: curr.calories_burnt });
        }
        return acc;
    }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="min-h-screen bg-light dark:bg-dark font-sans transition-colors duration-300">
            <Navbar />
            <div className="max-w-6xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Exercise Tracker</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Track your workouts and monitor your progress.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Log Exercise Form */}
                    <motion.div
                        className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 lg:col-span-1 border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center mb-6">
                            <div className="p-2 bg-primary/10 rounded-lg mr-3">
                                <Activity className="h-6 w-6 text-primary dark:text-primary-light" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Log Workout</h2>
                        </div>
                        <form onSubmit={handleLogExercise} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exercise Type</label>
                                <input
                                    type="text"
                                    value={exerciseType}
                                    onChange={(e) => setExerciseType(e.target.value)}
                                    placeholder="e.g., Running, Yoga"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-lighter text-gray-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (minutes)</label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    placeholder="30"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-lighter text-gray-900 dark:text-white"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center"
                            >
                                {loading ? 'Logging...' : 'Log Exercise'}
                            </button>
                        </form>

                        {/* Recommendations */}
                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-secondary/10 rounded-lg mr-3">
                                    <Dumbbell className="h-6 w-6 text-secondary" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommended</h2>
                            </div>
                            <ul className="space-y-3">
                                {recommendations.map((rec, index) => (
                                    <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                                        <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5 mr-2 flex-shrink-0"></div>
                                        {rec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Chart and History */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Chart */}
                        <motion.div
                            className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center mb-6">
                                <div className="p-2 bg-accent/10 rounded-lg mr-3">
                                    <TrendingUp className="h-6 w-6 text-accent" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Calorie Burn</h2>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                                        <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                                        <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#1F2937', color: '#F3F4F6' }}
                                            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                        />
                                        <Bar dataKey="calories" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Recent History List */}
                        <motion.div
                            className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center mb-6">
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
                                    <HistoryIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                            </div>
                            <div className="overflow-hidden">
                                {history.length > 0 ? (
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-dark-lighter">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Calories</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                                            {history.slice().reverse().slice(0, 5).map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.exercise_type}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.duration_minutes} min</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-bold flex items-center">
                                                        <Flame className="h-3 w-3 mr-1" />
                                                        {item.calories_burnt}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">No exercises logged yet.</p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper icon component since we can't import History from lucide-react as it conflicts with history state
const HistoryIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
    </svg>
);

export default ExerciseTracker;
