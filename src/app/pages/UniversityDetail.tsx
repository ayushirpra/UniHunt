import { useParams, Link } from 'react-router-dom';
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
} from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function UniversityDetail() {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);

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

  // Mock university data
  const university = {
    id: id,
    name: 'Massachusetts Institute of Technology',
    location: 'Cambridge, Massachusetts',
    country: 'USA',
    ranking: 1,
    rating: 4.8,
    reviews: 2450,
    tuitionFee: '$53,790/year',
    deadline: 'February 15, 2026',
    acceptanceRate: '7%',
    students: '11,520',
    internationalStudents: '33%',
    website: 'www.mit.edu',
    image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description:
      'The Massachusetts Institute of Technology is a private research university in Cambridge, Massachusetts. Established in 1861, MIT has since played a key role in the development of modern technology and science.',
    programs: [
      { name: 'Computer Science', duration: '4 years', type: "Bachelor's" },
      { name: 'Electrical Engineering', duration: '2 years', type: "Master's" },
      { name: 'Data Science', duration: '2 years', type: "Master's" },
      { name: 'Artificial Intelligence', duration: '4-5 years', type: 'PhD' },
    ],
    requirements: [
      'Undergraduate degree with minimum 3.5 GPA',
      'GRE scores (optional for 2026)',
      'TOEFL iBT 90+ or IELTS 7.0+',
      'Three letters of recommendation',
      'Statement of Purpose',
      'Resume/CV',
    ],
    facilities: [
      'State-of-the-art research labs',
      'Modern library with 2.9M volumes',
      'Student housing available',
      'Career counseling services',
      'Sports and recreation centers',
      'International student support',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-br from-indigo-600 to-blue-500">
        <img
          src={university.image}
          alt={university.name}
          className="w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm mb-3">
                  <Award className="w-4 h-4" />
                  World Ranking #{university.ranking}
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">{university.name}</h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{university.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    <span>
                      {university.rating} ({university.reviews} reviews)
                    </span>
                  </div>
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
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {university.acceptanceRate}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Acceptance Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{university.students}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {university.internationalStudents}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">International</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{university.tuitionFee}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tuition</div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{university.description}</p>
            </div>

            {/* Programs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Popular Programs</h2>
              <div className="space-y-3">
                {university.programs.map((program, index) => (
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
                {university.requirements.map((req, index) => (
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
                {university.facilities.map((facility, index) => (
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
                <h3 className="text-lg font-semibold">Application Deadline</h3>
              </div>
              <div className="text-3xl font-bold mb-1">{university.deadline}</div>
              <p className="text-indigo-100 text-sm mb-6">Don't miss your chance!</p>

              <div className="space-y-3">
                <Link
                  to="/ai-sop"
                  className="block w-full py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-center font-medium"
                >
                  Start Application
                </Link>
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
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                  <a
                    href={`https://${university.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    {university.website}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{university.location}</span>
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
