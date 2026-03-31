import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function ParentCommunicationView() {
  const [messages, setMessages] = useState([
    { id: 1, author: 'Prof. Smith', role: 'teacher', text: 'Vedanth has been doing wonderfully in Data Structures.', time: '10:30 AM' },
    { id: 2, author: 'You', role: 'parent', text: 'Thank you for the update! Glad to hear that.', time: '11:15 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage) return;
    setMessages([...messages, { id: Date.now(), author: 'You', role: 'parent', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMessage('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '600px' }}>
      <h2 style={{ color: 'var(--accent)', marginBottom: '24px' }}>Faculty Communication</h2>

      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '8px' }} className="custom-scrollbar">
        {messages.map((msg, idx) => {
          const isParent = msg.role === 'parent';
          return (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, x: isParent ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              style={{
                display: 'flex',
                justifyContent: isParent ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                background: isParent ? 'var(--accent)' : 'var(--surface-hover)',
                color: isParent ? '#000' : '#fff',
                padding: '12px 16px',
                borderRadius: '16px',
                borderBottomRightRadius: isParent ? '4px' : '16px',
                borderBottomLeftRadius: isParent ? '16px' : '4px',
                maxWidth: '70%',
                position: 'relative'
              }}>
                <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.7, marginBottom: '4px', fontWeight: 600 }}>{msg.author} • {msg.time}</span>
                <p style={{ margin: 0, lineHeight: 1.4 }}>{msg.text}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
        <input 
          type="text" 
          placeholder="Type a message to the faculty..." 
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          style={{ flex: 1, padding: '16px', borderRadius: '24px', background: 'var(--surface-hover)', border: 'none' }}
        />
        <button type="submit" className="btn" style={{ borderRadius: '24px', padding: '0 24px' }}>
          <Send size={18} /> Send
        </button>
      </form>
    </motion.div>
  );
}
