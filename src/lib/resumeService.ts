import { supabase } from './supabase';
import type { Resume, ResumeVersion } from '../types/resume';

export const getResumes = async (): Promise<Resume[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });
  return data || [];
};

export const getResumeById = async (id: string): Promise<Resume | null> => {
  const { data } = await supabase.from('resumes').select('*').eq('id', id).single();
  return data;
};

/**
 * Save resume:
 * - If new: INSERT into resumes, then INSERT version 1
 * - If existing: UPDATE resumes row, then INSERT a new version (never overwrites versions)
 */
export const saveResume = async (resume: Resume): Promise<Resume | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const now = new Date().toISOString();
  let savedResume: Resume | null = null;

  if (resume.id) {
    // Update the main resume row (latest state)
    const { data } = await supabase
      .from('resumes')
      .update({ title: resume.title, template: resume.template, data: resume.data, updated_at: now })
      .eq('id', resume.id)
      .select()
      .single();
    savedResume = data;
  } else {
    // Insert new resume
    const { data } = await supabase
      .from('resumes')
      .insert({ user_id: user.id, title: resume.title, template: resume.template, data: resume.data, updated_at: now })
      .select()
      .single();
    savedResume = data;
  }

  if (!savedResume?.id) return savedResume;

  // Get current version count to assign next version number
  const { count } = await supabase
    .from('resume_versions')
    .select('*', { count: 'exact', head: true })
    .eq('resume_id', savedResume.id);

  await supabase.from('resume_versions').insert({
    resume_id: savedResume.id,
    user_id: user.id,
    version_number: (count ?? 0) + 1,
    title: resume.title,
    template: resume.template,
    data: resume.data,
    saved_at: now,
  });

  return savedResume;
};

export const deleteResume = async (id: string) => {
  // Cascade deletes versions too (via FK ON DELETE CASCADE)
  await supabase.from('resumes').delete().eq('id', id);
};

// --- Versioning ---

export const getVersions = async (resumeId: string): Promise<ResumeVersion[]> => {
  const { data } = await supabase
    .from('resume_versions')
    .select('*')
    .eq('resume_id', resumeId)
    .order('version_number', { ascending: false });
  return data || [];
};

/**
 * Restore a version: updates the main resume row to match the version's data,
 * then saves a NEW version entry so the restore itself is tracked.
 */
export const restoreVersion = async (resumeId: string, version: ResumeVersion): Promise<Resume | null> => {
  return saveResume({
    id: resumeId,
    title: version.title,
    template: version.template,
    data: version.data,
  });
};
