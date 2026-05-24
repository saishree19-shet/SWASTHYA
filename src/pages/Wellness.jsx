import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Droplets, Wind, Sparkles, ChevronLeft, ChevronRight, Plus, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

export default function Wellness() {
  const { currentUser } = useAuth();
  const displayName = currentUser?.displayName 
    ? currentUser.displayName.split(' ')[0] 
    : 'Beautiful';

  const photoUrl = currentUser?.photoURL;

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
      <header className="app-header">
        <div className="header-title">
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="avatar" referrerPolicy="no-referrer" />
          ) : (
            <div className="avatar" style={{ background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <User size={20} />
            </div>
          )}
          Swasthya
        </div>
        <button className="icon-btn">
          <Bell size={24} />
        </button>
      </header>

      <div style={{ marginBottom: '24px' }}>
        <h1>Good morning, {displayName}</h1>
        <p style={{ color: 'var(--text-dark)', opacity: 0.8 }}>
          Take a moment for yourself today. Your body is in a peak recovery phase.
        </p>
      </div>

      {/* Hydration Tracker */}
      <div className="card-purple" style={{ padding: '24px', background: 'var(--primary-light)' }}>
        <div className="flex-between" style={{ marginBottom: '24px' }}>
          <div>
            <h3 style={{ color: 'var(--primary)', fontSize: '16px', marginBottom: '4px' }}>Hydration Tracker</h3>
            <p className="text-xs" style={{ color: 'var(--text-dark)' }}>1.2L / 2.5L Goal</p>
          </div>
          <Droplets size={24} color="var(--primary)" />
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', height: '100px', alignItems: 'flex-end', marginBottom: '24px' }}>
          {[1, 0.6, 0.4, 0.8, 0.7].map((fill, idx) => (
            <div key={idx} style={{ width: '40px', height: '100%', background: 'rgba(90, 79, 207, 0.2)', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${fill * 100}%`, background: idx === 0 ? 'var(--primary)' : 'rgba(90, 79, 207, 0.3)' }} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>+ 250ml</button>
          <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>History</button>
        </div>
      </div>

      {/* Stress Relief */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Wind size={20} color="var(--primary)" />
          <h3 style={{ color: 'var(--primary)', fontSize: '16px' }}>Stress Relief</h3>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-dark)', lineHeight: '1.6', marginBottom: '20px' }}>
          Your heart rate variability indicates a slight increase in stress. Let's take a 3-minute breath break.
        </p>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          <Wind size={18} /> Guided Breathing
        </button>
      </div>

      {/* Menstrual Wellness */}
      <div className="card" style={{ padding: '24px' }}>
        <div className="flex-between" style={{ marginBottom: '24px' }}>
          <h3 style={{ color: 'var(--primary)', fontSize: '16px' }}>Menstrual<br/>Wellness</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontWeight: 'bold' }}>
            <ChevronLeft size={16} />
            <span>October 2023</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Minimal Calendar Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontSize: '14px', marginBottom: '16px' }}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
            <div key={d} style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>{d}</div>
          ))}
          {[25, 26, 27, 28, 29, 30].map(d => (
            <div key={d} style={{ color: 'var(--text-muted)', padding: '8px 0' }}>{d}</div>
          ))}
          <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>1</div>
          {[2, 3, 4, 5, 6].map(d => (
            <div key={d} style={{ background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', position: 'relative' }}>
              {d}
              {d === 5 && <div style={{ position: 'absolute', bottom: '-4px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-dark)' }} />}
            </div>
          ))}
          {[7, 8].map(d => (
            <div key={d} style={{ padding: '8px 0' }}>{d}</div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: '600', color: 'var(--text-dark)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} /> Active Period
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#312E81' }} /> Ovulation
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      <div style={{ background: '#6359B1', borderRadius: '24px', padding: '24px', color: 'white', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>
          <Sparkles size={16} /> AI RECOMMENDATION
        </div>
        <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px' }}>Increase Magnesium</h3>
        <p style={{ fontSize: '13px', lineHeight: '1.5', opacity: 0.9 }}>
          Based on your luteal phase vitals, adding magnesium-rich foods like spinach or almonds could help reduce evening cramps.
        </p>
      </div>

      {/* Supplements */}
      <div style={{ background: 'var(--primary-light)', borderRadius: '24px', padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ color: 'var(--text-dark)' }}>
             <Wind size={20} />
          </div>
          <ChevronRight size={20} color="var(--text-dark)" />
        </div>
        <h3 style={{ fontSize: '14px', marginBottom: '4px' }}>Today's Supplement Routine</h3>
        <p className="text-xs" style={{ color: 'var(--text-light)', margin: 0 }}>Vitamin D, B12, Zinc</p>
        
        <button style={{ position: 'absolute', bottom: '-10px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)', cursor: 'pointer' }}>
          <Plus size={20} />
        </button>
      </div>

    </motion.div>
  );
}
