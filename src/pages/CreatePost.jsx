import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, X, Sparkles, Image as ImageIcon, Smile, List, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../services/communityService';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

export default function CreatePost() {
  const navigate = useNavigate();
  const [activeCircle, setActiveCircle] = useState('Mental Wellness');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [postText, setPostText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const handlePost = async () => {
    if (!postText.trim()) return;
    
    setIsSubmitting(true);
    try {
      const authorId = currentUser ? currentUser.uid : 'anonymous_user';
      const anonName = isAnonymous 
        ? `Anonymous ${Math.random().toString(36).substring(2, 6)}`
        : (currentUser?.displayName || 'Member');
        
      await createPost(
        authorId, 
        anonName, 
        "", // no title needed
        postText, 
        activeCircle
      );
      
      navigate('/community');
    } catch (error) {
      console.error(error);
      alert('Failed to post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const circles = ["Mental Wellness", "Period Care", "Pregnancy", "Nutrition"];

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} style={{ paddingBottom: '40px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <header className="app-header" style={{ marginBottom: '24px' }}>
        <div className="header-title" style={{ gap: '16px' }}>
          <X size={24} onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: 'var(--primary)' }} />
          <span style={{ color: 'var(--primary)' }}>Her Circle</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Bell size={20} color="var(--text-dark)" />
          <img src="https://i.pravatar.cc/100?img=5" alt="Profile" className="avatar" style={{ width: '32px', height: '32px' }} />
        </div>
      </header>

      {/* Insight Banner */}
      <div style={{ border: '1px solid var(--primary)', borderRadius: '24px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', background: 'white' }}>
        <Sparkles size={20} color="var(--primary)" />
        <p style={{ fontSize: '13px', color: 'var(--text-dark)', margin: 0, fontWeight: '500' }}>
          Sharing your experiences helps others feel less alone. We're here for you.
        </p>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>Select a Circle</p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {circles.map(circle => (
          <button 
            key={circle}
            onClick={() => setActiveCircle(circle)}
            style={{
              padding: '10px 16px',
              borderRadius: '24px',
              border: 'none',
              background: activeCircle === circle ? 'var(--primary)' : '#F4F4F5',
              color: activeCircle === circle ? 'white' : 'var(--text-dark)',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {circle}
          </button>
        ))}
      </div>

      {/* Text Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white', margin: '0 -20px', padding: '24px 20px', borderRadius: '32px 32px 0 0', boxShadow: '0 -4px 20px rgba(0,0,0,0.02)' }}>
        <textarea 
          placeholder="Share what's on your mind..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          style={{
            width: '100%',
            height: '200px',
            border: 'none',
            resize: 'none',
            fontSize: '16px',
            fontFamily: 'inherit',
            outline: 'none',
            color: 'var(--text-dark)',
            background: 'transparent'
          }}
        />

        <div style={{ display: 'flex', gap: '16px', color: 'var(--text-dark)', opacity: 0.8, marginBottom: '40px' }}>
          <ImageIcon size={20} style={{ cursor: 'pointer' }} />
          <Smile size={20} style={{ cursor: 'pointer' }} />
          <List size={20} style={{ cursor: 'pointer' }} />
        </div>

        {/* Anonymous Toggle */}
        <div className="flex-between" style={{ background: '#F8F9FA', padding: '16px', borderRadius: '20px', marginBottom: '24px' }}>
          <div>
            <h4 style={{ fontSize: '14px', color: 'var(--text-dark)', marginBottom: '4px' }}>Post Anonymously</h4>
            <p style={{ fontSize: '11px', color: 'var(--text-light)', margin: 0 }}>Your identity will remain hidden to the community</p>
          </div>
          {/* Toggle Switch */}
          <div 
            onClick={() => setIsAnonymous(!isAnonymous)}
            style={{ width: '44px', height: '24px', borderRadius: '12px', background: isAnonymous ? 'var(--primary)' : '#E5E7EB', position: 'relative', cursor: 'pointer', transition: 'background 0.3s' }}
          >
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', right: isAnonymous ? '2px' : 'auto', left: isAnonymous ? 'auto' : '2px', top: '2px', transition: 'all 0.3s' }} />
          </div>
        </div>

        <button 
          className="btn-primary" 
          onClick={handlePost}
          disabled={isSubmitting || !postText.trim()}
          style={{ width: '100%', justifyContent: 'center', height: '56px', borderRadius: '28px', fontSize: '16px', marginBottom: '32px', opacity: (isSubmitting || !postText.trim()) ? 0.7 : 1 }}
        >
          {isSubmitting ? 'Posting...' : (isAnonymous ? 'Post Anonymously' : 'Post to Community')}
        </button>

        {/* Safe Environment Policy */}
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', fontSize: '12px', marginBottom: '8px' }}>
            <ShieldCheck size={16} /> Safe Environment Policy
          </div>
          <p style={{ fontSize: '11px', lineHeight: '1.5', maxWidth: '300px', margin: '0 auto' }}>
            Swasthya uses automated moderation to ensure a kind, supportive, and judgment-free space. Harassment or medical misinformation will be removed.
          </p>
        </div>
      </div>
      
    </motion.div>
  );
}
