import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  FileText,
  Heart,
  TrendingUp,
  CheckCircle,
  Target,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function Dashboard() {
  const [userName, setUserName] = useState('Student');
  const [stats, setStats] = useState({
    wishlist: 0,
    applications: 0,
    deadlines: 0,
    accepted: 0,
  });
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch user name
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      if (profile?.full_name) setUserName(profile.full_name);

      // Fetch stats
      const [wishlistRes, appsRes, deadlinesRes, acceptedRes] = await Promise.all([
        supabase.from('wishlist').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('applications').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('deadlines').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('is_completed', false),
        supabase.from('applications').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'Accepted'),
      ]);

      setStats({
        wishlist: wishlistRes.count || 0,
        applications: appsRes.count || 0,
        deadlines: deadlinesRes.count || 0,
        accepted: acceptedRes.count || 0,
      });

      // Fetch recent applications
      const { data: apps } = await supabase
        .from('applications')
        .select('*, universities(name)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);
      setRecentApplications(apps || []);

      // Fetch upcoming deadlines
      const { data: deadlines } = await supabase
        .from('deadlines')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_completed', false)
        .order('deadline_date', { ascending: true })
        .limit(3);
      setUpcomingDeadlines(deadlines || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysLeft = (dateString: string) => {
    const deadline = new Date(dateString);
    const today = new Date();
    return Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      'Not Started': 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      'In Progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      'Submitted': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      'Under Review': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
      'Accepted': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      'Rejected': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      'Waitlisted': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    };
    return colors[status] || colors['Not Started'];
  };

  const recommendations = [
    { name: 'Carnegie Mellon', match: '92%', location: 'USA' },
    { name: 'ETH Zurich', match: '88%', location: 'Switzerland' },
    { name: 'TU Munich', match: '85%', location: 'Germany' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-down">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {userName}!</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's your application progress and recommendations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stagger-item bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-red-500 transition-transform duration-300 hover:scale-110">
                <Heart className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1 animate-count-up">{stats.wishlist}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Universities Saved</div>
          </div>
          <div className="stagger-item bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-blue-500 transition-transform duration-300 hover:scale-110">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1 animate-count-up">{stats.applications}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Applications</div>
          </div>
          <div className="stagger-item bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-orange-500 transition-transform duration-300 hover:scale-110">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1 animate-count-up">{stats.deadlines}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming Deadlines</div>
          </div>
          <div className="stagger-item bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-green-500 transition-transform duration-300 hover:scale-110">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1 animate-count-up">{stats.accepted}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Accepted</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-slide-up">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  to="/search"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 hover:scale-105 active:scale-95 btn-ripple"
                >
                  <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 hover:rotate-12" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Search</span>
                </Link>
                <Link
                  to="/ai-recommendations"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 hover:scale-105 active:scale-95 btn-ripple"
                >
                  <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 hover:rotate-12" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">AI Match</span>
                </Link>
                <Link
                  to="/ai-sop"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 hover:scale-105 active:scale-95 btn-ripple"
                >
                  <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 hover:rotate-12" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">SOP</span>
                </Link>
                <Link
                  to="/deadlines"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 hover:scale-105 active:scale-95 btn-ripple"
                >
                  <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 hover:rotate-12" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Deadlines</span>
                </Link>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Deadlines</h2>
                <Link to="/deadlines" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingDeadlines.length > 0 ? (
                  upcomingDeadlines.map((item) => {
                    const daysLeft = getDaysLeft(item.deadline_date);
                    return (
                      <div
                        key={item.id}
                        className="flex items-start justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(item.deadline_date)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                              daysLeft <= 7
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 animate-pulse-slow'
                                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                            }`}
                          >
                            {daysLeft} days
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">No upcoming deadlines</p>
                )}
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Applications</h2>
                <Link to="/applications" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recentApplications.length > 0 ? (
                  recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">{app.universities?.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{app.program}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">No applications yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" />
                <h2 className="text-lg font-semibold">AI Recommendations</h2>
              </div>
              <p className="text-indigo-100 text-sm mb-4">
                Based on your profile, we found these perfect matches
              </p>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{rec.name}</span>
                      <span className="text-sm bg-white/20 px-2 py-0.5 rounded">{rec.match}</span>
                    </div>
                    <span className="text-sm text-indigo-100">{rec.location}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/ai-recommendations"
                className="block mt-4 text-center py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
              >
                View All Matches
              </Link>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Application Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Profile Complete</span>
                    <span className="font-medium text-gray-900 dark:text-white">80%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-4/5 progress-bar" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Documents Ready</span>
                    <span className="font-medium text-gray-900 dark:text-white">60%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-3/5 progress-bar" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Applications Sent</span>
                    <span className="font-medium text-gray-900 dark:text-white">40%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-2/5 progress-bar" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-900 dark:text-amber-300 mb-1">Pro Tip</h3>
                  <p className="text-sm text-amber-800 dark:text-amber-400">
                    Complete your profile to increase your chances of getting personalized recommendations!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}