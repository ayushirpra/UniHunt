-- Update university logos from CSV data
-- Run this in Supabase SQL Editor

-- Update Harvard University
UPDATE universities SET logo_url = 'https://logo.clearbit.com/harvard.edu' WHERE name ILIKE '%Harvard%';

-- Update MIT
UPDATE universities SET logo_url = 'https://logo.clearbit.com/mit.edu' WHERE name ILIKE '%MIT%' OR name ILIKE '%Massachusetts Institute%';

-- Update Stanford
UPDATE universities SET logo_url = 'https://logo.clearbit.com/stanford.edu' WHERE name ILIKE '%Stanford%';

-- Update University of Cambridge
UPDATE universities SET logo_url = 'https://logo.clearbit.com/cam.ac.uk' WHERE name ILIKE '%Cambridge%' AND country = 'UK';

-- Update University of Oxford
UPDATE universities SET logo_url = 'https://logo.clearbit.com/ox.ac.uk' WHERE name ILIKE '%Oxford%';

-- Update ETH Zurich
UPDATE universities SET logo_url = 'https://logo.clearbit.com/ethz.ch' WHERE name ILIKE '%ETH%' OR name ILIKE '%Zurich%';

-- Update University of Melbourne
UPDATE universities SET logo_url = 'https://logo.clearbit.com/unimelb.edu.au' WHERE name ILIKE '%Melbourne%';

-- Update National University of Singapore
UPDATE universities SET logo_url = 'https://logo.clearbit.com/nus.edu.sg' WHERE name ILIKE '%Singapore%' AND name ILIKE '%National%';

-- Update University of Toronto
UPDATE universities SET logo_url = 'https://logo.clearbit.com/utoronto.ca' WHERE name ILIKE '%Toronto%';

-- Update UC Berkeley
UPDATE universities SET logo_url = 'https://logo.clearbit.com/berkeley.edu' WHERE name ILIKE '%Berkeley%';

-- Update Yale
UPDATE universities SET logo_url = 'https://logo.clearbit.com/yale.edu' WHERE name ILIKE '%Yale%';

-- Update Princeton
UPDATE universities SET logo_url = 'https://logo.clearbit.com/princeton.edu' WHERE name ILIKE '%Princeton%';

-- Update Columbia
UPDATE universities SET logo_url = 'https://logo.clearbit.com/columbia.edu' WHERE name ILIKE '%Columbia%';

-- Update University of Chicago
UPDATE universities SET logo_url = 'https://logo.clearbit.com/uchicago.edu' WHERE name ILIKE '%Chicago%';

-- Update Caltech
UPDATE universities SET logo_url = 'https://logo.clearbit.com/caltech.edu' WHERE name ILIKE '%Caltech%' OR name ILIKE '%California Institute%';

-- Update Imperial College London
UPDATE universities SET logo_url = 'https://logo.clearbit.com/imperial.ac.uk' WHERE name ILIKE '%Imperial%';

-- Update UCL
UPDATE universities SET logo_url = 'https://logo.clearbit.com/ucl.ac.uk' WHERE name ILIKE '%UCL%' OR (name ILIKE '%University College%' AND name ILIKE '%London%');

-- Update University of Pennsylvania
UPDATE universities SET logo_url = 'https://logo.clearbit.com/upenn.edu' WHERE name ILIKE '%Pennsylvania%';

-- Update Cornell
UPDATE universities SET logo_url = 'https://logo.clearbit.com/cornell.edu' WHERE name ILIKE '%Cornell%';

-- Update University of Michigan
UPDATE universities SET logo_url = 'https://logo.clearbit.com/umich.edu' WHERE name ILIKE '%Michigan%';

-- Update Carnegie Mellon
UPDATE universities SET logo_url = 'https://logo.clearbit.com/cmu.edu' WHERE name ILIKE '%Carnegie%';

-- Update Duke
UPDATE universities SET logo_url = 'https://logo.clearbit.com/duke.edu' WHERE name ILIKE '%Duke%';

-- Update Northwestern
UPDATE universities SET logo_url = 'https://logo.clearbit.com/northwestern.edu' WHERE name ILIKE '%Northwestern%';

-- Update NYU
UPDATE universities SET logo_url = 'https://logo.clearbit.com/nyu.edu' WHERE name ILIKE '%NYU%' OR (name ILIKE '%New York%' AND name ILIKE '%University%');

