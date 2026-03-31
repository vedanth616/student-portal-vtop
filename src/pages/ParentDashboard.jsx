import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, CreditCard, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import ParentOverviewView from '../components/ParentOverviewView';
import ParentFeesView from '../components/ParentFeesView';
import ParentCommunicationView from '../components/ParentCommunicationView';

export default function ParentDashboard() {
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const role = 'parent';

  useEffect(() => {
    const isAuth = localStorage.getItem(`auth_${role}`);
    if (!isAuth) {
      navigate(`/login/${role}`);
      return;
    }
    setName(localStorage.getItem(`${role}_name`) || 'Parent');
  }, [navigate]);

  const navItems = [
    { id: 'overview', label: 'Student Overview', icon: <UserCheck size={20} /> },
    { id: 'fees', label: 'Fee Payments', icon: <CreditCard size={20} /> },
    { id: 'communication', label: 'Communications', icon: <Mail size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <ParentOverviewView name={name} reg="REG123" />;
      case 'fees': return <ParentFeesView />;
      case 'communication': return <ParentCommunicationView />;
      default: return null;
    }
  };

  return (
    <div className="theme-wrapper theme-parent" style={{ height: '100vh', overflow: 'hidden' }}>
      <Topbar name={name} setSearchQuery={setSearchQuery} role={role} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} navItems={navItems} />
        <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }} className="custom-scrollbar">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
