import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import ReviewQueue from './pages/ReviewQueue';
import Feedback from './pages/Feedback';
import ActivityLog from './pages/ActivityLog';
import Settings from './pages/Settings';
import Retrieval from './pages/Retrieval';
import { ComplaintDetail } from './components/complaints/ComplaintDetail';

const pageTitles = {
  '/': 'Dashboard Overview',
  '/complaints': 'Complaints Feed',
  '/review': 'Human Review Queue',
  '/retrieval': 'RAG Retrieval Panel',
  '/feedback': 'Analytics & Feedback',
  '/activity': 'Activity Log',
  '/settings': 'Settings',
};

function AppContent({ autonomyMode, setAutonomyMode, theme, setTheme }) {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || 'GrievanceAI';

  return (
    <div className="flex w-full min-h-screen bg-[#0f1117] light-main">
      <Sidebar
        autonomyMode={autonomyMode}
        setAutonomyMode={setAutonomyMode}
        theme={theme}
        setTheme={setTheme}
      />
      <Layout autonomyMode={autonomyMode} setAutonomyMode={setAutonomyMode} pageTitle={pageTitle}>
        <Routes>
          <Route path="/" element={<Dashboard onSelectComplaint={setSelectedComplaint} />} />
          <Route path="/complaints" element={<Complaints onSelectComplaint={setSelectedComplaint} />} />
          <Route path="/review" element={<ReviewQueue onSelectComplaint={setSelectedComplaint} />} />
          <Route path="/retrieval" element={<Retrieval />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/activity" element={<ActivityLog />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>

      {selectedComplaint && (
        <ComplaintDetail
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  const [autonomyMode, setAutonomyMode] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <AppContent
        autonomyMode={autonomyMode}
        setAutonomyMode={setAutonomyMode}
        theme={theme}
        setTheme={setTheme}
      />
    </BrowserRouter>
  );
}
