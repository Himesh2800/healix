import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Activity, Heart, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-light dark:bg-dark font-sans transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <div className="relative overflow-hidden pt-20 pb-16 sm:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                        <motion.div
                            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 mb-6">
                                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                                <span className="text-sm font-medium text-primary dark:text-teal-400">AI-Powered Health Analysis</span>
                            </div>
                            <h1 className="text-4xl tracking-tight font-extrabold text-dark dark:text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                                <span className="block">Your Personal</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Health Companion</span>
                            </h1>
                            <p className="mt-4 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Healix uses advanced AI to analyze your symptoms and provide instant health insights, home remedies, and exercise recommendations.
                            </p>
                            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                                <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                                    <Link
                                        to="/symptom-checker"
                                        className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-primary to-accent hover:from-teal-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                    >
                                        Check Symptoms
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="flex items-center justify-center px-8 py-3 border border-gray-200 dark:border-gray-700 text-base font-medium rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-all duration-300"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                                <div className="relative block w-full bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
                                    <div className="p-8">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center space-x-2">
                                                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                            </div>
                                            <div className="text-xs text-gray-400 font-mono">Analysis Complete</div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                                                <Activity className="h-6 w-6 text-primary mr-3" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">Symptom Analysis</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">Processing inputs...</div>
                                                </div>
                                                <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                                            </div>
                                            <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <Heart className="h-6 w-6 text-secondary mr-3" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">Health Prediction</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">Generating report...</div>
                                                </div>
                                                <CheckCircle className="h-5 w-5 text-secondary ml-auto" />
                                            </div>
                                            <div className="flex items-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                                                <Shield className="h-6 w-6 text-accent mr-3" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">Remedies & Tips</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">Personalized care plan</div>
                                                </div>
                                                <CheckCircle className="h-5 w-5 text-accent ml-auto" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl animate-float"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-secondary/10 dark:bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white dark:bg-dark-lighter transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Why Healix?</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold text-dark dark:text-white sm:text-4xl">
                            Comprehensive Health Insights
                        </p>
                        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                            We combine medical knowledge with cutting-edge technology to help you make informed decisions about your health.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                title: 'AI Prediction',
                                description: 'Our advanced algorithms analyze your symptoms to identify potential health conditions with high accuracy.',
                                icon: <Activity className="h-8 w-8 text-white" />,
                                color: 'bg-primary'
                            },
                            {
                                title: 'Home Remedies',
                                description: 'Access a curated library of natural remedies to help alleviate symptoms and promote recovery.',
                                icon: <Heart className="h-8 w-8 text-white" />,
                                color: 'bg-secondary'
                            },
                            {
                                title: 'Exercise Plans',
                                description: 'Get personalized exercise recommendations tailored to your condition and recovery needs.',
                                icon: <Shield className="h-8 w-8 text-white" />,
                                color: 'bg-accent'
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                className="relative group bg-white dark:bg-dark-card p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                            >
                                <div className={`absolute top-0 right-0 -mr-3 -mt-3 w-24 h-24 rounded-full ${feature.color} opacity-10 group-hover:scale-150 transition-transform duration-500`}></div>
                                <div className={`inline-flex items-center justify-center p-3 rounded-xl ${feature.color} shadow-lg mb-6 relative z-10`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">{feature.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 relative z-10">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-20 bg-slate-50 dark:bg-dark transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            How It Works
                        </h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                            Three simple steps to better health understanding.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700 hidden md:block"></div>
                        </div>
                        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
                            {[
                                { step: '01', title: 'Enter Symptoms', desc: 'Select your symptoms from our comprehensive list.' },
                                { step: '02', title: 'Get Analysis', desc: 'Our AI processes your data to identify potential issues.' },
                                { step: '03', title: 'Start Recovery', desc: 'Follow personalized remedies and exercises.' }
                            ].map((item, index) => (
                                <div key={index} className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-md text-center relative z-10 border border-gray-100 dark:border-gray-700">
                                    <div className="w-12 h-12 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
