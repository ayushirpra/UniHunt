import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, MapPin, DollarSign, Star, Loader2, AlertCircle } from 'lucide-react';
import { UniversityCard } from '../components/UniversityCard';
import { supabase } from '@/lib/supabase';

export function UniversitySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [savedUniversities, setSavedUniversities] = useState<string[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    countries: [] as string[],
    degreeTypes: [] as string[],
    ranking: '',
    tuitionRange: '',
    intakes: [] as string[],
  });

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from('universities').select('*');
      
      if (error) throw error;
      
      setUniversities(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load universities');
    } finally {
      setLoading(false);
    }
  };

  // Mock university data
  const mockUniversities = [
    {
      id: '1',
      name: 'Massachusetts Institute of Technology',
      location: 'Cambridge',
      country: 'USA',
      ranking: 1,
      rating: 4.8,
      tuitionFee: '$53,790/year',
      deadline: 'Feb 15, 2026',
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      name: 'Stanford University',
      location: 'Stanford',
      country: 'USA',
      ranking: 2,
      rating: 4.9,
      tuitionFee: '$56,169/year',
      deadline: 'Feb 20, 2026',
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      name: 'Harvard University',
      location: 'Cambridge',
      country: 'USA',
      ranking: 3,
      rating: 4.7,
      tuitionFee: '$51,904/year',
      deadline: 'Mar 1, 2026',
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '4',
      name: 'University of Cambridge',
      location: 'Cambridge',
      country: 'UK',
      ranking: 4,
      rating: 4.8,
      tuitionFee: '£35,000/year',
      deadline: 'Jan 31, 2026',
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '5',
      name: 'ETH Zurich',
      location: 'Zurich',
      country: 'Switzerland',
      ranking: 7,
      rating: 4.7,
      tuitionFee: 'CHF 1,460/year',
      deadline: 'Apr 30, 2026',
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '6',
      name: 'University of Toronto',
      location: 'Toronto',
      country: 'Canada',
      ranking: 18,
      rating: 4.6,
      tuitionFee: 'CAD 58,160/year',
      deadline: 'Feb 1, 2026',
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const displayUniversities = universities.length > 0 ? universities : mockUniversities;

  const filteredUniversities = displayUniversities.filter((uni) => {
    const matchesSearch = searchQuery === '' || 
      uni.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.country?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = filters.countries.length === 0 || filters.countries.includes(uni.country);
    
    return matchesSearch && matchesCountry;
  });

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    const currentValues = filters[category] as string[];
    setFilters({
      ...filters,
      [category]: currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value],
    });
  };

  const addToWishlist = async (universityId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please log in to add to wishlist');
        return;
      }

      const { error } = await supabase
        .from('wishlist')
        .insert({ 
          user_id: user.id, 
          university_id: universityId 
        });
      
      if (error) {
        if (error.code === '23505') {
          alert('Already in wishlist!');
        } else {
          console.error('Error adding to wishlist:', error);
          alert('Error occurred!');
        }
      } else {
        alert('Added to wishlist!');
        setSavedUniversities((prev) => [...prev, universityId]);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error occurred!');
    }
  };

  const toggleSave = (id: string) => {
    addToWishlist(id);
  };

  const clearFilters = () => {
    setFilters({
      countries: [],
      degreeTypes: [],
      ranking: '',
      tuitionRange: '',
      intakes: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Search Universities</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore over 10,000 universities worldwide and find your perfect match
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by university name, location, or program..."
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Country */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Country
                    </h3>
                    <div className="space-y-2">
                      {['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Switzerland'].map(
                        (country) => (
                          <label key={country} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.countries.includes(country)}
                              onChange={() => toggleFilter('countries', country)}
                              className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:bg-gray-900"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{country}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* Degree Type */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Degree Type</h3>
                    <div className="space-y-2">
                      {["Bachelor's", "Master's", 'PhD', 'Diploma'].map((degree) => (
                        <label key={degree} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.degreeTypes.includes(degree)}
                            onChange={() => toggleFilter('degreeTypes', degree)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:bg-gray-900"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{degree}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ranking */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      World Ranking
                    </h3>
                    <select
                      value={filters.ranking}
                      onChange={(e) => setFilters({ ...filters, ranking: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none"
                    >
                      <option value="">All rankings</option>
                      <option value="top-10">Top 10</option>
                      <option value="top-50">Top 50</option>
                      <option value="top-100">Top 100</option>
                      <option value="top-500">Top 500</option>
                    </select>
                  </div>

                  {/* Tuition Range */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Annual Tuition (USD)
                    </h3>
                    <select
                      value={filters.tuitionRange}
                      onChange={(e) => setFilters({ ...filters, tuitionRange: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none"
                    >
                      <option value="">All ranges</option>
                      <option value="0-20k">$0 - $20,000</option>
                      <option value="20k-40k">$20,000 - $40,000</option>
                      <option value="40k-60k">$40,000 - $60,000</option>
                      <option value="60k+">$60,000+</option>
                    </select>
                  </div>

                  {/* Intake */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Intake Period</h3>
                    <div className="space-y-2">
                      {['Fall 2026', 'Spring 2027', 'Fall 2027'].map((intake) => (
                        <label key={intake} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.intakes.includes(intake)}
                            onChange={() => toggleFilter('intakes', intake)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:bg-gray-900"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{intake}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading universities...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-2">Failed to load universities</h3>
                <p className="text-red-700 dark:text-red-400 mb-4">{error}</p>
                <button
                  onClick={fetchUniversities}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : filteredUniversities.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
                <Search className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No universities found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-medium text-gray-900 dark:text-white">{filteredUniversities.length}</span>{' '}
                universities
              </p>
              <select className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none">
                <option>Sort by: Ranking</option>
                <option>Sort by: Tuition (Low to High)</option>
                <option>Sort by: Tuition (High to Low)</option>
                <option>Sort by: Deadline</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredUniversities.map((university) => {
                const tuitionDisplay = university.tuition_min && university.tuition_max 
                  ? `$${university.tuition_min.toLocaleString()} - $${university.tuition_max.toLocaleString()}/year`
                  : university.tuitionFee || 'Contact for info';
                
                return (
                  <UniversityCard
                    key={university.id}
                    id={university.id}
                    name={university.name}
                    location={university.city || university.location || 'N/A'}
                    country={university.country}
                    ranking={university.ranking || 0}
                    rating={university.rating || 0}
                    tuitionFee={tuitionDisplay}
                    deadline={university.deadline || 'TBD'}
                    image={university.image_url || university.logo_url || ''}
                    logo_url={university.logo_url}
                    saved={savedUniversities.includes(university.id)}
                    onToggleSave={toggleSave}
                  />
                );
              })}
            </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
