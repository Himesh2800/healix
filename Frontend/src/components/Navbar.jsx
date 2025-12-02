import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Activity, User, LogOut, Sun, Moon, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path
            ? 'text-primary font-bold'
            : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors';
    };

    return (
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-dark-lighter/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-gradient-to-tr from-primary to-accent p-2 rounded-lg transform group-hover:rotate-12 transition-transform duration-300">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            Healix
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={isActive('/')}>Home</Link>
                        {user && (
                            <>
                                <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
                                <Link to="/find-doctors" className={isActive('/find-doctors')}>Find Doctors</Link>
                                <Link to="/symptom-checker" className={isActive('/symptom-checker')}>Symptom Checker</Link>
                                <Link to="/skin-analysis" className={isActive('/skin-analysis')}>Skin Analysis</Link>
                                <Link to="/diet-plan" className={isActive('/diet-plan')}>Diet Plan</Link>
                                <Link to="/exercise-tracker" className={isActive('/exercise-tracker')}>Exercise Tracker</Link>
                            </>
                        )}
                        <Link to="/about" className={isActive('/about')}>About</Link>
                    </div>

                    {/* Desktop Auth Buttons & Theme Toggle */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-700 dark:text-gray-200 flex items-center">
                                    <User className="h-4 w-4 mr-2 text-primary" />
                                    {user.username}
                                </span>
                                <button
                                    onClick={logout}
                                    className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <LogOut className="h-4 w-4 mr-1" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium text-sm transition-colors">
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-gradient-to-r from-primary to-accent hover:from-teal-600 hover:to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-dark-lighter border-b border-gray-100 dark:border-gray-700 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-2">
                            <Link
                                to="/"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')}`}
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            {user && (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard')}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/find-doctors"
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/find-doctors')}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Find Doctors
                                    </Link>
                                    <Link
                                        to="/symptom-checker"
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/symptom-checker')}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Symptom Checker
                                    </Link>
                                    <Link
                                        to="/skin-analysis"
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/skin-analysis')}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Skin Analysis
                                    </Link>
                                    <Link
                                        to="/diet-plan"
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/diet-plan')}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Diet Plan
                                    </Link>
                                    <Link
                                        to="/exercise-tracker"
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/exercise-tracker')}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Exercise Tracker
                                    </Link>
                                </>
                            )}
                            <Link
                                to="/about"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about')}`}
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </Link>
                            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
                                {user ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center px-3 text-gray-700 dark:text-gray-200">
                                            <User className="h-5 w-5 mr-2 text-primary" />
                                            {user.username}
                                        </div>
                                        <button
                                            onClick={() => { logout(); setIsOpen(false); }}
                                            className="w-full text-left flex items-center px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                                        >
                                            <LogOut className="h-5 w-5 mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3 px-3">
                                        <Link
                                            to="/login"
                                            className="block w-full text-center text-gray-600 dark:text-gray-300 hover:text-primary font-medium py-2"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="block w-full text-center bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full font-medium shadow-md"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
