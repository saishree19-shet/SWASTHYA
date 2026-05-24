import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, Navigate } from 'react-router-dom';
import { Home, Activity, Leaf, Clock, User, MessageCircle, HeartPulse } from 'lucide-react';
import { HealthProvider } from './context/HealthContext';
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';

// Pages
import Dashboard from './pages/Dashboard';
import Monitor from './pages/Monitor';
import Wellness from './pages/Wellness';
import History from './pages/History';
import Profile from './pages/Profile';
import Emergency from './pages/Emergency';
import Doctors from './pages/Doctors';
import DoctorBooking from './pages/DoctorBooking';
import Community from './pages/Community';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
function App() {
  return (
    <AuthProvider>
      <HealthProvider>
        <Router>
        <div className="app-container">
          <main className="main-content">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/monitor" element={<PrivateRoute><Monitor /></PrivateRoute>} />
                <Route path="/wellness" element={<PrivateRoute><Wellness /></PrivateRoute>} />
                <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/emergency" element={<PrivateRoute><Emergency /></PrivateRoute>} />
                <Route path="/doctors" element={<PrivateRoute><Doctors /></PrivateRoute>} />
                <Route path="/doctors/:id" element={<PrivateRoute><DoctorBooking /></PrivateRoute>} />
                <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
                <Route path="/community/new" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </AnimatePresence>
          </main>

          {/* Floating SOS Button (Shows on main tabs except emergency) */}
          <Routes>
            <Route path="/" element={null} />
            <Route path="/chat" element={null} />
            <Route path="/emergency" element={null} />
            <Route path="/community/new" element={null} />
            <Route path="/community" element={null} />
            <Route path="/doctors/:id" element={null} />
            <Route path="/login" element={null} />
            <Route path="*" element={
              <Link to="/emergency" className="fab-sos">
                SOS
                <span>HELP</span>
              </Link>
            } />
          </Routes>

          {/* Bottom Navigation */}
          <Routes>
            <Route path="/" element={null} />
            <Route path="/chat" element={null} />
            <Route path="/login" element={null} />
            <Route path="/community" element={null} />
            <Route path="/doctors" element={null} />
            <Route path="/monitor" element={null} />
            <Route path="*" element={
              <nav className="bottom-nav">
                <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <Home size={20} />
                  <span>Home</span>
                </NavLink>
                <NavLink to="/monitor" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <Activity size={20} />
                  <span>Monitor</span>
                </NavLink>
                <NavLink to="/wellness" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <Leaf size={20} />
                  <span>Wellness</span>
                </NavLink>
                <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <Clock size={20} />
                  <span>History</span>
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <User size={20} />
                  <span>Profile</span>
                </NavLink>
              </nav>
            } />
          </Routes>
        </div>
        </Router>
      </HealthProvider>
    </AuthProvider>
  );
}

export default App;
