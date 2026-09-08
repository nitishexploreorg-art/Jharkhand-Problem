import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { RoleSwitcherBanner } from './components/layout/RoleSwitcherBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { NotificationContainer } from './components/common/Notification';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { ReportIssue } from './pages/ReportIssue';
import { TrackProblem } from './pages/TrackProblem';
import { Challenges } from './pages/Challenges';
import { ChallengeDetail } from './pages/ChallengeDetail';
import { StudentDashboard } from './pages/StudentDashboard';
import { CSRPortal } from './pages/CSRPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProblemDetail } from './pages/ProblemDetail';
import { SocialAudit } from './pages/SocialAudit';
import { About } from './pages/About';
import { ProjectLifecycle } from './pages/ProjectLifecycle';
import { GroundDeployment } from './pages/GroundDeployment';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
          {/* Top Demo Role Switcher Banner */}
          <RoleSwitcherBanner />

          {/* Main Navigation Bar */}
          <Navbar />

          {/* Primary App Viewport */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/report-issue" element={<ReportIssue />} />
              <Route path="/track-problem" element={<TrackProblem />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/challenges/:id" element={<ChallengeDetail />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/csr-portal" element={<CSRPortal />} />
              <Route path="/project-lifecycle" element={<ProjectLifecycle />} />
              <Route path="/project-lifecycle/:id" element={<ProjectLifecycle />} />
              <Route path="/ground-deployment" element={<GroundDeployment />} />
              <Route path="/ground-deployment/:id" element={<GroundDeployment />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/problem/:id" element={<ProblemDetail />} />
              <Route path="/social-audit" element={<SocialAudit />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Official Government Footer */}
          <Footer />

          {/* Toast Notifications */}
          <NotificationContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
