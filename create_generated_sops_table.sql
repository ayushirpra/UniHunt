-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS generated_sops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  university_name TEXT NOT NULL,
  program TEXT NOT NULL,
  background TEXT,
  sop_content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE generated_sops ENABLE ROW LEVEL SECURITY;

-- Users can only access their own SOPs
DROP POLICY IF EXISTS "Users can manage their own SOPs" ON generated_sops;
CREATE POLICY "Users can manage their own SOPs"
  ON generated_sops
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
