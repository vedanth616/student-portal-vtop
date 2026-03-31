import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, ClipboardCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import TeacherClassesView from '../components/TeacherClassesView';
import TeacherGradesView from '../components/TeacherGradesView';
import TeacherAttendanceView from '../components/TeacherAttendanceView';

export default function TeacherDashboard() {
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState('classes');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const role = 'teacher';

  useEffect(() => {
    const isAuth = localStorage.getItem(`auth_${role}`);
    if (!isAuth) {
      navigate(`/login/${role}`);
      return;
    }
    setName(localStorage.getItem(`${role}_name`) || 'Teacher');
  }, [navigate]);

  const navItems = [
    { id: 'classes', label: 'My Classes', icon: <Users size={20} /> },
    { id: 'grades', label: 'Update Grades', icon: <BookOpen size={20} /> },
    { id: 'attendance', label: 'Take Attendance', icon: <ClipboardCheck size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'classes': return <TeacherClassesView />;
      case 'grades': return <TeacherGradesView />;
      case 'attendance': return <TeacherAttendanceView />;
      default: return null;
    }
  };

  return (
    <div className="theme-wrapper theme-teacher" style={{ height: '100vh', overflow: 'hidden' }}>
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
