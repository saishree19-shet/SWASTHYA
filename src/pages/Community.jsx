import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Plus, Heart, MessageCircle, Eye,
  Bookmark, Share2, TrendingUp, User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { subscribeToCommunityFeed, createPost, upvotePost } from '../services/communityService';
import './Community.css';

const TABS = [
  { label: 'All',           value: 'All Threads' },
  { label: 'PCOS',          value: 'PCOS' },
  { label: 'Periods',       value: 'Periods' },
  { label: 'Sexual Health', value: 'Sexual Health' },
  { label: 'Mental Health', value: 'Mental Health' },
  { label: 'Nutrition',     value: 'Nutrition' },
  { label: 'Fitness',       value: 'Fitness' },
  { label: 'General',       value: 'General' },
];

// Color map for category badges
const CATEGORY_COLORS = {
  'PCOS':           { bg: '#FFE0EE', color: '#C2185B' },
  'Periods':        { bg: '#EBE8FF', color: '#5A4FCF' },
  'Sexual Health':  { bg: '#E3EEFF', color: '#3A6FD4' },
  'Mental Health':  { bg: '#E8F5E9', color: '#2E7D32' },
  'Nutrition':      { bg: '#FFF3E0', color: '#E65100' },
  'Fitness':        { bg: '#E0F7FA', color: '#00838F' },
  'General':        { bg: '#F3E5F5', color: '#7B1FA2' },
};

function timeAgo(date) {
  if (!date) return '';
  const d = date.toDate ? date.toDate() : new Date(date);
  const diff = Math.floor((Date.now() - d) / 1000);
  if (diff < 60)  return 'just now';
  if (diff < 3600) return `${Math.floor(diff/60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)} hours ago`;
  if (diff < 2592000) return `${Math.floor(diff/86400)} days ago`;
  return `${Math.floor(diff/2592000)} months ago`;
}

// Placeholder posts shown when Firebase is empty
const PLACEHOLDER_POSTS = [
  {
    id: 'p1', category: 'PCOS', anonymousName: 'Anonymous Member',
    content: 'What exercises are good for reducing cramps?',
    upvotes: 0, commentsCount: 1, views: 5,
    createdAt: { toDate: () => new Date(Date.now() - 1000*60*60*24*120) }
  },
  {
    id: 'p2', category: 'General', anonymousName: 'Anonymous Member',
    content: '#support',
    upvotes: 1, commentsCount: 0, views: 3,
    createdAt: { toDate: () => new Date(Date.now() - 1000*60*60*24*119) }
  },
  {
    id: 'p3', category: 'Mental Health', anonymousName: 'Soniya Kolvekar',
    content: 'its okay to feel low sometimes...',
    upvotes: 0, commentsCount: 2, views: 31,
    createdAt: { toDate: () => new Date(Date.now() - 1000*60*60*24*118) }
  },
];

