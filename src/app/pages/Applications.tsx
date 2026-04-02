import { useState, useEffect } from 'react';
import {
  Loader2, AlertCircle, Plus, X, FileText, Clock, CheckCircle,
  XCircle, Star, Bookmark, ChevronDown, Calendar, StickyNote, Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────
type AppStatus = 'Interested' | 'Applied' | 'Shortlisted' | 'Accepted' | 'Rejected';

interface Application {
  id: string;
  university_id: string;
  university_name: string;
  status: AppStatus;
  applied_date: string | null;
  deadline: string | null;
  notes: string;
  created_at: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUSES: AppStatus[] = ['Interested', 'Applied', 'Shortlisted', 'Accepted', 'Rejected'];

const STATUS_CONFIG: Record<AppStatus, { color: string; bg: string; border: string; icon: any }> = {
  Interested: { color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-100 dark:bg-gray-700', border: 'border-gray-300 dark:border-gray-600', icon: Bookmark },
  Applied:    { color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/30', border: 'border-blue-300 dark:border-blue-600', icon: Clock },
  Shortlisted:{ color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-50 dark:bg-purple-900/30', border: 'border-purple-300 dark:border-purple-600', icon: Star },
  Accepted:   { color: 'text-green-700 dark:text-green-300', bg: 'bg-green-50 dark:bg-green-900/30', border: 'border-green-300 dark:border-green-600', icon: CheckCircle },
  Rejected:   { color: 'text-red-700 dark:text-red-300', bg: 'bg-red-50 dark:bg-red-900/30', border: 'border-red-300 dark:border-red-600', icon: XCircle },
};

// Days until deadline helper
function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ─── Application Card ─────────────────────────────────────────────────────────
function AppCard({
  app,
  onStatusChange,
  onNotesChange,
  onDelete,
}: {
  app: Application;
  onStatusChange: (id: string, status: AppStatus) => void;
  onNotesChange: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}) {
  const [editingNotes, setEditingNotes] = useState(false);
  const [noteDraft, setNoteDraft] = useState(app.notes);
  const days = daysUntil(app.deadline);
  const cfg = STATUS_CONFIG[app.status];
  const Icon = cfg.icon;

  const deadlineColor =
    days === null ? '' :
    days < 0 ? 'text-red-600 dark:text-red-400' :
    days <= 7 ? 'text-orange-600 dark:text-orange-400' :
    days <= 30 ? 'text-yellow-600 dark:text-yellow-400' :
    'text-gray-500 dark:text-gray-400';

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border ${cfg.border} p-4 shadow-sm hover:shadow-md transition-shadow`}>
      {/* University name */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <Link
          to={`/university/${app.university_id}`}
          className="font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 text-sm leading-tight line-clamp-2"
        >
          {app.university_name}
        </Link>
        <button
          onClick={() => onDelete(app.id)}
          className="shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Status badge */}
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${cfg.bg} ${cfg.color}`}>
        <Icon className="w-3.5 h-3.5" />
        {app.status}
      </div>

      {/* Deadline */}
      {app.deadline && (
        <div className={`flex items-center gap-1.5 text-xs mb-3 ${deadlineColor}`}>
          <Calendar className="w-3.5 h-3.5" />
          {days !== null && days < 0
            ? 'Deadline passed'
            : days === 0
            ? '⚠️ Due today!'
            : days !== null && days <= 7
            ? `⚠️ ${days}d left`
            : `Deadline: ${new Date(app.deadline).toLocaleDateString()}`}
        </div>
      )}

      {/* Notes */}
      <div className="mb-3">
        {editingNotes ? (
          <div>
            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              className="w-full text-xs p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:ring-1 focus:ring-indigo-500 outline-none"
              rows={3}
              placeholder="Add notes..."
            />
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => { onNotesChange(app.id, noteDraft); setEditingNotes(false); }}
                className="text-xs px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
              <button
                onClick={() => { setNoteDraft(app.notes); setEditingNotes(false); }}
                className="text-xs px-2 py-1 text-gray-600 dark:text-gray-400 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setEditingNotes(true)}
            className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <StickyNote className="w-3.5 h-3.5" />
            {app.notes ? app.notes.slice(0, 50) + (app.notes.length > 50 ? '…' : '') : 'Add notes'}
          </button>
        )}
      </div>

      {/* Move to status */}
      <div className="relative">
        <select
          value={app.status}
          onChange={(e) => onStatusChange(app.id, e.target.value as AppStatus)}
          className="w-full text-xs px-3 py-1.5 pr-7 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg appearance-none focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<AppStatus | 'All'>('All');
  const [sortBy, setSortBy] = useState<'deadline' | 'created'>('deadline');

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setError('Please log in to view your applications'); return; }

      const { data, error: dbErr } = await supabase
        .from('applications')
        .select('*, universities(name)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (dbErr) throw dbErr;

      setApplications(
        (data || []).map((item: any) => ({
          id: item.id,
          university_id: item.university_id,
          university_name: item.universities?.name || 'Unknown University',
          status: item.status || 'Interested',
          applied_date: item.applied_date,
          deadline: item.deadline,
          notes: item.notes || '',
          created_at: item.created_at,
        }))
      );
    } catch (err: any) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: AppStatus) => {
    const { error } = await supabase.from('applications').update({ status }).eq('id', id);
    if (!error) setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
  };

  const updateNotes = async (id: string, notes: string) => {
    const { error } = await supabase.from('applications').update({ notes }).eq('id', id);
    if (!error) setApplications((prev) => prev.map((a) => a.id === id ? { ...a, notes } : a));
  };

  const deleteApplication = async (id: string) => {
    if (!confirm('Delete this application?')) return;
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (!error) setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // Filter + sort
  const filtered = applications
    .filter((a) => filterStatus === 'All' || a.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'deadline') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  // Group by status for Kanban
  const byStatus = STATUSES.reduce((acc, s) => {
    acc[s] = filtered.filter((a) => a.status === s);
    return acc;
  }, {} as Record<AppStatus, Application[]>);

  const stats = {
    total: applications.length,
    accepted: applications.filter((a) => a.status === 'Accepted').length,
    applied: applications.filter((a) => a.status === 'Applied').length,
    upcoming: applications.filter((a) => { const d = daysUntil(a.deadline); return d !== null && d >= 0 && d <= 30; }).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-2">Failed to load</h3>
          <p className="text-red-700 dark:text-red-400 mb-4">{error}</p>
          <button onClick={fetchApplications} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Application Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your university application journey</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'text-gray-900 dark:text-white' },
            { label: 'Applied', value: stats.applied, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Accepted', value: stats.accepted, color: 'text-green-600 dark:text-green-400' },
            { label: 'Deadlines (30d)', value: stats.upcoming, color: 'text-orange-600 dark:text-orange-400' },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{s.label}</div>
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {(['All', ...STATUSES] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === s
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-400'
                }`}
              >
                {s} {s !== 'All' && `(${applications.filter((a) => a.status === s).length})`}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="deadline">By Deadline</option>
              <option value="created">By Date Added</option>
            </select>
          </div>
        </div>

        {/* Empty state */}
        {applications.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
            <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No applications yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Click "Track" on any university card to start tracking your applications.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Browse Universities
            </Link>
          </div>
        )}

        {/* Kanban Board */}
        {applications.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STATUSES.map((status) => {
              const cfg = STATUS_CONFIG[status];
              const Icon = cfg.icon;
              const cards = byStatus[status];

              return (
                <div key={status} className="flex flex-col">
                  {/* Column header */}
                  <div className={`flex items-center gap-2 px-3 py-2.5 rounded-t-xl border-b-2 ${cfg.bg} ${cfg.border}`}>
                    <Icon className={`w-4 h-4 ${cfg.color}`} />
                    <span className={`text-sm font-semibold ${cfg.color}`}>{status}</span>
                    <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/20 ${cfg.color}`}>
                      {cards.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className={`flex-1 min-h-[200px] p-2 rounded-b-xl space-y-3 ${cfg.bg} border ${cfg.border} border-t-0`}>
                    {cards.length === 0 && (
                      <div className="flex items-center justify-center h-20 text-xs text-gray-400 dark:text-gray-500">
                        No applications
                      </div>
                    )}
                    {cards.map((app) => (
                      <AppCard
                        key={app.id}
                        app={app}
                        onStatusChange={updateStatus}
                        onNotesChange={updateNotes}
                        onDelete={deleteApplication}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
