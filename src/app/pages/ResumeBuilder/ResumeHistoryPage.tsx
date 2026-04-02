import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Clock, RotateCcw, Loader2, History, ChevronDown, ChevronUp } from 'lucide-react';
import { getVersions, restoreVersion, getResumeById } from '../../../lib/resumeService';
import type { ResumeVersion, Resume } from '../../../types/resume';

export function ResumeHistoryPage() {
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resumeId = searchParams.get('id');

  useEffect(() => {
    if (!resumeId) return;
    Promise.all([getResumeById(resumeId), getVersions(resumeId)]).then(([r, v]) => {
      setResume(r);
      setVersions(v);
      setLoading(false);
    });
  }, [resumeId]);

  const handleRestore = async (version: ResumeVersion) => {
    if (!resumeId) return;
    if (!confirm(`Restore Version ${version.version_number}? This will update your resume and save a new version.`)) return;
    setRestoringId(version.id);
    await restoreVersion(resumeId, version);
    // Reload versions to show the new restore entry
    const updated = await getVersions(resumeId);
    setVersions(updated);
    setRestoringId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/my-resumes')}
            className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> My Resumes
          </button>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-3">
            <History className="w-4 h-4" />
            Version History
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {resume?.title || 'Resume'} — History
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {versions.length} version{versions.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        {versions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <History className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No versions saved yet. Click Save in the builder to create one.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {versions.map((version, index) => {
              const isLatest = index === 0;
              const isExpanded = expandedId === version.id;
              const { personal, education, experience, skills, projects } = version.data;

              return (
                <div key={version.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Version Header */}
                  <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
                        isLatest
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        v{version.version_number}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            Version {version.version_number}
                          </p>
                          {isLatest && (
                            <span className="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                              Latest
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(version.saved_at).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isLatest && (
                        <button
                          onClick={() => handleRestore(version)}
                          disabled={!!restoringId}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors disabled:opacity-50">
                          {restoringId === version.id
                            ? <Loader2 className="w-3 h-3 animate-spin" />
                            : <RotateCcw className="w-3 h-3" />}
                          Restore
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/resume-builder?id=${resumeId}`)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : version.id)}
                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded snapshot */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 dark:border-gray-700 px-5 py-4 bg-gray-50 dark:bg-gray-900/50">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Personal</p>
                          <p className="text-gray-900 dark:text-white font-medium">{personal.name || '—'}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">{personal.email}</p>
                          {personal.location && <p className="text-gray-500 dark:text-gray-400 text-xs">{personal.location}</p>}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Template</p>
                          <p className="text-gray-900 dark:text-white capitalize">{version.template}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{version.title}</p>
                        </div>
                        {experience.filter(e => e.company).length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Experience</p>
                            {experience.filter(e => e.company).map((exp, i) => (
                              <p key={i} className="text-gray-700 dark:text-gray-300 text-xs">{exp.role} at {exp.company}</p>
                            ))}
                          </div>
                        )}
                        {skills.filter(Boolean).length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Skills</p>
                            <p className="text-gray-700 dark:text-gray-300 text-xs">{skills.filter(Boolean).join(', ')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