-- Update UCLA
UPDATE universities SET logo_url = 'https://logo.clearbit.com/ucla.edu' WHERE name ILIKE '%UCLA%';

-- Update University of Washington
UPDATE universities SET logo_url = 'https://logo.clearbit.com/washington.edu' WHERE name ILIKE '%Washington%' AND country = 'USA';

-- Update Georgia Tech
UPDATE universities SET logo_url = 'https://logo.clearbit.com/gatech.edu' WHERE name ILIKE '%Georgia%' AND name ILIKE '%Tech%';

-- Update University of Texas Austin
UPDATE universities SET logo_url = 'https://logo.clearbit.com/utexas.edu' WHERE name ILIKE '%Texas%' AND name ILIKE '%Austin%';

-- Update USC
UPDATE universities SET logo_url = 'https://logo.clearbit.com/usc.edu' WHERE name ILIKE '%Southern California%';

-- Update Boston University
UPDATE universities SET logo_url = 'https://logo.clearbit.com/bu.edu' WHERE name ILIKE '%Boston%' AND name ILIKE '%University%';

-- Update University of British Columbia
UPDATE universities SET logo_url = 'https://logo.clearbit.com/ubc.ca' WHERE name ILIKE '%British Columbia%';

-- Update McGill
UPDATE universities SET logo_url = 'https://logo.clearbit.com/mcgill.ca' WHERE name ILIKE '%McGill%';

-- Update University of Sydney
UPDATE universities SET logo_url = 'https://logo.clearbit.com/sydney.edu.au' WHERE name ILIKE '%Sydney%';

-- Update Australian National University
UPDATE universities SET logo_url = 'https://logo.clearbit.com/anu.edu.au' WHERE name ILIKE '%Australian National%';

-- Update University of Queensland
UPDATE universities SET logo_url = 'https://logo.clearbit.com/uq.edu.au' WHERE name ILIKE '%Queensland%';

-- Update Monash University
UPDATE universities SET logo_url = 'https://logo.clearbit.com/monash.edu' WHERE name ILIKE '%Monash%';

-- Update UNSW
UPDATE universities SET logo_url = 'https://logo.clearbit.com/unsw.edu.au' WHERE name ILIKE '%UNSW%' OR (name ILIKE '%New South Wales%');

-- Update TU Munich
UPDATE universities SET logo_url = 'https://logo.clearbit.com/tum.de' WHERE name ILIKE '%TU Munich%' OR name ILIKE '%Technical University%' AND name ILIKE '%Munich%';

-- Update LMU Munich
UPDATE universities SET logo_url = 'https://logo.clearbit.com/lmu.de' WHERE name ILIKE '%LMU%' OR (name ILIKE '%Ludwig%' AND name ILIKE '%Munich%');

-- Update Heidelberg
UPDATE universities SET logo_url = 'https://logo.clearbit.com/uni-heidelberg.de' WHERE name ILIKE '%Heidelberg%';

-- Update Tsinghua
UPDATE universities SET logo_url = 'https://logo.clearbit.com/tsinghua.edu.cn' WHERE name ILIKE '%Tsinghua%';

-- Update Peking University
UPDATE universities SET logo_url = 'https://logo.clearbit.com/pku.edu.cn' WHERE name ILIKE '%Peking%';

-- Update University of Tokyo
UPDATE universities SET logo_url = 'https://logo.clearbit.com/u-tokyo.ac.jp' WHERE name ILIKE '%Tokyo%' AND country = 'Japan';

-- Update Kyoto University
UPDATE universities SET logo_url = 'https://logo.clearbit.com/kyoto-u.ac.jp' WHERE name ILIKE '%Kyoto%';

-- Update Seoul National University
UPDATE universities SET logo_url = 'https://logo.clearbit.com/snu.ac.kr' WHERE name ILIKE '%Seoul%';

-- Update KAIST
UPDATE universities SET logo_url = 'https://logo.clearbit.com/kaist.ac.kr' WHERE name ILIKE '%KAIST%';

-- Update Hong Kong University
UPDATE universities SET logo_url = 'https://logo.clearbit.com/hku.hk' WHERE name ILIKE '%Hong Kong%' AND name ILIKE '%University%';

-- Update NTU Singapore
UPDATE universities SET logo_url = 'https://logo.clearbit.com/ntu.edu.sg' WHERE name ILIKE '%Nanyang%';

-- Verify updates
SELECT name, logo_url FROM universities WHERE logo_url IS NOT NULL ORDER BY name;
