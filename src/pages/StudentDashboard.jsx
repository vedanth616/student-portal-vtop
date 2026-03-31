import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, CalendarDays, ClipboardCheck } from 'lucide-react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import ProfileView from '../components/ProfileView';
import AcademicsView from '../components/AcademicsView';
import TimetableView from '../components/TimetableView';
import AttendanceView from '../components/AttendanceView';

export default function StudentDashboard() {
  const [name, setName] = useState('');
  const [reg, setReg] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const role = 'student';

  useEffect(() => {
    const isAuth = localStorage.getItem(`auth_${role}`);
    const storedName = localStorage.getItem(`${role}_name`);
    const storedId = localStorage.getItem(`${role}_id`);
    if (!isAuth) {
      navigate(`/login/${role}`);
      return;
    }
    setName(storedName);
    setReg(storedId);
  }, [navigate]);

  const navItems = [
    { id: 'profile', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'academics', label: 'Academics', icon: <BookOpen size={20} /> },
    { id: 'timetable', label: 'Timetable', icon: <CalendarDays size={20} /> },
    { id: 'attendance', label: 'Attendance', icon: <ClipboardCheck size={20} /> },
  ];

  const renderContent = () => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if ('profile dashboard user'.includes(query)) return <ProfileView name={name} reg={reg} setName={setName} />;
      if ('academics marks grades cgpa performance calculation'.includes(query)) return <AcademicsView />;
      if ('timetable schedule classes slots week'.includes(query)) return <TimetableView />;
      if ('attendance tracker presence classes tracker'.includes(query)) return <AttendanceView />;
      return <div style={{ padding: '24px', opacity: 0.7 }}>No sections matched your search for "{searchQuery}".</div>;
    }

    switch (activeTab) {
      case 'profile': return <ProfileView name={name} reg={reg} setName={setName} />;
      case 'academics': return <AcademicsView />;
      case 'timetable': return <TimetableView />;
      case 'attendance': return <AttendanceView />;
      default: return null;
    }
  };

  return (
    <div className="theme-wrapper theme-student" style={{ height: '100vh', overflow: 'hidden' }}>
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
