import { motion } from 'framer-motion';

export default function TimetableView() {
  const schedule = [
    { day: 'Monday', slots: ['Maths', 'DSA', 'DBMS'] },
    { day: 'Tuesday', slots: ['OS', 'CN', 'AI'] },
    { day: 'Wednesday', slots: ['AI', 'DBMS', 'DSA'] },
    { day: 'Thursday', slots: ['CN', 'Maths', 'OS'] },
    { day: 'Friday', slots: ['DBMS', 'AI', 'CN'] },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '24px' }}>Weekly Timetable</h2>
      <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--border)' }} className="custom-scrollbar">
        <table>
          <thead style={{ background: 'var(--surface)' }}>
            <tr>
              <th>Day</th>
              <th>09:00 - 10:00</th>
              <th>10:00 - 11:00</th>
              <th>11:00 - 12:00</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600, color: 'var(--accent)' }}>{row.day}</td>
                {row.slots.map((subject, sIdx) => (
                  <td key={sIdx}>
                    <div style={{ background: 'var(--surface-hover)', padding: '6px 12px', borderRadius: '4px', display: 'inline-block', fontSize: '0.9rem', minWidth: '80px', textAlign: 'center' }}>
                      {subject}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
