import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Sparkles, Flame, Info, ChevronRight, Moon, Heart, Zap } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

export default function History() {
  const [activeTab, setActiveTab] = useState('Week');

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
      <header className="app-header">
        <div className="header-title">
          <img src="https://i.pravatar.cc/100?img=5" alt="Profile" className="avatar" />
          Swasthya
        </div>
        <button className="icon-btn">
          <Bell size={24} />
        </button>
      </header>

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>Health History</h1>
        <p style={{ color: 'var(--text-dark)', fontSize: '13px' }}>
          Track your biological rhythms and wellness trends.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', background: '#F4F4F5', padding: '4px', borderRadius: '24px', width: 'fit-content', marginBottom: '24px' }}>
        {['Day', 'Week', 'Month'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 24px',
              borderRadius: '20px',
              border: 'none',
              background: activeTab === tab ? 'var(--primary)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text-dark)',
              fontWeight: activeTab === tab ? '600' : '400',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Heart Rate Area Chart */}
      <div className="card" style={{ padding: '24px' }}>
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <div>
            <h3 style={{ color: 'var(--primary)', fontSize: '16px' }}>Heart Rate</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span className="text-xs text-dark">Avg: 72 BPM</span>
              <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' }}>STABLE</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-dark)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} /> Resting
          </div>
        </div>

        {/* Custom SVG Area Chart to perfectly match screenshot black wave */}
        <div style={{ height: '80px', width: '100%', marginBottom: '16px', position: 'relative' }}>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,40 L0,20 Q10,25 20,20 T40,25 T60,5 T80,35 T100,5 L100,40 Z" fill="#000000" />
            <path d="M0,20 Q10,25 20,20 T40,25 T60,5 T80,35 T100,5" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="flex-between" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
        </div>
      </div>

      {/* AI Insight */}
      <div className="card" style={{ background: '#6359B1', padding: '24px', color: 'white' }}>
        <Sparkles size={24} style={{ marginBottom: '16px' }} />
        <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '8px' }}>AI Insight</h3>
        <p style={{ fontSize: '12px', lineHeight: '1.6', opacity: 0.9 }}>
          Your recovery score improved by 12% this week. Increased REM sleep on Wed-Thu correlates with your lower stress scores.
        </p>
      </div>

      {/* Active Calories */}
      <div className="card" style={{ background: '#EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="text-xs" style={{ color: 'var(--text-dark)', marginBottom: '4px' }}>Active Calories</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-dark)' }}>12,450</span>
            <span className="text-xs" style={{ color: 'var(--text-dark)' }}>kcal</span>
          </div>
        </div>
        <Flame size={24} color="var(--primary)" />
      </div>

      {/* Stress Levels */}
      <div className="card" style={{ padding: '24px' }}>
        <div className="flex-between" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--text-dark)' }}>Stress Levels</h3>
          <Info size={16} color="var(--text-muted)" />
        </div>
        
        <div style={{ height: '60px', width: '100%', marginBottom: '16px' }}>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,35 Q20,30 40,15 T80,10 T100,5" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="2,2" />
          </svg>
        </div>
        
        <div className="flex-between" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          <span>Morning</span><span>Noon</span><span>Evening</span><span>Night</span>
        </div>
      </div>

      {/* Sleep Quality Bar Chart */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--text-dark)', marginBottom: '24px' }}>Sleep Quality</h3>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '100px', marginBottom: '16px' }}>
          {[0.5, 0.7, 0.4, 0.8, 0.9, 0.4, 0.7].map((h, i) => (
            <div key={i} style={{ width: '12%', height: `${h*100}%`, background: h > 0.7 ? 'var(--primary)' : 'var(--primary-light)', borderRadius: '8px 8px 0 0' }} />
          ))}
        </div>
        
        <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-dark)' }}>
          Average: 7h 42m
        </div>
      </div>

      {/* Daily Summaries */}
      <h3 style={{ fontSize: '18px', color: 'var(--text-dark)', margin: '24px 0 16px 0' }}>Daily Summaries</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <SummaryCard 
          date="24" month="OCT" 
          title="Peak Performance Day" 
          desc="High heart rate variability and deep sleep cycle detected." 
          metrics={[{icon: Moon, val: "8h 12m"}, {icon: Heart, val: "68 BPM"}, {icon: Zap, val: "90/100"}]}
        />
        <SummaryCard 
          date="23" month="OCT" 
          title="Recovery Focus" 
          desc="Low activity levels. Body temperature slightly elevated (+0.2°C)." 
          metrics={[{icon: Moon, val: "9h 03m"}, {icon: Heart, val: "74 BPM"}, {icon: Zap, val: "42/100"}]}
        />
      </div>
      
    </motion.div>
  );
}

function SummaryCard({ date, month, title, desc, metrics }) {
  return (
    <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justify: 'center', flexShrink: 0, paddingTop: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 'bold' }}>{month}</span>
        <span style={{ fontSize: '20px', fontWeight: '800', lineHeight: 1 }}>{date}</span>
      </div>
      
      <div style={{ flex: 1 }}>
        <h4 style={{ color: 'var(--text-dark)', fontSize: '14px', marginBottom: '4px' }}>{title}</h4>
        <p className="text-xs" style={{ color: 'var(--text-dark)', marginBottom: '12px', opacity: 0.8 }}>{desc}</p>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: 'var(--primary)' }}>
              <m.icon size={14} />
              <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--text-dark)' }}>{m.val}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={14} color="var(--text-light)" />
          </div>
        </div>
      </div>
    </div>
  );
}
