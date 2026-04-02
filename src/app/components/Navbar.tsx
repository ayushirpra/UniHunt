import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, User, LogOut, Brain, FileText, MessageSquare, Sparkles, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function Navbar({ isAuthenticated = false, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
  ];

  const appLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/search', label: 'Search' },
    { path: '/wishlist', label: 'Wishlist' },
    { path: '/applications', label: 'Tracker' },
    { path: '/compare', label: 'Compare' },
  ];

  const aiTools = [
    { path: '/ai-recommendations', label: 'University Matcher', icon: Brain, available: true },
    { path: '/ai-sop', label: 'SOP Generator', icon: FileText, available: true },
    { path: '/my-resumes', label: 'Resume Builder', icon: User, available: true },
    { path: '/ai-interview', label: 'Interview Prep', icon: MessageSquare, available: false },
  ];

  const links = isAuthenticated ? appLinks : publicLinks;

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-200 dark:shadow-indigo-900/40 group-hover:shadow-lg group-hover:shadow-indigo-300 dark:group-hover:shadow-indigo-800/50 transition-all duration-300">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">UniHunt AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* AI Tools Dropdown */}
            {isAuthenticated && (
              <div
                className="relative"
                onMouseEnter={() => setAiToolsOpen(true)}
                onMouseLeave={() => setAiToolsOpen(false)}
              >
                <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  aiToolsOpen
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Tools
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aiToolsOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                <div className={`absolute top-full left-0 mt-1.5 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl shadow-gray-200/60 dark:shadow-gray-900/60 border border-gray-100 dark:border-gray-700 py-1.5 transition-all duration-200 ${
                  aiToolsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}>
                  <Link
                    to="/ai-tools"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mx-1 rounded-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    View All AI Tools
                  </Link>
                  <div className="h-px bg-gray-100 dark:bg-gray-700 mx-3 my-1" />
                  {aiTools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mx-1 rounded-lg"
                    >
                      <div className="flex items-center gap-2.5">
                        <tool.icon className="w-4 h-4" />
                        {tool.label}
                      </div>
                      {!tool.available && (
                        <span className="text-xs px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-md font-medium">
                          Soon
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary px-5 py-2 text-sm font-semibold text-white rounded-xl"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 dark:border-gray-800 animate-slide-down">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    AI Tools
                  </div>
                  {aiTools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <tool.icon className="w-4 h-4 text-indigo-500" />
                        {tool.label}
                      </div>
                      {!tool.available && (
                        <span className="text-xs px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-md">
                          Soon
                        </span>
                      )}
                    </Link>
                  ))}
                </>
              )}

              <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                <ThemeToggle />
              </div>

              {isAuthenticated ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <button onClick={() => { onLogout?.(); setMobileMenuOpen(false); }} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2 pt-1">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center btn-primary px-4 py-2.5 rounded-xl text-sm font-semibold text-white">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
