import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { CursorGlow } from "./components/CursorGlow";
import { ThemeProvider } from "./context/ThemeContext";
import { CompareProvider } from "./context/CompareContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Public Pages
import { Landing } from "./pages/Landing";
import { About } from "./pages/About";
import { HowItWorks } from "./pages/HowItWorks";
import { Contact } from "./pages/Contact";
import { Pricing } from "./pages/Pricing";

// Auth Pages
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Onboarding } from "./pages/Onboarding";
import { ForgotPassword } from "./pages/ForgotPassword";
import { AuthCallback } from "./pages/AuthCallback";

// App Pages
import { Dashboard } from "./pages/Dashboard";
import { UniversitySearch } from "./pages/UniversitySearch";
import { UniversityDetail } from "./pages/UniversityDetail";
import { Wishlist } from "./pages/Wishlist";
import { Deadlines } from "./pages/Deadlines";
import { Applications } from "./pages/Applications";

// AI Tools
import { AIRecommendations } from "./pages/AIRecommendations";
import { AISOP } from "./pages/AISOP";
import { AITools } from "./pages/AITools";
import { UniversityComparison } from "./pages/UniversityComparison";
import { ResumeBuilderPage } from "./pages/ResumeBuilder/ResumeBuilderPage";
import { MyResumesPage } from "./pages/ResumeBuilder/MyResumesPage";
import { ResumeHistoryPage } from "./pages/ResumeBuilder/ResumeHistoryPage";

// User Pages
import { Profile } from "./pages/Profile";

import { AdminDashboard } from "./pages/AdminDashboard";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return null;
}

function AppRoutes() {
  return (
    <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-transparent text-foreground transition-colors duration-300 overflow-hidden relative">
          <Navbar />
          <main className="flex-1 animate-fade-in z-10 w-full flex flex-col">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/how-it-works"
                element={<HowItWorks />}
              />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding onComplete={() => {}} />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <UniversitySearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/university/:id"
                element={
                  <ProtectedRoute>
                    <UniversityDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/deadlines"
                element={
                  <ProtectedRoute>
                    <Deadlines />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <ProtectedRoute>
                    <Applications />
                  </ProtectedRoute>
                }
              />

              {/* AI Tools */}
              <Route
                path="/ai-tools"
                element={
                  <ProtectedRoute>
                    <AITools />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-recommendations"
                element={
                  <ProtectedRoute>
                    <AIRecommendations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-sop"
                element={
                  <ProtectedRoute>
                    <AISOP />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compare"
                element={
                  <ProtectedRoute>
                    <UniversityComparison />
                  </ProtectedRoute>
                }
              />

              {/* Resume Builder */}
              <Route
                path="/resume-builder"
                element={
                  <ProtectedRoute>
                    <ResumeBuilderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-resumes"
                element={
                  <ProtectedRoute>
                    <MyResumesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume-history"
                element={
                  <ProtectedRoute>
                    <ResumeHistoryPage />
                  </ProtectedRoute>
                }
              />

              {/* User Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CompareProvider>
        <AuthProvider>
          <AnimatedBackground />
          <CursorGlow />
          <AppRoutes />
        </AuthProvider>
      </CompareProvider>
    </ThemeProvider>
  );
}