import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Deadlines() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'urgent'>('all');

  const deadlines = [
    {
      id: '1',
      university: 'Massachusetts Institute of Technology',
      program: 'MS Computer Science',
      deadline: '2026-02-15',
      daysLeft: 9,
      status: 'urgent',
      completed: false,
    },
    {
      id: '2',
      university: 'Stanford University',
      program: 'MS Data Science',
      deadline: '2026-02-20',
      daysLeft: 14,
      status: 'urgent',
      completed: false,
    },
    {
      id: '3',
      university: 'Harvard University',
      program: 'MS Business Analytics',
      deadline: '2026-03-01',
      daysLeft: 23,
      status: 'upcoming',
      completed: false,
    },
    {
      id: '4',
      university: 'UC Berkeley',
      program: 'MS Artificial Intelligence',
      deadline: '2026-03-15',
      daysLeft: 37,
      status: 'upcoming',
      completed: false,
    },
    {
      id: '5',
      university: 'Carnegie Mellon University',
      program: 'MS Software Engineering',
      deadline: '2026-01-31',
      daysLeft: -6,
      status: 'completed',
      completed: true,
    },
  ];

  const filteredDeadlines = deadlines.filter((deadline) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return deadline.status === 'upcoming' && !deadline.completed;
    if (filter === 'urgent') return deadline.status === 'urgent' && !deadline.completed;
    return true;
  });

  const urgentCount = deadlines.filter((d) => d.status === 'urgent' && !d.completed).length;
  const upcomingCount = deadlines.filter((d) => d.status === 'upcoming' && !d.completed).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Application Deadlines</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage all your application deadlines</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Urgent (≤14 days)</h3>
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
            </div>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">{urgentCount}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</h3>
              <Clock className="w-5 h-5 text-orange-500 dark:text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{upcomingCount}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</h3>
              <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
            </div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {deadlines.filter((d) => d.completed).length}
            </div>
          </div>
        </div>

        {/* Filters and View Mode */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All ({deadlines.length})
            </button>
            <button
              onClick={() => setFilter('urgent')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'urgent'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Urgent ({urgentCount})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'upcoming'
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Upcoming ({upcomingCount})
            </button>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list' ? 'bg-white dark:bg-gray-800 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded ${
                viewMode === 'calendar' ? 'bg-white dark:bg-gray-800 shadow-sm' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <CalendarIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 border-l-4 ${
                  deadline.completed
                    ? 'border-green-500 dark:border-green-400'
                    : deadline.status === 'urgent'
                    ? 'border-red-500 dark:border-red-400'
                    : 'border-orange-500 dark:border-orange-400'
                } border-r border-t border-b border-gray-200 dark:border-gray-700`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={deadline.completed}
                        className="w-5 h-5 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:bg-gray-900 mt-1"
                        readOnly
                      />
                      <div className="flex-1">
                        <Link
                          to={`/university/${deadline.id}`}
                          className="text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 mb-1 block"
                        >
                          {deadline.university}
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{deadline.program}</p>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{formatDate(deadline.deadline)}</span>
                          </div>
                          {!deadline.completed && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                              <span
                                className={`font-medium ${
                                  deadline.status === 'urgent'
                                    ? 'text-red-600 dark:text-red-400'
                                    : 'text-orange-600 dark:text-orange-400'
                                }`}
                              >
                                {deadline.daysLeft > 0
                                  ? `${deadline.daysLeft} days left`
                                  : 'Expired'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {deadline.completed ? (
                      <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium">
                        Submitted
                      </span>
                    ) : deadline.status === 'urgent' ? (
                      <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium">
                        Urgent
                      </span>
                    ) : (
                      <Link
                        to={`/applications`}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                      >
                        Start Application
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredDeadlines.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
                <CalendarIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No deadlines found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {filter === 'all'
                    ? 'Add universities to your wishlist to track their deadlines'
                    : `No ${filter} deadlines at the moment`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">February 2026</h2>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  Previous
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  Next
                </button>
              </div>
            </div>

            {/* Simple Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNumber = i - 5;
                const hasDeadline = [15, 20].includes(dayNumber);
                return (
                  <div
                    key={i}
                    className={`aspect-square p-2 border border-gray-200 dark:border-gray-700 rounded-lg ${
                      dayNumber > 0 && dayNumber <= 28
                        ? hasDeadline
                          ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        : 'bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    {dayNumber > 0 && dayNumber <= 28 && (
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{dayNumber}</div>
                    )}
                    {hasDeadline && (
                      <div className="mt-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Deadlines this month</h3>
              <div className="space-y-2">
                {deadlines
                  .filter((d) => !d.completed && d.daysLeft > 0 && d.daysLeft < 30)
                  .map((deadline) => (
                    <div key={deadline.id} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                      <span className="font-medium text-gray-900 dark:text-white">{formatDate(deadline.deadline)}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {deadline.university} - {deadline.program}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
