import { useState, useEffect } from 'react';
import { Heart, Trash2, BarChart2, Grid, List, Loader2, AlertCircle } from 'lucide-react';
import { UniversityCard } from '../components/UniversityCard';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export function Wishlist() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedUniversities, setSavedUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in to view your wishlist');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('wishlist')
        .select('*, universities(*)')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      const formattedData = data?.map((item: any) => ({
        wishlistId: item.id,
        id: item.universities.id,
        name: item.universities.name,
        location: item.universities.city,
        country: item.universities.country,
        ranking: item.universities.ranking,
        rating: item.universities.rating,
        tuitionFee: item.universities.tuition_range,
        deadline: item.universities.deadline,
        image: item.universities.image_url || 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        addedDate: item.created_at,
      })) || [];
      
      setSavedUniversities(formattedData);
    } catch (err: any) {
      setError(err.message || 'Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = async (id: string) => {
    const university = savedUniversities.find(uni => uni.id === id);
    if (!university?.wishlistId) return;

    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('id', university.wishlistId);
      
      if (error) throw error;
      
      setSavedUniversities((prev) => prev.filter((uni) => uni.id !== id));
    } catch (err: any) {
      alert('Failed to remove from wishlist: ' + err.message);
    }
  };

  const toggleComparison = (id: string) => {
    setSelectedForComparison((prev) =>
      prev.includes(id) ? prev.filter((uniId) => uniId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Wishlist</h1>
            <p className="text-gray-600 dark:text-gray-400">
              You have saved {savedUniversities.length} universities
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading your wishlist...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-2">Failed to load wishlist</h3>
            <p className="text-red-700 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchWishlist}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : savedUniversities.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <Heart className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No universities saved yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start exploring universities and save your favorites here
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Universities
            </Link>
          </div>
        ) : (
          <>
            {/* Comparison Bar */}
            {selectedForComparison.length > 0 && (
              <div className="bg-indigo-600 text-white rounded-xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart2 className="w-5 h-5" />
                  <span className="font-medium">
                    {selectedForComparison.length} universities selected for comparison
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedForComparison([])}
                    className="text-sm text-indigo-100 hover:text-white"
                  >
                    Clear
                  </button>
                  <Link
                    to="/compare"
                    state={{ universities: selectedForComparison }}
                    className="px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
                  >
                    Compare Now
                  </Link>
                </div>
              </div>
            )}

            {/* Selection Helper */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-900 dark:text-blue-300">
                  Select universities below to compare them side by side
                </span>
              </div>
            </div>

            {/* Universities Grid/List */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {savedUniversities.map((university) => (
                <div key={university.id} className="relative">
                  {viewMode === 'grid' ? (
                    <div>
                      <div className="absolute top-3 left-3 z-10">
                        <input
                          type="checkbox"
                          checked={selectedForComparison.includes(university.id)}
                          onChange={() => toggleComparison(university.id)}
                          className="w-5 h-5 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:bg-gray-900"
                        />
                      </div>
                      <UniversityCard
                        {...university}
                        saved={true}
                        onToggleSave={toggleSave}
                      />
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex items-center gap-6">
                      <input
                        type="checkbox"
                        checked={selectedForComparison.includes(university.id)}
                        onChange={() => toggleComparison(university.id)}
                        className="w-5 h-5 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:bg-gray-900"
                      />
                      <img
                        src={university.image}
                        alt={university.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <Link
                          to={`/university/${university.id}`}
                          className="text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 mb-1 block"
                        >
                          {university.name}
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {university.location}, {university.country}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Ranking: #{university.ranking}</span>
                          <span className="text-gray-600 dark:text-gray-400">Rating: {university.rating}</span>
                          <span className="text-gray-600 dark:text-gray-400">Deadline: {university.deadline}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSave(university.id)}
                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
