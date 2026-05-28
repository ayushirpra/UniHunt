import { supabase } from '../lib/supabase.ts';

// Dummy university data: at least 5 per country, top 200 worldwide (simplified for demo)
interface University {
  name: string;
  city: string;
  country: string;
  ranking: number;
  rating: number;
  tuition_min: number;
  tuition_max: number;
  logo_url?: string;
  image_url?: string;
  deadline?: string;
}

const dummyUniversities: University[] = [
  // United States
  {
    name: 'Massachusetts Institute of Technology',
    city: 'Cambridge',
    country: 'United States',
    ranking: 1,
    rating: 5,
    tuition_min: 53000,
    tuition_max: 56000,
    logo_url: 'https://ui-avatars.com/api/?name=MIT',
    image_url: 'https://picsum.photos/seed/mit/800/400',
    deadline: '2026-12-01',
  },
  {
    name: 'Stanford University',
    city: 'Stanford',
    country: 'United States',
    ranking: 2,
    rating: 5,
    tuition_min: 54000,
    tuition_max: 57000,
    logo_url: 'https://ui-avatars.com/api/?name=Stanford',
    image_url: 'https://picsum.photos/seed/stanford/800/400',
    deadline: '2026-12-01',
  },
  {
    name: 'Harvard University',
    city: 'Cambridge',
    country: 'United States',
    ranking: 3,
    rating: 5,
    tuition_min: 52000,
    tuition_max: 55000,
    logo_url: 'https://ui-avatars.com/api/?name=Harvard',
    image_url: 'https://picsum.photos/seed/harvard/800/400',
    deadline: '2026-12-01',
  },
  {
    name: 'University of California, Berkeley',
    city: 'Berkeley',
    country: 'United States',
    ranking: 4,
    rating: 4.5,
    tuition_min: 40000,
    tuition_max: 45000,
    logo_url: 'https://ui-avatars.com/api/?name=Berkeley',
    image_url: 'https://picsum.photos/seed/berkeley/800/400',
    deadline: '2026-12-01',
  },
  {
    name: 'University of Chicago',
    city: 'Chicago',
    country: 'United States',
    ranking: 5,
    rating: 4.7,
    tuition_min: 48000,
    tuition_max: 51000,
    logo_url: 'https://ui-avatars.com/api/?name=Chicago',
    image_url: 'https://picsum.photos/seed/chicago/800/400',
    deadline: '2026-12-01',
  },
  // United Kingdom
  {
    name: 'University of Oxford',
    city: 'Oxford',
    country: 'United Kingdom',
    ranking: 6,
    rating: 5,
    tuition_min: 42000,
    tuition_max: 47000,
    logo_url: 'https://ui-avatars.com/api/?name=Oxford',
    image_url: 'https://picsum.photos/seed/oxford/800/400',
    deadline: '2026-12-15',
  },
  {
    name: 'University of Cambridge',
    city: 'Cambridge',
    country: 'United Kingdom',
    ranking: 7,
    rating: 5,
    tuition_min: 41000,
    tuition_max: 46000,
    logo_url: 'https://ui-avatars.com/api/?name=Cambridge',
    image_url: 'https://picsum.photos/seed/cambridge/800/400',
    deadline: '2026-12-15',
  },
  {
    name: 'Imperial College London',
    city: 'London',
    country: 'United Kingdom',
    ranking: 8,
    rating: 4.8,
    tuition_min: 38000,
    tuition_max: 43000,
    logo_url: 'https://ui-avatars.com/api/?name=Imperial',
    image_url: 'https://picsum.photos/seed/imperial/800/400',
    deadline: '2026-12-15',
  },
  {
    name: 'London School of Economics',
    city: 'London',
    country: 'United Kingdom',
    ranking: 9,
    rating: 4.6,
    tuition_min: 35000,
    tuition_max: 40000,
    logo_url: 'https://ui-avatars.com/api/?name=LSE',
    image_url: 'https://picsum.photos/seed/lse/800/400',
    deadline: '2026-12-15',
  },
  {
    name: 'University College London',
    city: 'London',
    country: 'United Kingdom',
    ranking: 10,
    rating: 4.5,
    tuition_min: 34000,
    tuition_max: 39000,
    logo_url: 'https://ui-avatars.com/api/?name=UCL',
    image_url: 'https://picsum.photos/seed/ucl/800/400',
    deadline: '2026-12-15',
  },
  // Canada (additional countries can be added similarly)
  {
    name: 'University of Toronto',
    city: 'Toronto',
    country: 'Canada',
    ranking: 11,
    rating: 4.7,
    tuition_min: 30000,
    tuition_max: 35000,
    logo_url: 'https://ui-avatars.com/api/?name=UToronto',
    image_url: 'https://picsum.photos/seed/utoronto/800/400',
    deadline: '2026-12-01',
  },
  {
    name: 'University of British Columbia',
    city: 'Vancouver',
    country: 'Canada',
    ranking: 12,
    rating: 4.6,
    tuition_min: 28000,
    tuition_max: 33000,
    logo_url: 'https://ui-avatars.com/api/?name=UBC',
    image_url: 'https://picsum.photos/seed/ubc/800/400',
    deadline: '2026-12-01',
  },
  {
    name: 'McGill University',
    city: 'Montreal',
    country: 'Canada',
    ranking: 13,
    rating: 4.5,
    tuition_min: 27000,
    tuition_max: 32000,
    logo_url: 'https://ui-avatars.com/api/?name=McGill',
    image_url: 'https://picsum.photos/seed/mcgill/800/400',
    deadline: '2026-12-01',
  },
  {
    name: 'University of Alberta',
    city: 'Edmonton',
    country: 'Canada',
    ranking: 14,
    rating: 4.4,
    tuition_min: 26000,
    tuition_max: 31000,
    logo_url: 'https://ui-avatars.com/api/?name=Alberta',
    image_url: 'https://picsum.photos/seed/alberta/800/400',
    deadline: '2026-12-01',
  },
  {
    name: 'University of Waterloo',
    city: 'Waterloo',
    country: 'Canada',
    ranking: 15,
    rating: 4.3,
    tuition_min: 25000,
    tuition_max: 30000,
    logo_url: 'https://ui-avatars.com/api/?name=Waterloo',
    image_url: 'https://picsum.photos/seed/waterloo/800/400',
    deadline: '2026-12-01',
  },
];

async function seed() {
  console.log('Seeding dummy university data...');
  const { data, error } = await supabase.from('universities').insert(dummyUniversities as any);
  if (error) {
    console.error('Error seeding data:', error);
  } else {
    console.log('Inserted', data?.length, 'universities');
  }
}

seed();
