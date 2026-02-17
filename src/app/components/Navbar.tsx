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
    { path: '/deadlines', label: 'Deadlines' },
    { path: '/applications', label: 'Applications' },
  ];

  const aiTools = [
    { path: '/ai-recommendations', label: 'University Matcher', icon: Brain, available: true },
    { path: '/ai-sop', label: 'SOP Generator', icon: FileText, available: true },
    { path: '/ai-resume', label: 'Resume Builder', icon: User, available: false },
    { path: '/ai-interview', label: 'Interview Prep', icon: MessageSquare, available: false },
  ];

  const links = isAuthenticated ? appLinks : publicLinks;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">UniHunt AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors ${
                  isActive(link.path)
                    ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* AI Tools Dropdown */}
            {isAuthenticated && (
              <div className="relative"
                onMouseEnter={() => setAiToolsOpen(true)}
                onMouseLeave={() => setAiToolsOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  AI Tools
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {aiToolsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                    <Link
                      to="/ai-tools"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        View All AI Tools
                      </div>
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                    {aiTools.map((tool) => (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <tool.icon className="w-4 h-4" />
                            {tool.label}
                          </div>
                          {!tool.available && (
                            <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full">
                              Soon
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <ThemeToggle />
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm px-2 py-1 ${
                    isActive(link.path)
                      ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* AI Tools in Mobile */}
              {isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                    <div className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-gray-900 dark:text-white">
                      <Sparkles className="w-4 h-4" />
                      AI Tools
                    </div>
                    <div className="ml-6 mt-2 flex flex-col gap-2">
                      <Link
                        to="/ai-tools"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm px-2 py-1 text-gray-600 dark:text-gray-300"
                      >
                        View All AI Tools
                      </Link>
                      {aiTools.map((tool) => (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm px-2 py-1 text-gray-600 dark:text-gray-300 flex items-center justify-between"
                        >
                          <span>{tool.label}</span>
                          {!tool.available && (
                            <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full">
                              Soon
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex flex-col gap-2">
                {/* Theme Toggle in Mobile */}
                <div className="px-2 py-1">
                  <ThemeToggle />
                </div>
                
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm px-2 py-1 text-gray-700 dark:text-gray-300"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        onLogout?.();
                        setMobileMenuOpen(false);
                      }}
                      className="text-sm px-2 py-1 text-gray-700 dark:text-gray-300 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm px-2 py-1 text-gray-700 dark:text-gray-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm px-2 py-1 text-indigo-600 dark:text-indigo-400"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}