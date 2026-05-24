import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Heart, Wind, Thermometer, ArrowRight, Activity, Zap } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { useAuth } from '../context/AuthContext';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 }
};

export default function Dashboard() {
  const { heartRate, spo2, temperature, history } = useHealth();
  const { currentUser } = useAuth();
  
  // Get first name or default to 'User'
  const displayName = currentUser?.displayName 
    ? currentUser.displayName.split(' ')[0] 
    : 'User';
    
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

      <div style={{ marginBottom: '24px' }}>
        <h1>Good morning, {displayName}</h1>
        <p>Your wellness data is looking balanced today.</p>
      </div>

      {/* Wellness Score Card */}
      <div className="card-purple" style={{ position: 'relative', overflow: 'hidden' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '18px' }}>Daily Wellness Score</h3>
        <p style={{ color: 'var(--text-dark)', marginBottom: '16px', fontSize: '13px', maxWidth: '70%' }}>
          You've reached 88% of your recovery goal. Your sleep quality was exceptional last night, contributing to higher cognitive readiness.
        </p>
        <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
          View Analysis <ArrowRight size={14} />
        </button>

        <div style={{ position: 'absolute', right: '10px', top: '50px' }}>
          <div className="circular-progress-container">
            <svg className="circular-progress-svg" viewBox="0 0 100 100">
              <circle className="circular-progress-bg" cx="50" cy="50" r="40" />
              <circle className="circular-progress-value" cx="50" cy="50" r="40" strokeDasharray="221.1 251.2" />
            </svg>
            <div className="circular-progress-text">
              <div className="num">88</div>
              <div className="lbl">SCORE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links for new features */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button 
          onClick={() => window.location.href = '/doctors'}
          style={{ flex: 1, background: 'white', border: '1px solid var(--primary-light)', padding: '12px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '13px', boxShadow: 'var(--shadow-sm)', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '20px' }}>🩺</span> Swasthya Connect
        </button>
        <button 
          onClick={() => window.location.href = '/community'}
          style={{ flex: 1, background: 'var(--primary-light)', border: 'none', padding: '12px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '20px' }}>💜</span> Her Circle
        </button>
      </div>

      {/* Metrics */}
      <div className="card">
        <div className="metric-row">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div className="metric-icon-box metric-icon-red">
                <Heart size={20} />
              </div>
              <span className="text-sm text-muted">Live</span>
            </div>
            <p className="text-xs">Heart Rate</p>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="metric-value">{heartRate}</span>
              <span className="metric-unit">BPM</span>
            </div>
          </div>
          <div style={{ width: '80px', height: '40px', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
            {[0.4, 0.8, 0.6, 1, 0.7, 0.5, 0.9].map((h, i) => (
              <div key={i} style={{ width: '8px', height: `${h*100}%`, background: 'var(--danger-light)', borderRadius: '4px' }} />
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="metric-row">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div className="metric-icon-box metric-icon-blue">
                <Wind size={20} />
              </div>
              <span className="text-sm text-muted">Stable</span>
            </div>
            <p className="text-xs">Blood Oxygen</p>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="metric-value">{spo2}</span>
              <span className="metric-unit">%</span>
            </div>
          </div>
        </div>
        <div className="progress-bg">
          <div className="progress-fill" style={{ width: `${spo2}%`, background: 'var(--text-dark)' }} />
        </div>
      </div>

      <div className="card">
        <div className="metric-row">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div className="metric-icon-box metric-icon-purple">
                <Thermometer size={20} />
              </div>
              <span className="text-sm text-muted">Normal</span>
            </div>
            <p className="text-xs">Body Temperature</p>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="metric-value">{temperature}</span>
              <span className="metric-unit">°C</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <span className="text-xs text-muted">35.5</span>
          <div className="progress-bg" style={{ margin: 0, flex: 1, position: 'relative' }}>
            <div style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', top: '-1px', left: `${((temperature-35.5)/(37.5-35.5))*100}%` }} />
          </div>
          <span className="text-xs text-muted">37.5</span>
        </div>
      </div>

      {/* Health Insights Chart */}
      <motion.div 
        className="card"
        whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(90, 79, 207, 0.08)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Activity size={20} color="var(--primary)" />
            </motion.div>
            <h3 style={{ margin: 0 }}>Health Insights</h3>
            <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' }}>Weekly</span>
          </div>
          <span style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>•••</span>
        </div>
        
        <div style={{ height: '140px', width: '100%', position: 'relative', marginBottom: '24px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5A4FCF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#5A4FCF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-sm)' }}
                itemStyle={{ color: '#5A4FCF', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="heartRate" 
                stroke="#5A4FCF" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorVal)" 
                activeDot={{ r: 6, fill: "#5A4FCF", stroke: "#fff", strokeWidth: 2 }} 
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>
          
          <motion.div 
            style={{ position: 'absolute', top: '10%', left: '30%', background: 'var(--white)', padding: '6px 12px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid var(--primary-light)', fontSize: '10px', color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              style={{ width: '6px', height: '6px', background: 'var(--primary)', display: 'inline-block', borderRadius: '50%', marginRight: '6px' }} 
              animate={{ opacity: [1, 0.4, 1], scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Peak Performance Zone
          </motion.div>
        </div>

        <motion.div 
          style={{ background: '#F8F9FA', padding: '16px', borderRadius: '12px', marginBottom: '8px', display: 'flex', gap: '12px', cursor: 'pointer' }}
          whileHover={{ scale: 1.02, backgroundColor: "var(--primary-light)" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div style={{ color: 'var(--primary)', marginTop: '2px' }}><Activity size={16} /></div>
          <p className="text-xs text-dark" style={{ margin: 0 }}>Your resting heart rate is 5% lower than your 30-day average, indicating improved cardiovascular health.</p>
        </motion.div>

        <motion.div 
          style={{ background: '#F8F9FA', padding: '16px', borderRadius: '12px', display: 'flex', gap: '12px', cursor: 'pointer' }}
          whileHover={{ scale: 1.02, backgroundColor: "var(--primary-light)" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div style={{ color: 'var(--primary)', marginTop: '2px' }}><Zap size={16} /></div>
          <p className="text-xs text-dark" style={{ margin: 0 }}>Optimal time for light yoga today is between 4 PM and 6 PM based on your energy rhythms.</p>
        </motion.div>
      </motion.div>

    </motion.div>
  );
}
