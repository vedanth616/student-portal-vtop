import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, UserCheck } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const roles = [
    { id: 'student', title: 'Student Portal', icon: <GraduationCap size={48} />, desc: 'Access your grades, timetable, and attendance.', theme: 'theme-student' },
    { id: 'teacher', title: 'Teacher Portal', icon: <Users size={48} />, desc: 'Manage your classes, students, and grading.', theme: 'theme-teacher' },
    { id: 'parent', title: 'Parent Portal', icon: <UserCheck size={48} />, desc: 'Track your child\'s academic progress and fees.', theme: 'theme-parent' }
  ];

  return (
    <div className="theme-wrapper theme-student" style={{ alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>CampusConnect</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Select your portal to continue</p>
      </motion.div>

      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {roles.map((role, idx) => (
          <motion.div
            key={role.id}
            className={`glass-panel ${role.theme}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(0,0,0,0.5)', borderColor: 'var(--accent)' }}
            onClick={() => navigate(`/login/${role.id}`)}
            style={{
              width: '300px',
              padding: '40px 30px',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'border-color 0.3s'
            }}
          >
            <div style={{ 
              color: 'var(--accent)', 
              background: 'rgba(0,0,0,0.2)', 
              padding: '24px', 
              borderRadius: '50%', 
              marginBottom: '24px',
              boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.2)'
            }}>
              {role.icon}
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{role.title}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{role.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
