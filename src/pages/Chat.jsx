import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';
import './Chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const query = input.toLowerCase();
    setInput('');
    setIsTyping(true);

    // Local AI Simulation Engine
    setTimeout(() => {
      let aiResponse = "";
      
      if (query.includes("irregular") || query.includes("period")) {
        aiResponse = "Irregular periods are very common and can be triggered by stress, dietary changes, or hormonal imbalances such as PCOS. Here are some immediate suggestions to help regulate your cycle:\n\n• **Stress Management:** Practice yoga or meditation to lower cortisol levels, which can delay ovulation.\n• **Nutrition:** Increase your intake of Iron and Vitamin D, and ensure you're consuming enough healthy fats for hormone production.\n• **Sleep Hygiene:** Maintain a strict 8-hour sleep schedule to balance your circadian rhythm.\n\nWhile lifestyle changes help, I strongly suggest booking an appointment with a specialist. Based on your location, I highly recommend consulting **Dr. Arthika's Wellness clinic for women** in Mangaluru.";
      } else if (query.includes("pcos") || query.includes("cramps")) {
        aiResponse = "Cramps and PCOS symptoms can often be managed with proper lifestyle adjustments. Here are some effective tips:\n\n• **Dietary Adjustments:** Reduce refined sugars and dairy, which can increase inflammation and exacerbate cramps.\n• **Supplementation:** Consider Magnesium supplements to help relax uterine muscles and reduce cramping severity.\n• **Exercise:** Engage in light, low-impact exercises like Pilates or walking to improve blood flow to the pelvic region.\n\nFor a personalized treatment plan, I recommend discussing this with a specialist at **Janapriya Multi-Specialty Hospital**.";
      } else if (query.includes("hi") || query.includes("hello")) {
        aiResponse = "Hello! I am **Swasthya**. I am here to provide personalized health suggestions, explain hormonal changes, or recommend top-rated doctors near you.\n\nFor example, you can tell me:\n• *\"I'm having irregular periods\"*\n• *\"How can I manage PCOS cramps?\"*\n\nHow can I support your wellness today?";
      } else {
        aiResponse = "Thank you for sharing that. Your health is incredibly important. \n\nCould you tell me a little more about any specific symptoms you're experiencing? This will help me provide **accurate medical suggestions** and recommend the best local specialists for you.";
      }

      const botMessage = { id: Date.now() + 1, text: aiResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="chat-root">
      {/* Mouse Glow Effect */}
      <div 
        className="chat-mouse-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Top Nav */}
      <nav className="chat-nav">
        <Link to="/" className="chat-logo" style={{ textDecoration: 'none' }}>
          <Logo size={28} />
        </Link>
        <div className="chat-nav-links">
          <Link to="/chat" className="active">Ask Tattva</Link>
          <Link to="/community">Community Support</Link>
          <Link to="/doctors">Find a Doctor</Link>
          <Link to="/monitor">Track Your Mood</Link>
        </div>
        <div className="chat-nav-right">
          <div className="chat-avatar">S</div>
          <Link to="/chat" className="chat-btn-nav">Ask Tattva</Link>
        </div>
      </nav>

      <div className="chat-container">
        
        {/* Background Watermark when empty */}
        {messages.length === 0 && (
          <div className="chat-watermark">
            <div className="chat-watermark-icon">
              <Sparkles size={32} />
            </div>
            <h2>Ask Swasthya</h2>
            <p>Get instant, private health suggestions and doctor recommendations.</p>
          </div>
        )}

        {/* Chat Messages */}
        <div className="chat-messages">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                className={`chat-bubble-wrap ${msg.sender === 'user' ? 'user' : 'bot'}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'} glass-effect`}>
                  {msg.text.split('\n').map((line, i) => {
                    const parts = line.split(/\*\*(.*?)\*\*/g);
                    return (
                      <React.Fragment key={i}>
                        {parts.map((part, index) => 
                          index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                        )}
                        {i !== msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div 
                className="chat-bubble-wrap bot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="chat-bubble bot typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input-wrapper">
          <form className="chat-input-form" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask Swasthya..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim()}>
              <Send size={20} />
            </button>
          </form>
          <p className="chat-disclaimer">PRIVATE & CONFIDENTIAL</p>
        </div>

      </div>
    </div>
  );
}
