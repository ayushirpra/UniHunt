import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { supabase } from "../lib/supabase";

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

// User Pages
import { Profile } from "./pages/Profile";

// Admin Pages
import { AdminDashboard } from "./pages/AdminDashboard";

function PrivateRoute({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) {
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsAuthenticated(false); // Will navigate to login after signup
  };

  const handleOnboardingComplete = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  // Show loading screen while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
          <Navbar
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
          <main className="flex-1">
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
              <Route
                path="/login"
                element={<Login onLogin={handleLogin} />}
              />
              <Route
                path="/signup"
                element={<Signup onSignup={handleSignup} />}
              />
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/onboarding"
                element={
                  <Onboarding
                    onComplete={handleOnboardingComplete}
                  />
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <UniversitySearch />
                  </PrivateRoute>
                }
              />
              <Route
                path="/university/:id"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <UniversityDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Wishlist />
                  </PrivateRoute>
                }
              />
              <Route
                path="/deadlines"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Deadlines />
                  </PrivateRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Applications />
                  </PrivateRoute>
                }
              />

              {/* AI Tools */}
              <Route
                path="/ai-tools"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <AITools />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ai-recommendations"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <AIRecommendations />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ai-sop"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <AISOP />
                  </PrivateRoute>
                }
              />
              <Route
                path="/compare"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <UniversityComparison />
                  </PrivateRoute>
                }
              />

              {/* User Routes */}
              <Route
                path="/profile"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Profile />
                  </PrivateRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}