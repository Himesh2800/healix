import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Utensils, Activity, ChevronRight, Loader2, CheckCircle } from 'lucide-react';

const DietPlan = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        activity: 'moderate',
        goal: 'maintain',
        preference: 'veg'
    });
    const [plan, setPlan] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/generate-diet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to generate plan');

            const data = await response.json();
            setPlan(data);
            setStep(2);
        } catch (error) {
            console.error("Error generating diet plan:", error);
            alert("Failed to generate diet plan. Please try again.");
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
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Personalized Diet Planner</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Get a custom meal plan tailored to your body and health goals.</p>
                </motion.div>

                {step === 1 && (
                    <motion.div
                        className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        required
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white dark:bg-dark-lighter text-gray-900 dark:text-white"
                                        placeholder="Years"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white dark:bg-dark-lighter text-gray-900 dark:text-white"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        required
                                        value={formData.weight}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white dark:bg-dark-lighter text-gray-900 dark:text-white"
                                        placeholder="kg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        required
                                        value={formData.height}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white dark:bg-dark-lighter text-gray-900 dark:text-white"
                                        placeholder="cm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Activity Level</label>
                                    <select
                                        name="activity"
                                        value={formData.activity}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white dark:bg-dark-lighter text-gray-900 dark:text-white"
                                    >
                                        <option value="sedentary">Sedentary (Little or no exercise)</option>
                                        <option value="light">Lightly Active (1-3 days/week)</option>
                                        <option value="moderate">Moderately Active (3-5 days/week)</option>
                                        <option value="active">Active (6-7 days/week)</option>
                                        <option value="very_active">Very Active (Physical job/training)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal</label>
                                    <select
                                        name="goal"
                                        value={formData.goal}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white dark:bg-dark-lighter text-gray-900 dark:text-white"
                                    >
                                        <option value="lose">Weight Loss</option>
                                        <option value="maintain">Maintain Weight</option>
                                        <option value="gain">Muscle Gain</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dietary Preference</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['veg', 'non-veg', 'vegan'].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, preference: type })}
                                                className={`py-3 px-4 rounded-xl border-2 font-medium capitalize transition-all ${formData.preference === type
                                                    ? 'border-primary bg-primary/10 text-primary'
                                                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                                                    }`}
                                            >
                                                {type === 'non-veg' ? 'Non-Veg' : type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-accent hover:from-teal-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                        Generating Plan...
                                    </>
                                ) : (
                                    <>
                                        Generate My Diet Plan
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                )}

                {step === 2 && plan && (
                    <motion.div
                        className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Custom Plan</h2>
                                <p className="text-gray-500 dark:text-gray-400">Based on your goal to <span className="font-semibold text-primary capitalize">{formData.goal === 'lose' ? 'Lose Weight' : formData.goal === 'gain' ? 'Gain Muscle' : 'Maintain Weight'}</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Daily Target</p>
                                <p className="text-3xl font-bold text-primary">{plan.calories} <span className="text-base font-normal text-gray-500 dark:text-gray-400">kcal</span></p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                                <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">Protein</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">{plan.macros.protein}</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
                                <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-1">Carbs</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">{plan.macros.carbs}</p>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl text-center">
                                <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold mb-1">Fats</p>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">{plan.macros.fats}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: 'Breakfast', meal: plan.breakfast, color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' },
                                { label: 'Lunch', meal: plan.lunch, color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' },
                                { label: 'Snack', meal: plan.snack, color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400' },
                                { label: 'Dinner', meal: plan.dinner, color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400' }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                                    <div className={`w-24 py-1 rounded-full text-xs font-bold text-center uppercase tracking-wide mr-4 ${item.color}`}>
                                        {item.label}
                                    </div>
                                    <p className="text-lg font-medium text-gray-800 dark:text-white">{item.meal}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setStep(1)}
                            className="mt-8 w-full border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold py-3 px-6 rounded-xl hover:border-primary hover:text-primary dark:hover:text-primary transition-colors"
                        >
                            Recalculate
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default DietPlan;
