import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import SkinAnalysis from './pages/SkinAnalysis';
import DietPlan from './pages/DietPlan';
import ExerciseTracker from './pages/ExerciseTracker';
import SymptomChecker from './pages/SymptomChecker';
import DoctorFinder from './pages/DoctorFinder';
import PredictionResultPage from './pages/PredictionResultPage';
import Footer from './components/Footer';
import SOSButton from './components/SOSButton';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/skin-analysis"
                element={
                  <ProtectedRoute>
                    <SkinAnalysis />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/diet-plan"
                element={
                  <ProtectedRoute>
                    <DietPlan />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/result"
                element={
                  <ProtectedRoute>
                    <PredictionResultPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exercise-tracker"
                element={
                  <ProtectedRoute>
                    <ExerciseTracker />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/symptom-checker"
                element={
                  <ProtectedRoute>
                    <SymptomChecker />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/find-doctors"
                element={
                  <ProtectedRoute>
                    <DoctorFinder />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <SOSButton />
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider >
  );
}

export default App;
