import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Users, UserCheck, LogIn, ArrowLeft } from 'lucide-react';

export default function Login() {
  const { role } = useParams();
  const [regno, setRegno] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const themeClass = `theme-${role || 'student'}`;
  
  const roleConfig = {
    student: { title: 'Student Portal', icon: <GraduationCap size={40} color="var(--accent)" />, idLabel: 'Register Number', idPlaceholder: 'e.g. REG123' },
    teacher: { title: 'Teacher Portal', icon: <Users size={40} color="var(--accent)" />, idLabel: 'Staff ID', idPlaceholder: 'e.g. STF456' },
    parent: { title: 'Parent Portal', icon: <UserCheck size={40} color="var(--accent)" />, idLabel: 'Parent ID / Email', idPlaceholder: 'e.g. parent@example.com' }
  };

  const config = roleConfig[role] || roleConfig.student;

  useEffect(() => {
    if (localStorage.getItem(`auth_${role}`)) {
      navigate(`/${role}`);
    }
  }, [navigate, role]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!regno || !password) {
      setError('Please enter all details');
      return;
    }
    setError('');
    localStorage.setItem(`auth_${role}`, 'true');
    localStorage.setItem(`${role}_id`, regno);
    localStorage.setItem(`${role}_name`, role === 'student' ? 'Vedanth' : role === 'teacher' ? 'Prof. Smith' : 'Arthur Parent');
    navigate(`/${role}`);
  };

  return (
    <div className={`theme-wrapper ${themeClass}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', position: 'relative' }}>
      
      <button 
        onClick={() => navigate('/')} 
        style={{ position: 'absolute', top: '30px', left: '30px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <ArrowLeft size={20} /> Back to Selection
      </button>

      <motion.div 
        className="glass-panel"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ width: '100%', maxWidth: '400px', padding: '40px', textAlign: 'center' }}
      >
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          style={{ 
            background: 'var(--secondary)', 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: 'var(--glass-shadow)'
          }}
        >
          {config.icon}
        </motion.div>
        
        <h2 style={{ marginBottom: '8px', fontSize: '1.5rem', fontWeight: 600 }}>{config.title}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '0.9rem' }}>Enter your credentials to continue</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>{config.idLabel}</label>
            <input 
              type="text" 
              placeholder={config.idPlaceholder} 
              value={regno}
              onChange={(e) => setRegno(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: '#ff4b4b', fontSize: '0.85rem', margin: 0 }}
            >
              {error}
            </motion.p>
          )}

          <button type="submit" className="btn" style={{ marginTop: '10px', height: '48px', width: '100%' }}>
            <LogIn size={18} /> Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}
