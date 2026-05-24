import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Edit2, Contact, PlusCircle, User, Network, Palette, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const displayName = currentUser?.displayName || 'Sarah Jenkins';
  const photoUrl = currentUser?.photoURL || 'https://i.pravatar.cc/150?img=5';

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Header */}
      <header className="app-header" style={{ width: '100%', justifyContent: 'flex-end', marginBottom: '0' }}>
        <button className="icon-btn">
          <Bell size={24} />
        </button>
      </header>

      {/* Profile Info */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <img src={photoUrl} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid white', boxShadow: 'var(--shadow-sm)', objectFit: 'cover' }} referrerPolicy="no-referrer" />
        <div style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
          <Edit2 size={12} />
        </div>
      </div>
      
      <h1 style={{ fontSize: '24px', marginBottom: '4px' }}>{displayName}</h1>
      <p className="text-sm" style={{ color: 'var(--text-dark)', opacity: 0.8, marginBottom: '32px' }}>{currentUser?.email || 'Premium Member since 2023'}</p>

      {/* App Settings */}
      <div className="card" style={{ width: '100%', padding: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '24px' }}>
          <Shield size={16} /> APP SETTINGS
        </div>

        <div className="flex-between" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dark)' }}>
              <Bell size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '14px', color: 'var(--text-dark)' }}>Smart Notifications</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-light)', margin: 0 }}>AI-driven cycle reminders</p>
            </div>
          </div>
          {/* Toggle Switch ON */}
          <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: 'var(--primary)', position: 'relative' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', right: '2px', top: '2px' }} />
          </div>
        </div>

        <div className="flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dark)' }}>
              <User size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '14px', color: 'var(--text-dark)' }}>Biometric Login</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-light)', margin: 0 }}>FaceID or Fingerprint</p>
            </div>
          </div>
          {/* Toggle Switch ON */}
          <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: 'var(--primary)', position: 'relative' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', right: '2px', top: '2px' }} />
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="card" style={{ width: '100%', padding: '24px', marginBottom: '16px' }}>
        <div className="flex-between" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>
            <Contact size={16} /> EMERGENCY CONTACTS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontSize: '12px', fontWeight: '600' }}>
            <PlusCircle size={14} /> Add New
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: '#F8F9FA', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--danger-light)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--text-dark)' }}>Dr. Elena Ross</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-dark)', opacity: 0.8, margin: 0 }}>Primary Gynecologist</p>
              </div>
            </div>
            <ChevronRight size={16} color="var(--text-light)" />
          </div>

          <div style={{ background: '#F8F9FA', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Network size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--text-dark)' }}>Mark Jenkins</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-dark)', opacity: 0.8, margin: 0 }}>Spouse • Emergency SOS</p>
              </div>
            </div>
            <ChevronRight size={16} color="var(--text-light)" />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="card" style={{ width: '100%', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '24px' }}>
          <Palette size={16} /> APPEARANCE
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, background: 'var(--primary)', color: 'white', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Sun size={24} />
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Light</span>
          </div>
          <div style={{ flex: 1, background: '#F4F4F5', color: 'var(--text-dark)', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Moon size={24} />
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Dark</span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button onClick={handleLogout} style={{ width: '100%', background: 'var(--danger-light)', color: 'var(--danger)', border: 'none', padding: '16px', borderRadius: '24px', fontSize: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '40px', cursor: 'pointer' }}>
        <LogOut size={20} /> Logout Account
      </button>

      {/* Footer */}
      <div style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '12px', marginBottom: '40px', lineHeight: '1.6' }}>
        Swasthya Version 2.4.0 (Build 992)<br/>
        Privacy Policy • Terms of Service
      </div>

    </motion.div>
  );
}

// Just an inline ChevronRight for simple usage since we only need it twice here
function ChevronRight({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
