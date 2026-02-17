import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Star,
  DollarSign,
  Calendar,
  Users,
  Globe,
  BookOpen,
  Award,
  ChevronRight,
  CheckCircle,
  Clock,
  FileText,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function UniversityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchUniversity();
  }, [id]);

  const fetchUniversity = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (!data) {
        setError('University not found');
        return;
      }

      setUniversity(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load university');
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async () => {
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
          university_id: id 
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
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error occurred!');
    }
  };

  const startApplication = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please log in to start an application');
        return;
      }

      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          university_id: id,
          program: 'General Application',
          status: 'Not Started',
        });

      if (error) {
        if (error.code === '23505') {
          alert('Application already exists!');
        } else {
          console.error('Error creating application:', error);
          alert('Error occurred!');
        }
      } else {
        alert('Application created successfully!');
        navigate('/applications');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error occurred!');
    }
  };

  const formatTuition = (min: number, max: number) => {
    if (!min && !max) return 'Contact university';
    if (min === max) return `$${min.toLocaleString()}/year`;
    return `$${min.toLocaleString()} - $${max.toLocaleString()}/year`;
  };

  const formatStudentCount = (count: number) => {
    if (!count) return 'N/A';
    return count.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading university details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-2">University not found</h3>
            <p className="text-red-700 dark:text-red-400 mb-4">{error || 'The university you are looking for does not exist.'}</p>
            <Link
              to="/search"
              className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const programs = [
    { name: 'Computer Science', duration: '4 years', type: "Bachelor's" },
    { name: 'Engineering', duration: '2 years', type: "Master's" },
    { name: 'Business Administration', duration: '2 years', type: "Master's" },
    { name: 'Data Science', duration: '4-5 years', type: 'PhD' },
  ];

  const requirements = [
    'Undergraduate degree with minimum 3.0 GPA',
    'Standardized test scores (GRE/GMAT)',
    'English proficiency (TOEFL/IELTS)',
    'Letters of recommendation',
    'Statement of Purpose',
    'Resume/CV',
  ];

  const facilities = [
    'State-of-the-art research labs',
    'Modern library facilities',
    'Student housing available',
    'Career counseling services',
    'Sports and recreation centers',
    'International student support',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-br from-indigo-600 to-blue-500">
        <img
          src={university.banner_url || university.image_url || 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080'}
          alt={university.name}
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(university.name)}&size=800&background=4F46E5&color=fff&bold=true`;
          }}
          loading="lazy"
          className="w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="flex items-start justify-between">
              <div>
                {university.ranking && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm mb-3">
                    <Award className="w-4 h-4" />
                    World Ranking #{university.ranking}
                  </div>
                )}
                <h1 className="text-4xl font-bold text-white mb-2">{university.name}</h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{university.city}, {university.country}</span>
                  </div>
                  {university.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                      <span>{university.rating}/5</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={addToWishlist}
                className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {university.acceptance_rate && (
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {university.acceptance_rate}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Acceptance Rate</div>
                  </div>
                )}
                {university.student_count && (
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {formatStudentCount(university.student_count)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
                  </div>
                )}
                {university.international_students && (
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {university.international_students}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">International</div>
                  </div>
                )}
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {formatTuition(university.tuition_min, university.tuition_max)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tuition</div>
                </div>
              </div>
            </div>

            {/* About */}
            {university.description && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{university.description}</p>
              </div>
            )}

            {/* Programs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Popular Programs</h2>
              <div className="space-y-3">
                {programs.map((program, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{program.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {program.type} • {program.duration}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Admission Requirements
              </h2>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Campus & Facilities</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {facilities.map((facility, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application CTA */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl p-6 text-white sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Ready to Apply?</h3>
              </div>
              <p className="text-indigo-100 text-sm mb-6">Start your application journey today!</p>

              <div className="space-y-3">
                <button
                  onClick={startApplication}
                  className="block w-full py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-center font-medium"
                >
                  Start Application
                </button>
                <button 
                  onClick={addToWishlist}
                  className="w-full py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors font-medium"
                >
                  Save to Wishlist
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                {university.website_url && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                    <a
                      href={university.website_url.startsWith('http') ? university.website_url : `https://${university.website_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                      {university.website_url}
                    </a>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{university.city}, {university.country}</span>
                </div>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">Need Help?</h3>
              <p className="text-sm text-amber-800 dark:text-amber-300 mb-4">
                Our AI can help you create a personalized SOP for this university!
              </p>
              <Link
                to="/ai-sop"
                className="block w-full py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-center text-sm font-medium"
              >
                Try AI SOP Generator
              </Link>
            </div>

            {/* Similar Universities */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Similar Universities</h3>
              <div className="space-y-3">
                {['Stanford University', 'Harvard University', 'Caltech'].map((uni, index) => (
                  <Link
                    key={index}
                    to={`/university/${index + 2}`}
                    className="block p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-white text-sm">{uni}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Cambridge, USA</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
