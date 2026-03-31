import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users } from 'lucide-react';

export default function TeacherClassesView() {
  const [classes, setClasses] = useState([
    { id: 1, name: 'Advanced Data Structures', time: 'Mon 09:00', room: 'Lab 4' },
    { id: 2, name: 'Operating Systems', time: 'Tue 10:00', room: 'Room 301' },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', time: '', room: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newClass.name) return;
    setClasses([...classes, { id: Date.now(), ...newClass }]);
    setNewClass({ name: '', time: '', room: '' });
    setShowAdd(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--accent)' }}>My Classes</h2>
        <button className="btn" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={18} /> {showAdd ? 'Cancel' : 'Add Class'}
        </button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAdd}
            style={{ background: 'var(--surface)', padding: '20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', overflow: 'hidden' }}
          >
            <input type="text" placeholder="Class Name" value={newClass.name} onChange={e => setNewClass({...newClass, name: e.target.value})} style={{ flex: 1, minWidth: '200px' }} required />
            <input type="text" placeholder="Time (e.g. Wed 14:00)" value={newClass.time} onChange={e => setNewClass({...newClass, time: e.target.value})} style={{ flex: 1, minWidth: '150px' }} required />
            <input type="text" placeholder="Room/Location" value={newClass.room} onChange={e => setNewClass({...newClass, room: e.target.value})} style={{ flex: 1, minWidth: '150px' }} required />
            <button type="submit" className="btn">Save</button>
          </motion.form>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {classes.map(c => (
          <motion.div key={c.id} whileHover={{ y: -5 }} className="glass-panel" style={{ padding: '20px', background: 'var(--surface-hover)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ background: 'rgba(16,185,129,0.1)', padding: '12px', borderRadius: '50%' }}>
                <Users size={24} color="var(--accent)" />
              </div>
              <h3 style={{ margin: 0 }}>{c.name}</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}><strong>Time:</strong> {c.time}</p>
            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}><strong>Location:</strong> {c.room}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
