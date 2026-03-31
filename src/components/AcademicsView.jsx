import { useState } from 'react';
import { motion } from 'framer-motion';

const defaultCourses = [
  { id: 'm1', name: 'Mathematics' },
  { id: 'm2', name: 'Data Structures' },
  { id: 'm3', name: 'DBMS' },
  { id: 'm4', name: 'Operating Systems' },
  { id: 'm5', name: 'Computer Networks' },
  { id: 'm6', name: 'Artificial Intelligence' },
];

export default function AcademicsView() {
  const [marks, setMarks] = useState({});
  const [results, setResults] = useState(null);

  const getGrade = (mark) => {
    if (mark >= 90) return "A+";
    if (mark >= 80) return "A";
    if (mark >= 70) return "B";
    if (mark >= 60) return "C";
    if (mark >= 50) return "D";
    return "F";
  };

  const calculateGPA = () => {
    let total = 0;
    const computed = {};
    for (let c of defaultCourses) {
      const m = parseInt(marks[c.id]) || 0;
      total += m;
      computed[c.id] = getGrade(m);
    }
    const avg = total / defaultCourses.length;
    const gpa = (avg / 10).toFixed(2);
    setResults({ grades: computed, gpa });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '24px' }}>Academic Performance</h2>
      
      <div style={{ overflowX: 'auto', marginBottom: '24px' }} className="custom-scrollbar">
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Marks Obtained (Out of 100)</th>
              <th>Calculated Grade</th>
            </tr>
          </thead>
          <tbody>
            {defaultCourses.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 500 }}>{c.name}</td>
                <td>
                  <input 
                    type="number" 
                    value={marks[c.id] || ''} 
                    onChange={e => setMarks({ ...marks, [c.id]: e.target.value })}
                    style={{ maxWidth: '120px', padding: '8px 12px' }}
                    min="0" max="100"
                    placeholder="E.g. 85"
                  />
                </td>
                <td style={{ fontWeight: 600, color: 'var(--accent)' }}>
                  {results && results.grades[c.id]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn" onClick={calculateGPA}>Calculate Grades & GPA</button>
        {results && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', gap: '20px', background: 'var(--surface)', padding: '12px 24px', borderRadius: '8px' }}>
            <p style={{ margin: 0 }}><span style={{ color: 'var(--text-secondary)', marginRight: '8px' }}>Calculated GPA:</span><strong style={{ fontSize: '1.2rem' }}>{results.gpa}</strong></p>
            <p style={{ margin: 0, borderLeft: '1px solid var(--border)', paddingLeft: '20px' }}><span style={{ color: 'var(--text-secondary)', marginRight: '8px' }}>Est. CGPA:</span><strong style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>{results.gpa}</strong></p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
