import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Award, CheckCircle } from 'lucide-react';

export default function ProfileView({ name, reg, setName }) {
  const [editName, setEditName] = useState('');

  const updateProfile = () => {
    if (!editName) return;
    localStorage.setItem('name', editName);
    setName(editName);
    setEditName('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel"
      style={{ padding: '24px' }}
    >
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div className="glass-panel" style={{ flex: 1, padding: '20px', background: 'rgba(0,210,255,0.05)', borderLeft: '4px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>CGPA (Mock)</p>
              <h3 style={{ fontSize: '1.8rem', margin: 0 }}>8.75</h3>
            </div>
            <Award size={32} color="var(--accent)" opacity={0.5} />
          </div>
        </div>
        <div className="glass-panel" style={{ flex: 1, padding: '20px', background: 'rgba(58,123,213,0.05)', borderLeft: '4px solid #3a7bd5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Attendance Average</p>
              <h3 style={{ fontSize: '1.8rem', margin: 0 }}>88%</h3>
            </div>
            <CheckCircle size={32} color="#3a7bd5" opacity={0.5} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={40} color="var(--text-secondary)" />
        </div>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Profile Details</h2>
          <p style={{ margin: '4px 0', color: 'var(--text-secondary)' }}><strong>Reg No:</strong> <span style={{ color: '#fff' }}>{reg}</span></p>
          <p style={{ margin: '4px 0', color: 'var(--text-secondary)' }}><strong>Name:</strong> <span style={{ color: '#fff' }}>{name}</span></p>
          <p style={{ margin: '4px 0', color: 'var(--text-secondary)' }}><strong>Course:</strong> <span style={{ color: '#fff' }}>B.Tech Computer Science Engineering</span></p>
        </div>
      </div>

      <div style={{ background: 'var(--surface)', padding: '20px', borderRadius: '12px' }}>
        <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '16px', fontSize: '1.1rem', fontWeight: 500 }}>Update Display Name</h3>
        <div style={{ display: 'flex', gap: '12px', maxWidth: '500px' }}>
          <input 
            type="text" 
            placeholder="Enter a new display name" 
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button className="btn" onClick={updateProfile}>Update Profile</button>
        </div>
      </div>
    </motion.div>
  );
}
