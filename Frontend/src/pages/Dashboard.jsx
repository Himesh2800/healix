import React, { useState, useEffect } from 'react';
import History from '../components/History';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Activity, User, Save, Edit2, Droplet, Ruler, Weight, Phone, Plus, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState({
        age: '',
        gender: '',
        height: '',
        weight: '',
        blood_type: '',
        allergies: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Contacts state
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });
    const [showAddContact, setShowAddContact] = useState(false);

    useEffect(() => {
        fetchProfile();
        fetchContacts();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/profile', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                if (data.age) setProfile(data);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchContacts = async () => {
        try {
            const response = await fetch('http://localhost:5000/contacts', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setContacts(data.contacts);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleSaveProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile),
                credentials: 'include'
            });
            if (response.ok) {
                setIsEditing(false);
                alert("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile.");
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleAddContact = async () => {
        if (!newContact.name || !newContact.phone) {
            alert("Name and Phone are required");
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newContact),
                credentials: 'include'
            });
            if (response.ok) {
                fetchContacts();
                setNewContact({ name: '', phone: '', email: '' });
                setShowAddContact(false);
            }
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    const handleDeleteContact = async (id) => {
        if (!window.confirm("Delete this contact?")) return;
        try {
            const response = await fetch(`http://localhost:5000/contacts/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setContacts(contacts.filter(c => c.id !== id));
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div className="min-h-screen bg-light dark:bg-dark font-sans transition-colors duration-300">
            <Navbar />

            <div className="max-w-6xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <motion.header
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Welcome back, {user?.username}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Manage your personal health information and view your history.
                    </p>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Personal Information Card */}
                    <motion.div
                        className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 lg:col-span-1 h-fit border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-primary/10 rounded-full mr-4">
                                    <User className="h-6 w-6 text-primary dark:text-primary-light" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Info</h2>
                            </div>
                            <button
                                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                                className={`p-2 rounded-full transition-colors ${isEditing ? 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}
                            >
                                {isEditing ? <Save className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Age</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        name="age"
                                        value={profile.age}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-dark-lighter dark:border-gray-600 dark:text-white"
                                    />
                                ) : (
                                    <p className="text-gray-900 dark:text-white font-medium">{profile.age || 'Not set'}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Gender</label>
                                {isEditing ? (
                                    <select
                                        name="gender"
                                        value={profile.gender}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-dark-lighter dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    <p className="text-gray-900 dark:text-white font-medium">{profile.gender || 'Not set'}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                                        <Ruler className="h-3 w-3 mr-1" /> Height (cm)
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="height"
                                            value={profile.height}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-dark-lighter dark:border-gray-600 dark:text-white"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white font-medium">{profile.height || 'Not set'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                                        <Weight className="h-3 w-3 mr-1" /> Weight (kg)
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="weight"
                                            value={profile.weight}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-dark-lighter dark:border-gray-600 dark:text-white"
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white font-medium">{profile.weight || 'Not set'}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                                    <Droplet className="h-3 w-3 mr-1" /> Blood Type
                                </label>
                                {isEditing ? (
                                    <select
                                        name="blood_type"
                                        value={profile.blood_type}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-dark-lighter dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="">Select</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                ) : (
                                    <p className="text-gray-900 dark:text-white font-medium">{profile.blood_type || 'Not set'}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Allergies</label>
                                {isEditing ? (
                                    <textarea
                                        name="allergies"
                                        value={profile.allergies}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-dark-lighter dark:border-gray-600 dark:text-white"
                                        rows="2"
                                    />
                                ) : (
                                    <p className="text-gray-900 dark:text-white font-medium">{profile.allergies || 'None'}</p>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Emergency Contacts Card */}
                    <motion.div
                        className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 lg:col-span-1 h-fit border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-3">
                                    <Phone className="h-6 w-6 text-red-600 dark:text-red-400" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Emergency Contacts</h2>
                            </div>
                            <button
                                onClick={() => setShowAddContact(!showAddContact)}
                                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                <Plus className={`h-5 w-5 transition-transform ${showAddContact ? 'rotate-45' : ''}`} />
                            </button>
                        </div>

                        {showAddContact && (
                            <div className="mb-6 p-4 bg-gray-50 dark:bg-dark-lighter rounded-xl border border-gray-100 dark:border-gray-700">
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={newContact.name}
                                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-dark-card dark:border-gray-600 dark:text-white"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        value={newContact.phone}
                                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-dark-card dark:border-gray-600 dark:text-white"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email (Optional)"
                                        value={newContact.email}
                                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-dark-card dark:border-gray-600 dark:text-white"
                                    />
                                    <button
                                        onClick={handleAddContact}
                                        className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                                    >
                                        Add Contact
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            {contacts.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">No contacts added.</p>
                            ) : (
                                contacts.map(contact => (
                                    <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark-lighter rounded-lg border border-gray-100 dark:border-gray-700">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{contact.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{contact.phone}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteContact(contact.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>

                    {/* History Section */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center mb-6">
                                <div className="p-2 bg-accent/10 rounded-lg mr-3">
                                    <Activity className="h-6 w-6 text-accent" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Health History</h2>
                            </div>
                            <History />
                        </div>
                    </motion.div>
                </div>
            </div >
        </div >
    );
};

export default Dashboard;
