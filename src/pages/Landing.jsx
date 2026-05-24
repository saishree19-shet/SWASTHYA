import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  MessageCircleHeart,
  Users,
  MapPin,
  CalendarHeart,
  CheckCircle2,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import Logo from '../components/Logo';
import './Landing.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } }
};

const features = [
  {
    icon: <MessageCircleHeart size={28} />,
    bg: '#EBE8FF',
    color: '#5A4FCF',
    title: 'Ask Swasthya',
    desc: 'Get instant, judgment-free answers to your sensitive health questions.'
  },
  {
    icon: <Users size={28} />,
    bg: '#FEE9D1',
    color: '#C2601A',
    title: 'Community Support',
    desc: 'Connect anonymously with others who share your experiences.'
  },
  {
    icon: <MapPin size={28} />,
    bg: '#E3EEFF',
    color: '#3A6FD4',
    title: 'Find a Doctor',
    desc: 'Locate trusted specialists nearby based on your specific needs.'
  },
  {
    icon: <CalendarHeart size={28} />,
    bg: '#FFE0EE',
    color: '#C2185B',
    title: 'Track Your Mood',
    desc: 'Monitor your period, mood, and symptoms with our intuitive tracker.'
  }
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = '"Is irregular period normal?"';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="lp-root">

      {/* ── NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">

          <Link to="/" className="lp-logo" style={{ textDecoration: 'none' }}>
            <Logo size={28} />
          </Link>

          <div className={`lp-nav-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/chat" onClick={() => setMenuOpen(false)}>Ask Swasthya</Link>
            <Link to="/community" onClick={() => setMenuOpen(false)}>Community Support</Link>
            <Link to="/doctors" onClick={() => setMenuOpen(false)}>Find a Doctor</Link>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Track Your Mood</Link>
          </div>

          <div className="lp-nav-right">
            <div className="lp-avatar">S</div>
            <Link to="/chat" className="lp-btn-primary lp-btn-nav">Ask Swasthya</Link>
            <button
              className="lp-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="lp-hero-badge">
              <span className="lp-badge-dot" />
              Your Private Health Companion
            </div>

            <h1 className="lp-hero-title">
              <span className="lp-title-primary">Smart Wellness</span>
              <span className="lp-title-dark"> for Health</span>
            </h1>

            <p className="lp-hero-sub">
              Break the stigma. Get safe, clear, and judgment-free answers about
              PCOS, sexual health, menstruation, and more.
            </p>

            <div className="lp-hero-cta">
              <Link to="/chat" className="lp-btn-primary lp-btn-lg">
                <MessageCircleHeart size={20} /> Ask Swasthya
              </Link>
              <Link to="/community" className="lp-btn-outline lp-btn-lg">
                <Users size={20} /> Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VISUAL / CHAT WITH DOCTOR IMAGE ── */}
      <section className="lp-visual">
        <motion.div
          className="lp-visual-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Real doctor image as background */}
          <img
            src="/images/doctor_chat.png"
            alt="Doctor consultation"
            className="lp-visual-img"
          />
          {/* Overlay for readability */}
          <div className="lp-visual-overlay" />

          {/* Chat bubble in center */}
          <div className="lp-chat-bubble">
            <p className="lp-chat-text">
              {typedText}
              <span className="lp-cursor">|</span>
            </p>
            <div className="lp-typing">
              <span className="lp-dot" style={{ animationDelay: '0s' }} />
              <span className="lp-dot" style={{ animationDelay: '0.2s' }} />
              <span className="lp-dot" style={{ animationDelay: '0.4s' }} />
              <span className="lp-typing-label">Swasthya is typing…</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="lp-features">
        <div className="lp-section-inner">
          <motion.div
            className="lp-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="lp-section-title">Everything you need for your health journey</h2>
            <p className="lp-section-sub">
              Comprehensive tools designed to empower you with knowledge and support.
            </p>
          </motion.div>

          <motion.div
            className="lp-features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {features.map((f, i) => (
              <motion.div key={i} className="lp-feature-item" variants={itemVariants}>
                <div
                  className="lp-feature-icon-box"
                  style={{ background: f.bg, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="lp-feature-name">{f.title}</h3>
                <p className="lp-feature-desc">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="lp-about">
        <div className="lp-section-inner lp-about-inner">

          {/* Left — text */}
          <motion.div
            className="lp-about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="lp-about-eyebrow">ABOUT SHECARE AI</p>
            <h2 className="lp-about-title">Breaking Taboos,<br />Building Awareness</h2>
            <p className="lp-about-desc">
              Swasthya is your confidential space to learn about PCOS, menstruation,
              sexual health, and more. We combine AI technology with medical guidelines
              to provide you with accurate, stigma-free information.
            </p>
            <ul className="lp-about-list">
              {[
                'Expert-backed medical information',
                'Completely anonymous & private',
                'Culturally sensitive guidance',
                'No judgment, just support'
              ].map((item, i) => (
                <li key={i} className="lp-about-item">
                  <CheckCircle2 size={18} className="lp-check-icon" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/chat" className="lp-btn-primary lp-btn-md lp-about-cta">
              Learn More <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Right — real doctor image */}
          <motion.div
            className="lp-about-image-wrap"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="lp-about-img-card">
              <img
                src="/images/doctor_about.png"
                alt="Doctor with stethoscope"
                className="lp-about-img"
              />
              <div className="lp-about-img-caption">
                "Your health deserves trusted answers."
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="lp-cta-section">
        <div className="lp-section-inner">
          <motion.div
            className="lp-cta-card"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="lp-cta-title">Ready to take control of your health?</h2>
            <p className="lp-cta-sub">
              Join 50,000+ women who trust Swasthya for honest, private health guidance.
            </p>
            <div className="lp-cta-btns">
              <Link to="/chat" className="lp-cta-btn-white lp-btn-lg">
                <MessageCircleHeart size={20} /> Ask Swasthya Now
              </Link>
              <Link to="/community" className="lp-cta-btn-outline lp-btn-lg">
                <Users size={20} /> Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <div className="lp-footer-logo" style={{ textDecoration: 'none' }}>
              <Logo size={24} color="var(--primary)" />
            </div>
            <p className="lp-footer-tagline">
              Radical empathy through technology. Your wellness, redefined.
            </p>
          </div>

          <div className="lp-footer-links">
            <div className="lp-footer-col">
              <h4>Platform</h4>
              <Link to="/chat">Ask Swasthya</Link>
              <Link to="/community">Community</Link>
              <Link to="/doctors">Find a Doctor</Link>
              <Link to="/dashboard">Track Mood</Link>
            </div>
            <div className="lp-footer-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="lp-footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <span>© 2026 Swasthya. All rights reserved.</span>
          <div className="lp-footer-socials">
            <a href="#" className="lp-social">𝕏</a>
            <a href="#" className="lp-social">in</a>
            <a href="#" className="lp-social">ig</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
