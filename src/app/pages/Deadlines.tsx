import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle, Grid, List, Loader2, AlertCircle as AlertIcon, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export function Deadlines() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'urgent'>('all');
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDeadline, setNewDeadline] = useState({
    title: '',
    deadline_date: '',
    description: '',
    priority: 'medium'
  });

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const fetchDeadlines = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in to view deadlines');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('deadlines')
        .select('*, universities(name)')
        .eq('user_id', user.id)
        .order('deadline_date', { ascending: true });
      
      if (error) throw error;
      
      const formattedData = data?.map((item: any) => {
        const deadlineDate = new Date(item.deadline_date);
        const today = new Date();
        const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        let status = 'upcoming';
        if (item.is_completed) status = 'completed';
        else if (daysLeft < 0) status = 'overdue';
        else if (daysLeft <= 7) status = 'urgent';
        
        return {
          id: item.id,
          university: item.universities?.name || item.title,
          program: item.description || '',
          deadline: item.deadline_date,
          daysLeft,
          status,
          completed: item.is_completed || false,
          priority: item.priority || 'medium'
        };
      }) || [];
      
      setDeadlines(formattedData);
    } catch (err: any) {
      setError(err.message || 'Failed to load deadlines');
    } finally {
      setLoading(false);
    }
  };

  const addDeadline = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from('deadlines').insert({
        user_id: user.id,
        title: newDeadline.title,
        deadline_date: newDeadline.deadline_date,
        description: newDeadline.description,
        priority: newDeadline.priority,
        is_completed: false
      });
      
      if (error) throw error;
      
      setNewDeadline({ title: '', deadline_date: '', description: '', priority: 'medium' });
      setShowAddForm(false);
      fetchDeadlines();
    } catch (err: any) {
      alert('Failed to add deadline: ' + err.message);
    }
  };

  const toggleComplete = async (deadlineId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('deadlines')
        .update({ is_completed: !currentStatus })
        .eq('id', deadlineId);
      
      if (error) throw error;
      
      fetchDeadlines();
    } catch (err: any) {
      alert('Failed to update deadline: ' + err.message);
    }
  };

  const deleteDeadline = async (deadlineId: string) => {
    if (!confirm('Are you sure you want to delete this deadline?')) return;
    
    try {
      const { error } = await supabase
        .from('deadlines')
        .delete()
        .eq('id', deadlineId);
      
      if (error) throw error;
      
      fetchDeadlines();
    } catch (err: any) {
      alert('Failed to delete deadline: ' + err.message);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading deadlines...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
            <AlertIcon className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-2">Failed to load deadlines</h3>
            <p className="text-red-700 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchDeadlines}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Application Deadlines</h1>
              <p className="text-gray-600 dark:text-gray-400">Track and manage all your application deadlines</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Deadline
            </button>
          </div>
        </div>

        {/* Add Deadline Form */}
        {showAddForm && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Deadline</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={newDeadline.title}
                onChange={(e) => setNewDeadline({...newDeadline, title: e.target.value})}
                className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="date"
                value={newDeadline.deadline_date}
                onChange={(e) => setNewDeadline({...newDeadline, deadline_date: e.target.value})}
                className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="text"
                placeholder="Description"
                value={newDeadline.description}
                onChange={(e) => setNewDeadline({...newDeadline, description: e.target.value})}
                className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <select
                value={newDeadline.priority}
                onChange={(e) => setNewDeadline({...newDeadline, priority: e.target.value})}
                className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={addDeadline}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Urgent (≤7 days)</h3>
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

        {/* Filters */}
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
        </div>

        {/* List View */}
        <div className="space-y-4">
          {filteredDeadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 border-l-4 ${
                deadline.completed
                  ? 'border-green-500 dark:border-green-400'
                  : deadline.status === 'urgent' || deadline.status === 'overdue'
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
                      onChange={() => toggleComplete(deadline.id, deadline.completed)}
                      className="w-5 h-5 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:bg-gray-900 mt-1"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {deadline.university}
                      </h3>
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
                                  : deadline.status === 'overdue'
                                  ? 'text-red-700 dark:text-red-500'
                                  : 'text-orange-600 dark:text-orange-400'
                              }`}
                            >
                              {deadline.daysLeft > 0
                                ? `${deadline.daysLeft} days left`
                                : deadline.daysLeft === 0
                                ? 'Today'
                                : 'Overdue'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => deleteDeadline(deadline.id)}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {deadline.completed ? (
                    <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium">
                      Completed
                    </span>
                  ) : deadline.status === 'urgent' || deadline.status === 'overdue' ? (
                    <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium">
                      {deadline.status === 'overdue' ? 'Overdue' : 'Urgent'}
                    </span>
                  ) : (
                    <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-sm font-medium">
                      Upcoming
                    </span>
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
                  ? 'Add deadlines to track your application dates'
                  : `No ${filter} deadlines at the moment`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
