import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function TeacherGradesView() {
  const [grades, setGrades] = useState([
    { id: 1, studentId: 'REG001', studentName: 'Alice Johnson', subject: 'Data Structures', mark: 92 },
    { id: 2, studentId: 'REG002', studentName: 'Bob Smith', subject: 'Data Structures', mark: 78 },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newGrade, setNewGrade] = useState({ studentId: '', studentName: '', subject: '', mark: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newGrade.studentId || !newGrade.mark) return;
    setGrades([{ id: Date.now(), ...newGrade, mark: parseInt(newGrade.mark) }, ...grades]);
    setNewGrade({ studentId: '', studentName: '', subject: '', mark: '' });
    setShowAdd(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--accent)' }}>Update Student Grades</h2>
        <button className="btn" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={18} /> {showAdd ? 'Cancel' : 'Add Grade'}
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
            <input type="text" placeholder="Student ID" value={newGrade.studentId} onChange={e => setNewGrade({...newGrade, studentId: e.target.value})} style={{ flex: 1, minWidth: '120px' }} required />
            <input type="text" placeholder="Student Name" value={newGrade.studentName} onChange={e => setNewGrade({...newGrade, studentName: e.target.value})} style={{ flex: 1, minWidth: '150px' }} required />
            <input type="text" placeholder="Subject" value={newGrade.subject} onChange={e => setNewGrade({...newGrade, subject: e.target.value})} style={{ flex: 1, minWidth: '150px' }} required />
            <input type="number" placeholder="Mark" value={newGrade.mark} onChange={e => setNewGrade({...newGrade, mark: e.target.value})} style={{ width: '100px' }} required />
            <button type="submit" className="btn">Save</button>
          </motion.form>
        )}
      </AnimatePresence>

      <div style={{ overflowX: 'auto' }} className="custom-scrollbar">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Mark</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(g => (
              <tr key={g.id}>
                <td style={{ fontWeight: 500 }}>{g.studentId}</td>
                <td>{g.studentName}</td>
                <td>{g.subject}</td>
                <td style={{ fontWeight: 600, color: g.mark >= 90 ? 'var(--accent)' : g.mark < 50 ? '#ff4b4b' : '#fff' }}>
                  {g.mark}
                </td>
                <td>
                  {g.mark >= 50 ? <span style={{ color: 'var(--accent)' }}>Pass</span> : <span style={{ color: '#ff4b4b' }}>Fail</span>}
                </td>
              </tr>
            ))}
            {grades.length === 0 && (
              <tr><td colSpan="5" style={{ textAlign: 'center', opacity: 0.5 }}>No grades logged yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
