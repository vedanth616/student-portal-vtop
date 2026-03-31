import { useNavigate } from 'react-router-dom';
import { LogOut, GraduationCap, Users, UserCheck } from 'lucide-react';

export default function Topbar({ name, setSearchQuery, role = 'student' }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(`auth_${role}`);
    localStorage.removeItem(`${role}_id`);
    localStorage.removeItem(`${role}_name`);
    navigate(`/login/${role}`);
  };

  const getIcon = () => {
    if (role === 'teacher') return <Users size={28} color="var(--accent)" />;
    if (role === 'parent') return <UserCheck size={28} color="var(--accent)" />;
    return <GraduationCap size={28} color="var(--accent)" />;
  };

  return (
    <div style={{
      height: '70px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: 'rgba(0,0,0,0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {getIcon()}
        <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 600, letterSpacing: '0.5px' }}>
           {role === 'teacher' ? 'Teacher Portal' : role === 'parent' ? 'Parent Portal' : 'Student Portal'}
        </h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <input 
          type="text" 
          placeholder="Search items..." 
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          style={{ width: '250px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '10px 16px' }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Logged in as</span>
            <strong style={{ color: '#fff' }}>{name}</strong>
          </div>
          <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '8px 16px' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
