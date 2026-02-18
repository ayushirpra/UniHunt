-- Add logo_url column if it doesn't exist
ALTER TABLE universities ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Update all universities with UI Avatars placeholders
-- These will always work and show university initials

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Harvard&size=400&background=A51C30&color=fff&bold=true' WHERE name ILIKE '%Harvard%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=MIT&size=400&background=8A1F11&color=fff&bold=true' WHERE name ILIKE '%MIT%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Stanford&size=400&background=8C1515&color=fff&bold=true' WHERE name ILIKE '%Stanford%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Cambridge&size=400&background=A3C1AD&color=000&bold=true' WHERE name ILIKE '%Cambridge%' AND country = 'UK';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Oxford&size=400&background=002147&color=fff&bold=true' WHERE name ILIKE '%Oxford%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=ETH&size=400&background=1F407A&color=fff&bold=true' WHERE name ILIKE '%ETH%' OR name ILIKE '%Zurich%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Melbourne&size=400&background=00447C&color=fff&bold=true' WHERE name ILIKE '%Melbourne%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=NUS&size=400&background=EF7C00&color=fff&bold=true' WHERE name ILIKE '%Singapore%' AND name ILIKE '%National%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Toronto&size=400&background=002A5C&color=fff&bold=true' WHERE name ILIKE '%Toronto%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Berkeley&size=400&background=003262&color=FDB515&bold=true' WHERE name ILIKE '%Berkeley%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Yale&size=400&background=00356B&color=fff&bold=true' WHERE name ILIKE '%Yale%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Princeton&size=400&background=E87722&color=000&bold=true' WHERE name ILIKE '%Princeton%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Columbia&size=400&background=B9D9EB&color=000&bold=true' WHERE name ILIKE '%Columbia%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Chicago&size=400&background=800000&color=fff&bold=true' WHERE name ILIKE '%Chicago%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Caltech&size=400&background=FF6C0C&color=fff&bold=true' WHERE name ILIKE '%Caltech%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Imperial&size=400&background=003E74&color=fff&bold=true' WHERE name ILIKE '%Imperial%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=UCL&size=400&background=500778&color=fff&bold=true' WHERE name ILIKE '%UCL%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Penn&size=400&background=011F5B&color=990000&bold=true' WHERE name ILIKE '%Pennsylvania%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Cornell&size=400&background=B31B1B&color=fff&bold=true' WHERE name ILIKE '%Cornell%';

UPDATE universities SET logo_url = 'https://ui-avatars.com/api/?name=Michigan&size=400&background=00274C&color=FFCB05&bold=true' WHERE name ILIKE '%Michigan%';

-- For any remaining universities without logos, set a generic one
UPDATE universities 
SET logo_url = 'https://ui-avatars.com/api/?name=' || REPLACE(name, ' ', '+') || '&size=400&background=4F46E5&color=fff&bold=true'
WHERE logo_url IS NULL OR logo_url = '';

-- Verify the update
SELECT name, logo_url FROM universities LIMIT 10;
