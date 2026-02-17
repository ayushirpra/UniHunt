import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  FileText,
  Heart,
  TrendingUp,
  Bell,
  CheckCircle,
  Clock,
  Target,
  Sparkles,
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Universities Saved', value: '12', icon: Heart, color: 'text-red-500' },
    { label: 'Applications', value: '5', icon: FileText, color: 'text-blue-500' },
    { label: 'Upcoming Deadlines', value: '3', icon: Calendar, color: 'text-orange-500' },
    { label: 'Match Score', value: '85%', icon: TrendingUp, color: 'text-green-500' },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Saved',
      university: 'MIT',
      time: '2 hours ago',
      icon: Heart,
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 2,
      action: 'Completed SOP for',
      university: 'Stanford',
      time: '5 hours ago',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 3,
      action: 'Application submitted to',
      university: 'Harvard',
      time: '1 day ago',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
    },
  ];

  const upcomingDeadlines = [
    { university: 'Stanford University', program: 'MS Computer Science', deadline: 'Feb 15, 2026', daysLeft: 9 },
    { university: 'MIT', program: 'MS Data Science', deadline: 'Feb 20, 2026', daysLeft: 14 },
    { university: 'UC Berkeley', program: 'MS AI', deadline: 'Mar 1, 2026', daysLeft: 23 },
  ];

  const recommendations = [
    { name: 'Carnegie Mellon', match: '92%', location: 'USA' },
    { name: 'ETH Zurich', match: '88%', location: 'Switzerland' },
    { name: 'TU Munich', match: '85%', location: 'Germany' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, Student!</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's your application progress and recommendations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-900 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  to="/search"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                >
                  <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Search</span>
                </Link>
                <Link
                  to="/ai-recommendations"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                >
                  <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">AI Match</span>
                </Link>
                <Link
                  to="/ai-sop"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                >
                  <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">SOP</span>
                </Link>
                <Link
                  to="/deadlines"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                >
                  <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
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
                {upcomingDeadlines.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{item.university}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.program}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {item.deadline}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.daysLeft <= 10
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                        }`}
                      >
                        {item.daysLeft} days
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${activity.color}`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {activity.action} <span className="font-medium">{activity.university}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
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
                    <div className="h-full bg-indigo-600 w-4/5" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Documents Ready</span>
                    <span className="font-medium text-gray-900 dark:text-white">60%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-3/5" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Applications Sent</span>
                    <span className="font-medium text-gray-900 dark:text-white">40%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-2/5" />
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