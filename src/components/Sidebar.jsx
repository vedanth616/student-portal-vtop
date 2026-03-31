import { motion } from 'framer-motion';

export default function Sidebar({ activeTab, setActiveTab, navItems }) {
  return (
    <div style={{
      width: '260px',
      height: '100%',
      borderRight: '1px solid var(--border)',
      background: 'rgba(0,0,0,0.2)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      {navItems.map(item => {
        const isActive = activeTab === item.id;
        return (
          <motion.div
            key={item.id}
            whileHover={{ x: 4, background: 'var(--surface-hover)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(item.id)}
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: isActive ? 'var(--surface-hover)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              fontWeight: isActive ? 600 : 500,
              boxShadow: isActive ? 'inset 3px 0 0 var(--accent)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}>
              {item.icon}
            </div>
            {item.label}
          </motion.div>
        );
      })}
    </div>
  );
}
