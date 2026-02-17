import { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye, Loader2, AlertCircle as AlertIcon, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export function Applications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in to view your applications');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('applications')
        .select('*, universities(*)')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      const formattedData = data?.map((item: any) => ({
        id: item.id,
        university: item.universities?.name || 'Unknown University',
        program: item.program || 'N/A',
        status: item.status || 'draft',
        appliedDate: item.applied_date,
        lastUpdate: item.updated_at,
        progress: item.progress || 0,
        documents: {
          sop: item.documents_sop || false,
          resume: item.documents_resume || false,
          transcripts: item.documents_transcripts || false,
          lor: item.documents_lor || false,
        },
      })) || [];
      
      setApplications(formattedData);
    } catch (err: any) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);
      
      if (error) throw error;
      
      setApplications(prev => 
        prev.map(app => app.id === applicationId ? { ...app, status: newStatus } : app)
      );
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const deleteApplication = async (applicationId: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId);
      
      if (error) throw error;
      
      setApplications(prev => prev.filter(app => app.id !== applicationId));
    } catch (err: any) {
      alert('Failed to delete application: ' + err.message);
    }
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
      draft: {
        label: 'Draft',
        color: 'text-gray-700',
        bgColor: 'bg-gray-100',
        icon: FileText,
      },
      submitted: {
        label: 'Submitted',
        color: 'text-blue-700',
        bgColor: 'bg-blue-100',
        icon: Clock,
      },
      'in-review': {
        label: 'In Review',
        color: 'text-purple-700',
        bgColor: 'bg-purple-100',
        icon: Eye,
      },
      accepted: {
        label: 'Accepted',
        color: 'text-green-700',
        bgColor: 'bg-green-100',
        icon: CheckCircle,
      },
      rejected: {
        label: 'Rejected',
        color: 'text-red-700',
        bgColor: 'bg-red-100',
        icon: XCircle,
      },
      waitlisted: {
        label: 'Waitlisted',
        color: 'text-orange-700',
        bgColor: 'bg-orange-100',
        icon: AlertCircle,
      },
    };
    return configs[status] || configs.draft;
  };

  const stats = {
    total: applications.length,
    submitted: applications.filter((a) => a.status === 'submitted' || a.status === 'in-review' || a.status === 'Under Review')
      .length,
    accepted: applications.filter((a) => a.status === 'accepted' || a.status === 'Accepted').length,
    inProgress: applications.filter((a) => a.status === 'draft' || a.status === 'In Progress').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading applications...</p>
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
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-2">Failed to load applications</h3>
            <p className="text-red-700 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchApplications}
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Applications</h1>
          <p className="text-gray-600 dark:text-gray-400">Track the status of all your university applications</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Applications</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Submitted</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.submitted}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Accepted</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.accepted}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">In Progress</div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.inProgress}</div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((application) => {
            const statusConfig = getStatusConfig(application.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={application.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        to={`/university/${application.id}`}
                        className="text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {application.university}
                      </Link>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.color}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig.label}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{application.program}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Application Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">{application.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all"
                          style={{ width: `${application.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Documents Checklist */}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Documents:</span>
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex items-center gap-1 ${
                            application.documents.sop ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'
                          }`}
                        >
                          {application.documents.sop ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          SOP
                        </span>
                        <span
                          className={`flex items-center gap-1 ${
                            application.documents.resume ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'
                          }`}
                        >
                          {application.documents.resume ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          Resume
                        </span>
                        <span
                          className={`flex items-center gap-1 ${
                            application.documents.transcripts ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'
                          }`}
                        >
                          {application.documents.transcripts ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          Transcripts
                        </span>
                        <span
                          className={`flex items-center gap-1 ${
                            application.documents.lor ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-600'
                          }`}
                        >
                          {application.documents.lor ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          LOR
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <select
                      value={application.status}
                      onChange={(e) => updateStatus(application.id, e.target.value)}
                      className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 outline-none"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Waitlisted">Waitlisted</option>
                    </select>
                    <button
                      onClick={() => deleteApplication(application.id)}
                      className="px-4 py-2 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                      {application.appliedDate && (
                        <div>Applied: {new Date(application.appliedDate).toLocaleDateString()}</div>
                      )}
                      <div>
                        Updated: {new Date(application.lastUpdate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
            <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No applications yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start applying to universities from your wishlist
            </p>
            <Link
              to="/wishlist"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View Wishlist
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
