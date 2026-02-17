import { Users, GraduationCap, FileText, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '125,430', change: '+12.5%', icon: Users, color: 'blue' },
    { label: 'Universities', value: '10,245', change: '+3.2%', icon: GraduationCap, color: 'indigo' },
    { label: 'Applications', value: '45,892', change: '+18.7%', icon: FileText, color: 'green' },
    { label: 'Success Rate', value: '87%', change: '+2.1%', icon: TrendingUp, color: 'orange' },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 8500 },
    { month: 'Feb', users: 9200 },
    { month: 'Mar', users: 10100 },
    { month: 'Apr', users: 11500 },
    { month: 'May', users: 13200 },
    { month: 'Jun', users: 14800 },
  ];

  const applicationData = [
    { country: 'USA', applications: 15200 },
    { country: 'UK', applications: 9800 },
    { country: 'Canada', applications: 7500 },
    { country: 'Australia', applications: 5400 },
    { country: 'Germany', applications: 4100 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Overview of platform analytics and metrics</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Applications by Country */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Applications by Country</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {[
              { user: 'John Doe', action: 'created a new account', time: '2 minutes ago' },
              { user: 'Sarah Smith', action: 'submitted application to MIT', time: '15 minutes ago' },
              { user: 'Mike Johnson', action: 'saved 5 universities', time: '1 hour ago' },
              { user: 'Emma Wilson', action: 'generated SOP for Stanford', time: '2 hours ago' },
              { user: 'David Brown', action: 'completed profile setup', time: '3 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{activity.user}</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
