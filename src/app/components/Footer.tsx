import { Link } from 'react-router-dom';
import { GraduationCap, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="glass-panel border-t border-indigo-100 dark:border-indigo-900/30 text-gray-700 dark:text-gray-300 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">UniHunt AI</span>
            </div>
            <p className="text-sm">Your AI-powered companion for discovering and applying to universities worldwide.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-medium mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm hover:text-indigo-500 transition-colors">About Us</Link>
              <Link to="/how-it-works" className="block text-sm hover:text-indigo-500 transition-colors">How It Works</Link>
            </div>
          </div>

          {/* Resources - removed */}
          <div></div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-medium mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:ayuhirpara@gmail.com" className="hover:text-indigo-500 transition-colors">ayuhirpara@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2026 UniHunt AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}