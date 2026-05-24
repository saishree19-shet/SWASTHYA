import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, MapPin, MessageSquare, Phone, ShieldAlert, Sparkles } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { useAuth } from '../context/AuthContext';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 }
};

export default function Emergency() {
  const [isHolding, setIsHolding] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default SF
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const { triggerSOS } = useHealth();
  const { currentUser } = useAuth();
  
  React.useEffect(() => {
    let timer;
    if (isHolding) {
      timer = setTimeout(() => {
        triggerSOS();
        setIsHolding(false);
      }, 3000); // 3 seconds hold to trigger
    }
    return () => clearTimeout(timer);
  }, [isHolding, triggerSOS]);

  const photoUrl = currentUser?.photoURL || 'https://i.pravatar.cc/100?img=5';

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
      <header className="app-header">
        <div className="header-title">
          <img src={photoUrl} alt="Profile" className="avatar" referrerPolicy="no-referrer" />
          Swasthya
        </div>
        <button className="icon-btn">
          <Bell size={24} />
        </button>
      </header>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '8px' }}>Emergency Assistance</h1>
        <p style={{ color: 'var(--text-dark)' }}>
          Press the button below for 3 seconds to alert your emergency contacts and local services.
        </p>
      </div>

      {/* Massive SOS Button */}
      <div className="emergency-btn-wrapper">
        <motion.div 
          className="emergency-pulse-1" 
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
        />
        <motion.div 
          className="emergency-pulse-2" 
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0, 0.8] }} 
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} 
        />
        <button 
          className="emergency-btn"
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onMouseLeave={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          style={{ transform: isHolding ? 'scale(0.95)' : 'scale(1)' }}
        >
          <span style={{ fontSize: '36px' }}>SOS</span>
          <span style={{ fontSize: '20px', marginTop: '8px' }}>SOS</span>
        </button>
      </div>
      <div style={{ textAlign: 'center', color: 'var(--danger)', fontWeight: '700', fontSize: '12px', marginTop: '-16px', marginBottom: '32px' }}>
        HOLD TO TRIGGER
      </div>

      {/* Map & Location */}
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <div className="flex-between" style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--text-dark)' }}>
            <MapPin size={18} color="var(--primary)" /> Live Location Sharing
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-dark)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--danger)' }} /> Active
          </div>
        </div>
        
        <div style={{ 
          width: '100%', height: '160px', borderRadius: '16px', 
          background: 'linear-gradient(45deg, #A8B2BD, #C2C8D1)', 
          position: 'relative', overflow: 'hidden'
        }}>
          {/* Live Google Map */}
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={currentLocation}
              zoom={14}
              options={{ disableDefaultUI: true, gestureHandling: 'none' }}
            >
              <Marker position={currentLocation} />
            </GoogleMap>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}>
               <MapPin size={48} color="var(--primary)" fill="var(--primary-light)" />
            </div>
          )}
          
          <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'var(--white)', padding: '16px', display: 'flex', flexDirection: 'column' }}>
             <p className="text-xs" style={{ margin: 0, opacity: 0.8 }}>Current Location</p>
             <p className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>Live GPS Location Active</p>
          </div>

          <button style={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: '#E5E7EB', border: 'none', padding: '10px 20px', borderRadius: '20px',
            fontWeight: '600', color: 'var(--text-dark)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer'
          }}>
            CANCEL EMERGENCY
          </button>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="flex-between" style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '16px' }}>Emergency Contacts</h2>
        <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '14px' }}>Edit</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <ContactCard initials="MK" name="Mark Kovalski" relation="Husband" />
        <ContactCard initials="SA" name="Sarah Adams" relation="Sister" />
        
        {/* 911 Card */}
        <div style={{ background: 'var(--danger-light)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(211, 47, 47, 0.2)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)' }}>
            <ShieldAlert size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: 'var(--danger)', fontSize: '14px' }}>Local Emergency (911)</h3>
            <p style={{ fontSize: '12px', color: 'var(--danger)', opacity: 0.8, margin: 0 }}>Police, Medical, Fire</p>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)' }}>
            <Phone size={20} />
          </div>
        </div>
      </div>

      {/* Safety Tip */}
      <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '16px', marginTop: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', flexShrink: 0 }}>
          <Sparkles size={16} />
        </div>
        <div>
          <h3 style={{ fontSize: '12px', marginBottom: '4px' }}>Swasthya Safety Tip</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-dark)', lineHeight: '1.5', margin: 0 }}>
            I've shared your medical ID including your blood type and allergies with local responders to ensure they are prepared.
          </p>
        </div>
      </div>

    </motion.div>
  );
}

function ContactCard({ initials, name, relation }) {
  return (
    <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
        {initials}
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '14px', margin: 0 }}>{name}</h3>
        <p style={{ fontSize: '12px', margin: 0 }}>{relation}</p>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MessageSquare size={16} />
        </div>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Phone size={16} />
        </div>
      </div>
    </div>
  );
}
