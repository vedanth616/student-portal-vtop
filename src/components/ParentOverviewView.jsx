import { motion } from 'framer-motion';
import { User, Award, Activity } from 'lucide-react';

export default function ParentOverviewView({ name, reg }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div className="glass-panel" style={{ flex: 1, padding: '20px', background: 'rgba(216, 180, 254, 0.05)', borderLeft: '4px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Child's CGPA</p>
              <h3 style={{ fontSize: '1.8rem', margin: 0 }}>8.75</h3>
            </div>
            <Award size={32} color="var(--accent)" opacity={0.5} />
          </div>
        </div>
        <div className="glass-panel" style={{ flex: 1, padding: '20px', background: 'rgba(216, 180, 254, 0.05)', borderLeft: '4px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Overall Attendance</p>
              <h3 style={{ fontSize: '1.8rem', margin: 0 }}>88%</h3>
            </div>
            <Activity size={32} color="var(--accent)" opacity={0.5} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={40} color="var(--accent)" />
        </div>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Linked Profile</h2>
          <p style={{ margin: '4px 0', color: 'var(--text-secondary)' }}><strong>Linked Account:</strong> <span style={{ color: '#fff' }}>Vedanth</span></p>
          <p style={{ margin: '4px 0', color: 'var(--text-secondary)' }}><strong>Reg No:</strong> <span style={{ color: '#fff' }}>REG123</span></p>
          <p style={{ margin: '4px 0', color: 'var(--text-secondary)' }}><strong>Parent Name:</strong> <span style={{ color: '#fff' }}>{name}</span></p>
        </div>
      </div>
    </motion.div>
  );
}
