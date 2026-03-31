import { useState } from 'react';
import { motion } from 'framer-motion';

const defaultCourses = [
  { id: 'a1', name: 'Mathematics' },
  { id: 'a2', name: 'Data Structures' },
  { id: 'a3', name: 'DBMS' },
  { id: 'a4', name: 'Operating Systems' },
  { id: 'a5', name: 'Computer Networks' },
  { id: 'a6', name: 'Artificial Intelligence' },
];

export default function AttendanceView() {
  const [data, setData] = useState({});
  const [results, setResults] = useState(null);

  const calculateAttendance = () => {
    const percentages = {};
    for (let c of defaultCourses) {
      const a = parseInt(data[`${c.id}_att`]) || 0;
      const t = parseInt(data[`${c.id}_tot`]) || 1; // avoid division by zero
      const p = ((a / t) * 100).toFixed(1);
      percentages[c.id] = p;
    }
    setResults(percentages);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '24px' }}>Attendance Tracker</h2>
      
      <div style={{ overflowX: 'auto', marginBottom: '24px' }} className="custom-scrollbar">
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Classes Attended</th>
              <th>Total Classes</th>
              <th>Attendance Percentage</th>
            </tr>
          </thead>
          <tbody>
            {defaultCourses.map(c => {
               const percentage = results ? parseFloat(results[c.id]) : 0;
               let color = 'var(--text-primary)';
               if (results) {
                 if (percentage < 75) color = '#ff4b4b'; // critical
                 else if (percentage >= 90) color = 'var(--accent)'; // excellent
                 else color = '#f39c12'; // warning
               }
               return (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500 }}>{c.name}</td>
                  <td>
                    <input 
                      type="number" 
                      value={data[`${c.id}_att`] || ''} 
                      onChange={e => setData({ ...data, [`${c.id}_att`]: e.target.value })}
                      style={{ maxWidth: '100px', padding: '8px 12px' }}
                      min="0"
                    />
                  </td>
                  <td>
                    <input 
                      type="number" 
                      value={data[`${c.id}_tot`] || ''} 
                      onChange={e => setData({ ...data, [`${c.id}_tot`]: e.target.value })}
                      style={{ maxWidth: '100px', padding: '8px 12px' }}
                      min="1"
                    />
                  </td>
                  <td style={{ fontWeight: 600, color: color }}>
                    {results && `${results[c.id]}%`}
                  </td>
                </tr>
               )
            })}
          </tbody>
        </table>
      </div>

      <button className="btn" onClick={calculateAttendance}>Calculate Attendance</button>
    </motion.div>
  );
}
