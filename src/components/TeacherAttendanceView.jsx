import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function TeacherAttendanceView() {
  const [logs, setLogs] = useState([
    { id: 1, date: '2026-03-31', cls: 'Data Structures', total: 40, present: 38 },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newLog, setNewLog] = useState({ date: new Date().toISOString().split('T')[0], cls: '', total: '', present: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newLog.cls) return;
    setLogs([{ id: Date.now(), ...newLog, total: parseInt(newLog.total), present: parseInt(newLog.present) }, ...logs]);
    setNewLog({ date: new Date().toISOString().split('T')[0], cls: '', total: '', present: '' });
    setShowAdd(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--accent)' }}>Take Attendance</h2>
        <button className="btn" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={18} /> {showAdd ? 'Cancel' : 'Log Session'}
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
            <input type="date" value={newLog.date} onChange={e => setNewLog({...newLog, date: e.target.value})} style={{ flex: 1, minWidth: '150px' }} required />
            <input type="text" placeholder="Class Name" value={newLog.cls} onChange={e => setNewLog({...newLog, cls: e.target.value})} style={{ flex: 2, minWidth: '200px' }} required />
            <input type="number" placeholder="Total Students" value={newLog.total} onChange={e => setNewLog({...newLog, total: e.target.value})} style={{ width: '150px' }} required />
            <input type="number" placeholder="Present" value={newLog.present} onChange={e => setNewLog({...newLog, present: e.target.value})} style={{ width: '120px' }} required />
            <button type="submit" className="btn">Save</button>
          </motion.form>
        )}
      </AnimatePresence>

      <div style={{ overflowX: 'auto' }} className="custom-scrollbar">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Class</th>
              <th>Total Students</th>
              <th>Present Status</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => {
              const perc = ((log.present / log.total) * 100).toFixed(1);
              return (
                <tr key={log.id}>
                  <td>{log.date}</td>
                  <td style={{ fontWeight: 500 }}>{log.cls}</td>
                  <td>{log.total}</td>
                  <td style={{ color: 'var(--accent)' }}>{log.present} / {log.total}</td>
                  <td style={{ fontWeight: 600, color: perc < 75 ? '#ff4b4b' : 'var(--text-primary)' }}>{perc}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
