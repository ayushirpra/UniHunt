import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Trash2, Edit, Loader2, Clock, History } from 'lucide-react';
import { getResumes, deleteResume } from '../../../lib/resumeService';
import type { Resume } from '../../../types/resume';

const templateColors: Record<string, string> = {
  modern: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
  classic: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  minimal: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
};

export function MyResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getResumes().then(data => {
      setResumes(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resume and all its versions?')) return;
    setDeletingId(id);
    await deleteResume(id);
    setResumes(prev => prev.filter(r => r.id !== id));
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-3">
              <FileText className="w-4 h-4" />
              Resume Builder
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Resumes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {resumes.length > 0 ? `${resumes.length} resume${resumes.length > 1 ? 's' : ''}` : 'Create and manage your resumes'}
            </p>
          </div>
          <button
            onClick={() => navigate('/resume-builder')}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            <Plus className="w-4 h-4" />
            New Resume
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-900 dark:text-white font-medium mb-1">No resumes yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Create your first resume to get started</p>
            <button
              onClick={() => navigate('/resume-builder')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus className="w-4 h-4" /> Create Resume
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map(resume => (
              <div key={resume.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex flex-col hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">

                {/* Card Top */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">{resume.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${templateColors[resume.template] ?? templateColors.minimal}`}>
                        {resume.template}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(resume.id!)}
                    disabled={deletingId === resume.id}
                    className="p-1.5 text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0 ml-2">
                    {deletingId === resume.id
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Name & Date */}
                {resume.data?.personal?.name && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 truncate">{resume.data.personal.name}</p>
                )}
                <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-4">
                  <Clock className="w-3 h-3" />
                  {resume.updated_at
                    ? `Updated ${new Date(resume.updated_at).toLocaleDateString()}`
                    : `Created ${new Date(resume.created_at!).toLocaleDateString()}`}
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => navigate(`/resume-builder?id=${resume.id}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm">
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => navigate(`/resume-history?id=${resume.id}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm">
                    <History className="w-3.5 h-3.5" /> History
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
