import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="bg-gradient-to-tr from-primary to-accent p-1.5 rounded-lg">
                                <Activity className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                                Healix
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Empowering you with AI-driven health insights for a better, healthier life.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li><Link to="/dashboard" className="text-gray-500 hover:text-primary text-sm transition-colors">Symptom Checker</Link></li>
                            <li><Link to="/about" className="text-gray-500 hover:text-primary text-sm transition-colors">About Us</Link></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors">Features</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors">Health Blog</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-100 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Healix. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
