import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ArrowLeft, Sparkles, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookAppointment } from '../services/doctorService';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

export default function DoctorBooking() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState(13);
  const [selectedTime, setSelectedTime] = useState('09:30 AM');
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = async () => {
    if (!currentUser) {
      alert("Please login to book an appointment.");
      return;
    }
    setIsBooking(true);
    try {
      const formattedDate = `May ${selectedDate}, 2024`;
      await bookAppointment(currentUser.uid, 'doc_sarah_jenkins', formattedDate, selectedTime);
      alert('Appointment Confirmed!');
      navigate('/');
    } catch (error) {
      alert('Failed to book appointment. Please try again.');
    }
    setIsBooking(false);
  };

  const dates = [
    { day: 'Mon', num: 12 },
    { day: 'Tue', num: 13 },
    { day: 'Wed', num: 14 },
    { day: 'Thu', num: 15 },
    { day: 'Fri', num: 16 }
  ];

  const times = {
    Morning: ['09:00 AM', '09:30 AM', '10:00 AM'],
    Afternoon: ['01:00 PM', '02:30 PM', '03:00 PM'],
    Evening: ['05:00 PM', '06:30 PM', '07:00 PM']
  };

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} style={{ paddingBottom: '120px' }}>
      
      <header className="app-header" style={{ marginBottom: '24px' }}>
        <div className="header-title" style={{ fontSize: '18px', gap: '16px' }}>
          <ArrowLeft size={24} onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
          Swasthya
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Bell size={20} color="var(--primary)" />
          <img src="https://i.pravatar.cc/100?img=5" alt="Profile" className="avatar" style={{ width: '32px', height: '32px' }} />
        </div>
      </header>

      {/* Doctor Info Card */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
        <img src="https://i.pravatar.cc/150?img=1" alt="Dr Sarah" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--primary-light)', marginBottom: '16px', objectFit: 'cover' }} />
        
        <div className="flex-between" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>Dr. Sarah Jenkins</h2>
            <p style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: '600', margin: 0 }}>Senior Reproductive Endocrinologist</p>
          </div>
          <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px' }}>☆ 4.9</span>
        </div>
        
        <p style={{ fontSize: '13px', color: 'var(--text-dark)', lineHeight: '1.6', marginBottom: '24px' }}>
          Specializing in holistic hormonal health and fertility with over 12 years of clinical excellence.
        </p>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '4px' }}>PATIENTS</p>
            <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>2.4k+</p>
          </div>
          <div>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '4px' }}>EXPERIENCE</p>
            <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>12 Yrs</p>
          </div>
          <div>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '4px' }}>REVIEWS</p>
            <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>850</p>
          </div>
        </div>
      </div>

      {/* Select Date */}
      <div className="flex-between" style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px' }}>Select Date</h3>
        <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: '600' }}>May 2024 <ChevronDown size={14} style={{ verticalAlign: 'middle' }}/></span>
      </div>

      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', marginBottom: '32px', paddingBottom: '8px', scrollbarWidth: 'none' }}>
        {dates.map((d) => (
          <button 
            key={d.num}
            onClick={() => setSelectedDate(d.num)}
            style={{ 
              flexShrink: 0, width: '60px', height: '80px', borderRadius: '30px', border: '1px solid var(--primary)', 
              background: selectedDate === d.num ? 'var(--primary)' : 'white',
              color: selectedDate === d.num ? 'white' : 'var(--text-dark)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: selectedDate === d.num ? 'var(--shadow-md)' : 'none'
            }}
          >
            <span style={{ fontSize: '12px', opacity: 0.8 }}>{d.day}</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{d.num}</span>
          </button>
        ))}
      </div>

      {/* Available Time */}
      <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Available Time</h3>
      
      {Object.entries(times).map(([period, slots]) => (
        <div key={period} style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>{period === 'Morning' ? '☀' : period === 'Afternoon' ? '☼' : '☾'}</span> {period}
          </h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {slots.map(time => (
              <button 
                key={time}
                onClick={() => setSelectedTime(time)}
                style={{ 
                  flex: '1 1 calc(33.333% - 8px)', minWidth: '90px', padding: '12px 0', borderRadius: '24px', border: 'none',
                  background: selectedTime === time ? 'var(--primary)' : 'white',
                  color: selectedTime === time ? 'white' : 'var(--text-dark)',
                  fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: selectedTime === time ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* AI Insight */}
      <div style={{ background: 'white', border: '1px solid var(--primary)', borderRadius: '24px', padding: '20px', display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <Sparkles size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ color: 'var(--primary)', fontSize: '13px', marginBottom: '4px' }}>AI Wellness Insight</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-dark)', lineHeight: '1.5', margin: 0 }}>
            Based on your cycle, Dr. Jenkins is highly recommended for your upcoming check-up phase.
          </p>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div style={{ position: 'fixed', bottom: '80px', left: 0, right: 0, padding: '0 20px', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
        <button 
          onClick={handleBooking}
          disabled={isBooking}
          className="btn-primary" 
          style={{ width: '100%', maxWidth: '560px', height: '56px', borderRadius: '28px', fontSize: '16px', display: 'flex', justifyContent: 'center', gap: '12px', opacity: isBooking ? 0.7 : 1 }}
        >
          {isBooking ? 'Confirming...' : 'Confirm Appointment'} <CalendarIcon size={20} />
        </button>
      </div>
      
    </motion.div>
  );
}
