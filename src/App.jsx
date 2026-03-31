import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login/:role" element={<Login />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/parent" element={<ParentDashboard />} />
      <Route path="/dashboard" element={<Navigate to="/student" replace />} />
    </Routes>
  );
}

export default App;
