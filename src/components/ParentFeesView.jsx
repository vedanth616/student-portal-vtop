import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard } from 'lucide-react';

export default function ParentFeesView() {
  const [payments, setPayments] = useState([
    { id: 1, date: '2025-10-15', amount: 5000, desc: 'Fall Semester Tuition', status: 'Paid' },
    { id: 2, date: '2026-02-10', amount: 150, desc: 'Lab Materials Fee', status: 'Paid' },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newPayment, setNewPayment] = useState({ amount: '', desc: '' });

  const handlePay = (e) => {
    e.preventDefault();
    if (!newPayment.amount || !newPayment.desc) return;
    setPayments([{ 
      id: Date.now(), 
      date: new Date().toISOString().split('T')[0], 
      amount: parseFloat(newPayment.amount), 
      desc: newPayment.desc, 
      status: 'Paid' 
    }, ...payments]);
    setNewPayment({ amount: '', desc: '' });
    setShowAdd(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--accent)' }}>Fee Payments</h2>
        <button className="btn" onClick={() => setShowAdd(!showAdd)}>
          <CreditCard size={18} /> {showAdd ? 'Cancel' : 'Pay Fee'}
        </button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handlePay}
            style={{ background: 'var(--surface)', padding: '20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', overflow: 'hidden', alignItems: 'center' }}
          >
            <input type="number" placeholder="Amount ($)" value={newPayment.amount} onChange={e => setNewPayment({...newPayment, amount: e.target.value})} style={{ width: '150px' }} required />
            <input type="text" placeholder="Payment Description (e.g. Tuition)" value={newPayment.desc} onChange={e => setNewPayment({...newPayment, desc: e.target.value})} style={{ flex: 1, minWidth: '200px' }} required />
            <button type="submit" className="btn" style={{ background: 'var(--accent)', color: '#000' }}>Confirm Payment</button>
          </motion.form>
        )}
      </AnimatePresence>

      <div style={{ overflowX: 'auto' }} className="custom-scrollbar">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount ($)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td>{p.date}</td>
                <td>{p.desc}</td>
                <td style={{ fontWeight: 600 }}>${p.amount.toFixed(2)}</td>
                <td style={{ color: 'var(--accent)' }}>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
