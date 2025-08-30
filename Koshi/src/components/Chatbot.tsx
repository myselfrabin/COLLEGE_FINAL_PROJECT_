import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css'; // Optional: for custom styles

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const FAQS = [
  'What are the top places to visit in Koshi?',
  'What is the best time to visit Koshi Province?',
  'Can you suggest a 3-day itinerary for Dharan?',
  'What are some adventure activities in Koshi?',
  'Tell me about local festivals in Koshi Province.'
];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hi! I am your travel assistant for Nepal. Ask me anything about tourist spots, recommendations, or travel tips!' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Minimized by default
  const [showFAQ, setShowFAQ] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent, overrideText?: string) => {
    e.preventDefault();
    const text = overrideText ?? input;
    if (!text.trim()) return;
    const userMessage: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowFAQ(false); // Always hide FAQ after sending a message

    try {
      const res = await fetch('http://localhost:3000/chat-with-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data.response || 'Sorry, I could not get a response.' },
      ]);
    } catch (err) {
      console.error('Chatbot fetch error:', err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, there was an error connecting to the assistant. Please try again.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Only toggle FAQ on header click, not on send
  const handleFAQHeaderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowFAQ((f) => !f);
  };

  return (
    <div className={`chatbot-container${isOpen ? '' : ' chatbot-minimized'}`}> 
      <button className="chatbot-toggle-btn" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? <span style={{fontSize: '2.2rem', lineHeight: 1}}>&minus;</span> : <span style={{fontSize: '2.2rem'}}>💬</span>}
      </button>
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-faq-section" style={{display: showFAQ ? 'block' : 'none'}}>
            <div className="chatbot-faq-header" onClick={handleFAQHeaderClick} style={{cursor: 'pointer'}}>
              <span role="img" aria-label="wave" style={{fontSize: '1.6rem', marginRight: 6}}>👋</span>
              <span className="chatbot-faq-title">Hi there</span>
            </div>
            <div className="chatbot-faq-desc">Need help? Try these quick questions:</div>
            <div className="chatbot-faq-list">
              {FAQS.map((faq, idx) => (
                <button key={idx} className="chatbot-faq-btn" onClick={(e) => handleSend(e, faq)}>{faq}</button>
              ))}
            </div>
          </div>
          <div className="chatbot-window">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message chatbot-message--${msg.sender}`}>{msg.text}</div>
            ))}
            {isTyping && (
              <div className="chatbot-message chatbot-message--bot chatbot-typing">Travel Assistant is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              type="text"
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isTyping}
            />
            <button type="submit" className="chatbot-send-btn" disabled={isTyping || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 