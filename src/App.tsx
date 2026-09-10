import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { RoleSwitcherBanner } from './components/layout/RoleSwitcherBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { NotificationContainer } from './components/common/Notification';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Citizen & Informational Pages
import { Home } from './pages/Home';
import { ReportIssue } from './pages/ReportIssue';
import { TrackProblem } from './pages/TrackProblem';
import { About } from './pages/About';
import { ProblemDetail } from './pages/ProblemDetail';
import { SocialAudit } from './pages/SocialAudit';

// Login & Role Selection Pages
import { RoleSelection } from './pages/RoleSelection';
import { StudentLogin } from './pages/StudentLogin';
import { CSRLogin } from './pages/CSRLogin';
import { AdminLogin } from './pages/AdminLogin';

// Student / University Pages
import { StudentDashboard } from './pages/StudentDashboard';
import { Challenges } from './pages/Challenges';
import { ChallengeDetail } from './pages/ChallengeDetail';
import { ProjectLifecycle } from './pages/ProjectLifecycle';

// CSR Partner Pages
import { CSRPortal } from './pages/CSRPortal';

// District Administration Pages
import { AdminDashboard } from './pages/AdminDashboard';
import { GroundDeployment } from './pages/GroundDeployment';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#060d0a] text-slate-100 font-sans antialiased selection:bg-emerald-600 selection:text-white">
          {/* Top Demo Role Switcher Banner */}
          <RoleSwitcherBanner />

          {/* Main Navigation Bar */}
          <Navbar />

          {/* Primary App Viewport */}
          <main className="flex-1">
            <Routes>
              {/* ========================================================= */}
              {/* 1. PUBLIC CITIZEN ROUTES                                  */}
              {/* ========================================================= */}
              <Route path="/" element={<Home />} />
              <Route path="/report-issue" element={<ReportIssue />} />
              <Route path="/track-problem" element={<TrackProblem />} />
              <Route path="/problem/:id" element={<ProblemDetail />} />
              <Route path="/social-audit" element={<SocialAudit />} />
              <Route path="/about" element={<About />} />

              {/* ========================================================= */}
              {/* 2. ROLE SELECTION & AUTHENTICATION ENTRY POINTS           */}
              {/* ========================================================= */}
              <Route path="/login" element={<RoleSelection />} />
              <Route path="/role-selection" element={<RoleSelection />} />
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/csr-login" element={<CSRLogin />} />
              <Route path="/admin-login" element={<AdminLogin />} />

              {/* ========================================================= */}
              {/* 3. STUDENT / UNIVERSITY ROUTES (PROTECTED)                */}
              {/* ========================================================= */}
              <Route
                path="/student-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['student']} pageTitle="Student & University Dashboard">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/challenges"
                element={
                  <ProtectedRoute allowedRoles={['student', 'admin']} pageTitle="Verified Innovation Challenges">
                    <Challenges />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/challenges/:id"
                element={
                  <ProtectedRoute allowedRoles={['student', 'admin']} pageTitle="Challenge Details & Adoption">
                    <ChallengeDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/project-lifecycle"
                element={
                  <ProtectedRoute allowedRoles={['student', 'csr', 'admin']} pageTitle="Project Lifecycle & Milestones">
                    <ProjectLifecycle />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/project-lifecycle/:id"
                element={
                  <ProtectedRoute allowedRoles={['student', 'csr', 'admin']} pageTitle="Project Lifecycle & Milestones">
                    <ProjectLifecycle />
                  </ProtectedRoute>
                }
              />

              {/* ========================================================= */}
              {/* 4. CSR PARTNER ROUTES (PROTECTED)                         */}
              {/* ========================================================= */}
              <Route
                path="/csr-portal"
                element={
                  <ProtectedRoute allowedRoles={['csr']} pageTitle="CSR Partner & Industry Grants Portal">
                    <CSRPortal />
                  </ProtectedRoute>
                }
              />

              {/* ========================================================= */}
              {/* 5. DISTRICT ADMINISTRATION ROUTES (PROTECTED)            */}
              {/* ========================================================= */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']} pageTitle="District Administration & Triage Portal">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ground-deployment"
                element={
                  <ProtectedRoute allowedRoles={['admin']} pageTitle="Ground Deployment & Handover Verification">
                    <GroundDeployment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ground-deployment/:id"
                element={
                  <ProtectedRoute allowedRoles={['admin']} pageTitle="Ground Deployment & Handover Verification">
                    <GroundDeployment />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all fallback */}
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