export default function Community() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('All Threads');
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const scrollRef = useRef(null);

  const displayName = currentUser?.displayName || 'Anonymous Member';
  const photoUrl = currentUser?.photoURL;
  const initials = displayName.charAt(0).toUpperCase();

  React.useEffect(() => {
    const unsubscribe = subscribeToCommunityFeed(activeTab, (fetched) => {
      setPosts(fetched);
    });
    return () => unsubscribe();
  }, [activeTab]);

  const handleLike = async (postId) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
    try { await upvotePost(postId); } catch (e) { console.error(e); }
  };

  const handleSave = (postId) => {
    setSavedPosts(prev => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({ title: post.content, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  };

  const displayPosts = posts.length > 0 ? posts : PLACEHOLDER_POSTS;

  const filteredPosts = displayPosts.filter(p => {
    const matchesSearch = !searchQuery || p.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const trending = ['#support', '#PCOSLife', '#PeriodTalk', '#MentalHealthMatters'];

  return (
    <motion.div
      className="cm-root"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── HEADER ── */}
      <div className="cm-header">
        <div>
          <h1 className="cm-title">Community Support</h1>
          <p className="cm-subtitle">A safe space to share, connect, and support each other.</p>
        </div>
        <button
          className="cm-create-btn"
          onClick={() => navigate('/community/new')}
        >
          <Plus size={16} /> Create Post
        </button>
      </div>

      {/* ── BODY ── */}
      <div className="cm-body">

        {/* ── MAIN (left) ── */}
        <div className="cm-main">

          {/* Search + Tabs bar */}
          <div className="cm-bar">
            <div className="cm-search">
              <Search size={16} color="#aaa" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Scrollable tabs */}
            <div className="cm-tabs-wrapper">
              <div className="cm-tabs" ref={scrollRef}>
                {TABS.map(tab => (
                  <button
                    key={tab.value}
                    className={`cm-tab ${activeTab === tab.value ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts list */}
          <div className="cm-posts">
            {filteredPosts.length === 0 ? (
              <div className="cm-empty">
                <MessageCircle size={40} color="#ccc" />
                <p>No posts yet. Be the first to share!</p>
              </div>
            ) : (
              filteredPosts.map(post => {
                const cat = post.category || 'General';
                const catStyle = CATEGORY_COLORS[cat] || { bg: '#F3F4F6', color: '#666' };
                const isLiked = likedPosts.has(post.id);
                const isSaved = savedPosts.has(post.id);

                return (
                  <motion.div
                    key={post.id}
                    className="cm-post-card"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Top row: category + time */}
                    <div className="cm-post-meta">
                      <span
                        className="cm-post-tag"
                        style={{ background: catStyle.bg, color: catStyle.color }}
                      >
                        {cat}
                      </span>
                      <span className="cm-post-time">{timeAgo(post.createdAt)}</span>
                    </div>

                    {/* Author */}
                    <div className="cm-post-author">
                      <div className="cm-avatar-sm">
                        {post.anonymousName?.charAt(0)?.toUpperCase() || 'A'}
                      </div>
                      <span className="cm-author-name">
                        {post.anonymousName || 'Anonymous Member'}
                      </span>
                    </div>

                    {/* Content */}
                    <p className="cm-post-content">{post.content}</p>

                    {/* Actions row */}
                    <div className="cm-post-actions">
                      <div className="cm-actions-left">
                        <button
                          className={`cm-action-btn ${isLiked ? 'liked' : ''}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
                          <span>{(post.upvotes || 0) + (isLiked ? 1 : 0)}</span>
                        </button>
                        <button className="cm-action-btn">
                          <MessageCircle size={15} />
                          <span>{post.commentsCount || 0} Replies</span>
                        </button>
                        <button className="cm-action-btn">
                          <Eye size={15} />
                          <span>{post.views || 0}</span>
                        </button>
                      </div>
                      <div className="cm-actions-right">
                        <button
                          className={`cm-action-icon ${isSaved ? 'saved' : ''}`}
                          onClick={() => handleSave(post.id)}
                          title="Save"
                        >
                          <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          className="cm-action-icon"
                          onClick={() => handleShare(post)}
                          title="Share"
                        >
                          <Share2 size={15} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* ── SIDEBAR (right) ── */}
        <aside className="cm-sidebar">

          {/* Trending Now */}
          <div className="cm-sidebar-card">
            <div className="cm-sidebar-title">
              <TrendingUp size={16} color="#E65100" />
              <span>Trending Now</span>
            </div>
            <div className="cm-trending-list">
              {trending.map(tag => (
                <button
                  key={tag}
                  className="cm-trending-tag"
                  onClick={() => setSearchQuery(tag.replace('#', ''))}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="cm-sidebar-card">
            <div className="cm-sidebar-title">
              <span>Community Guidelines</span>
            </div>
            <ul className="cm-guidelines">
              <li>Be respectful and kind.</li>
              <li>No medical advice (share experiences only).</li>
              <li>Respect privacy and anonymity.</li>
            </ul>
          </div>

          {/* Your Profile */}
          <div className="cm-sidebar-card cm-profile-card">
            <div className="cm-sidebar-title">
              <User size={16} color="var(--primary)" />
              <span>Your Profile</span>
            </div>
            <div className="cm-profile-info">
              <div className="cm-avatar-lg">
                {photoUrl
                  ? <img src={photoUrl} alt="avatar" referrerPolicy="no-referrer" />
                  : initials}
              </div>
              <div>
                <p className="cm-profile-name">{displayName}</p>
                <p className="cm-profile-sub">Anonymous Contributor</p>
              </div>
            </div>
          </div>

        </aside>
      </div>

      {/* ── FOOTER ── */}
      <footer className="cm-footer">
        <div className="cm-footer-inner">
          <div className="cm-footer-brand">
            <div className="cm-footer-logo">Swasthya</div>
            <p className="cm-footer-tagline">
              Bringing truth to health. A safe, judgment-free space for your journey.
            </p>
            <div className="cm-footer-socials">
              <a href="#" className="cm-social-btn">f</a>
              <a href="#" className="cm-social-btn">ig</a>
              <a href="#" className="cm-social-btn">𝕏</a>
            </div>
          </div>

          <div className="cm-footer-links">
            <div className="cm-footer-col">
              <h4>FEATURES</h4>
              <a href="#">Ask Swasthya</a>
              <a href="#">Community Support</a>
              <a href="#">Find a Doctor</a>
              <a href="#">Mood Tracker</a>
            </div>
            <div className="cm-footer-col">
              <h4>SUPPORT</h4>
              <a href="#">Crisis Support</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
            <div className="cm-footer-col cm-disclaimer-col">
              <h4>DISCLAIMER</h4>
              <p>
                Swasthya provides health information for awareness purposes only.
                We do not provide medical advice, diagnosis, or treatment. Always
                consult with a qualified healthcare provider for any questions
                regarding a medical condition.
              </p>
            </div>
          </div>
        </div>

        <div className="cm-footer-bottom">
          <span>© 2026 Swasthya Health. All rights reserved.</span>
          <span className="cm-footer-heart">Made with ❤️ for public health</span>
        </div>
      </footer>

    </motion.div>
  );
}
