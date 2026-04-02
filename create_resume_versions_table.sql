-- Run this in your Supabase SQL editor AFTER create_resumes_table.sql

CREATE TABLE IF NOT EXISTS resume_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  version_number INTEGER NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  template TEXT NOT NULL,
  data JSONB NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own resume versions" ON resume_versions;
CREATE POLICY "Users can manage their own resume versions"
  ON resume_versions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Index for fast lookup by resume
DROP INDEX IF EXISTS idx_resume_versions_resume_id;
CREATE INDEX idx_resume_versions_resume_id ON resume_versions(resume_id);
