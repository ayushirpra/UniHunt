import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Applications() {
  const applications = [
    {
      id: '1',
      university: 'Massachusetts Institute of Technology',
      program: 'MS Computer Science',
      status: 'submitted',
      appliedDate: '2026-01-28',
      lastUpdate: '2026-02-01',
      progress: 75,
      documents: {
        sop: true,
        resume: true,
        transcripts: true,
        lor: false,
      },
    },
    {
      id: '2',
      university: 'Stanford University',
      program: 'MS Data Science',
      status: 'in-review',
      appliedDate: '2026-01-25',
      lastUpdate: '2026-02-03',
      progress: 100,
      documents: {
        sop: true,
        resume: true,
        transcripts: true,
        lor: true,
      },
    },
    {
      id: '3',
      university: 'Harvard University',
      program: 'MS Business Analytics',
      status: 'draft',
      appliedDate: '',
      lastUpdate: '2026-02-05',
      progress: 40,
      documents: {
        sop: true,
        resume: false,
        transcripts: true,
        lor: false,
      },
    },
    {
      id: '4',
      university: 'UC Berkeley',
      program: 'MS Artificial Intelligence',
      status: 'accepted',
      appliedDate: '2026-01-15',
      lastUpdate: '2026-02-04',
      progress: 100,
      documents: {
        sop: true,
        resume: true,
        transcripts: true,
        lor: true,
      },
    },
    {
      id: '5',
      university: 'Carnegie Mellon University',
      program: 'MS Software Engineering',
      status: 'waitlisted',
      appliedDate: '2026-01-20',
      lastUpdate: '2026-02-02',
      progress: 100,
      documents: {
        sop: true,
        resume: true,
        transcripts: true,
        lor: true,
      },
    },
  ];

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
    submitted: applications.filter((a) => a.status === 'submitted' || a.status === 'in-review')
      .length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    inProgress: applications.filter((a) => a.status === 'draft').length,
  };

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
                    {application.status === 'draft' ? (
                      <Link
                        to={`/application/${application.id}`}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                      >
                        Continue
                      </Link>
                    ) : (
                      <Link
                        to={`/application/${application.id}`}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                      >
                        View Details
                      </Link>
                    )}
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
