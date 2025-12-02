import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Users, Target, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-light dark:bg-dark font-sans transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-white dark:bg-dark pt-24 pb-16 overflow-hidden transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        className="text-center"
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                    >
                        <h2 className="text-base font-semibold text-primary tracking-wide uppercase">About Healix</h2>
                        <p className="mt-2 text-4xl font-extrabold text-dark dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                            Revolutionizing Healthcare <br className="hidden sm:block" /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Artificial Intelligence</span>
                        </p>
                        <p className="max-w-2xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
                            Healix combines advanced machine learning with medical knowledge to provide instant, accurate health assessments and personalized care plans.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative background */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full overflow-hidden -z-10 opacity-30">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-16 bg-slate-50 dark:bg-dark-lighter transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <motion.div
                            className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                To democratize healthcare access by providing everyone with an intelligent, reliable, and easy-to-use health assessment tool.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                                <Users className="h-6 w-6 text-secondary" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                Our system uses a vast database of symptoms and diseases to train sophisticated AI models, ensuring accurate predictions and relevant advice.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white dark:bg-dark-card rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                                <ShieldCheck className="h-6 w-6 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Privacy First</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                Your health data is sensitive. We prioritize your privacy and security, ensuring that your personal information is protected at all times.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white dark:bg-dark py-16 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-primary to-accent rounded-3xl shadow-2xl overflow-hidden">
                        <div className="px-6 py-12 sm:px-12 lg:py-16 lg:px-16 flex flex-col lg:flex-row items-center justify-between relative">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                    <span className="block">Ready to take control?</span>
                                    <span className="block text-teal-100">Start your health journey today.</span>
                                </h2>
                            </div>
                            <div className="mt-8 lg:mt-0 lg:ml-8 relative z-10">
                                <Link
                                    to="/dashboard"
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-primary bg-white hover:bg-gray-50 shadow-lg transition duration-300"
                                >
                                    Go to Dashboard
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>

                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
