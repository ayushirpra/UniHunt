import { Sparkles, TrendingUp, Target, Heart, ArrowRight } from 'lucide-react';
import { UniversityCard } from '../components/UniversityCard';
import { useState } from 'react';

export function AIRecommendations() {
  const [savedUniversities, setSavedUniversities] = useState<string[]>([]);

  const userProfile = {
    field: 'Computer Science',
    gpa: '3.8',
    budget: '$40,000 - $60,000',
    countries: ['USA', 'UK', 'Canada'],
  };

  const recommendations = [
    {
      id: '1',
      name: 'Carnegie Mellon University',
      location: 'Pittsburgh',
      country: 'USA',
      ranking: 5,
      rating: 4.7,
      tuitionFee: '$58,924/year',
      deadline: 'Feb 15, 2026',
      matchScore: 92,
      reasons: [
        'Strong Computer Science program',
        'Matches your GPA requirements',
        'Active research opportunities',
      ],
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      name: 'ETH Zurich',
      location: 'Zurich',
      country: 'Switzerland',
      ranking: 7,
      rating: 4.7,
      tuitionFee: 'CHF 1,460/year',
      deadline: 'Apr 30, 2026',
      matchScore: 88,
      reasons: [
        'Low tuition fees',
        'World-class CS department',
        'English-taught programs',
      ],
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      name: 'University of Toronto',
      location: 'Toronto',
      country: 'Canada',
      ranking: 18,
      rating: 4.6,
      tuitionFee: 'CAD 58,160/year',
      deadline: 'Feb 1, 2026',
      matchScore: 85,
      reasons: [
        'Within budget range',
        'Strong AI and ML focus',
        'Good scholarship opportunities',
      ],
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '4',
      name: 'Imperial College London',
      location: 'London',
      country: 'UK',
      ranking: 6,
      rating: 4.6,
      tuitionFee: '£37,900/year',
      deadline: 'Mar 31, 2026',
      matchScore: 84,
      reasons: [
        'Top UK university',
        'Industry connections',
        'One-year master\'s program',
      ],
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '5',
      name: 'University of Waterloo',
      location: 'Waterloo',
      country: 'Canada',
      ranking: 25,
      rating: 4.5,
      tuitionFee: 'CAD 48,000/year',
      deadline: 'Feb 15, 2026',
      matchScore: 82,
      reasons: [
        'Affordable option',
        'Co-op opportunities',
        'Strong tech ecosystem',
      ],
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '6',
      name: 'TU Munich',
      location: 'Munich',
      country: 'Germany',
      ranking: 30,
      rating: 4.5,
      tuitionFee: '€3,000/year',
      deadline: 'May 31, 2026',
      matchScore: 80,
      reasons: [
        'Extremely affordable',
        'Quality education',
        'Growing tech hub',
      ],
      image: 'https://images.unsplash.com/photo-1679653226697-2b0fbf7c17f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMjczNjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const toggleSave = (id: string) => {
    setSavedUniversities((prev) =>
      prev.includes(id) ? prev.filter((uniId) => uniId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Recommendations
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Perfect Matches</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Based on your profile, we've found {recommendations.length} universities that match
            your goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Profile</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Field of Study</div>
                  <div className="font-medium text-gray-900 dark:text-white">{userProfile.field}</div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">GPA</div>
                  <div className="font-medium text-gray-900 dark:text-white">{userProfile.gpa}</div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Budget</div>
                  <div className="font-medium text-gray-900 dark:text-white">{userProfile.budget}</div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Preferred Countries</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userProfile.countries.map((country) => (
                      <span
                        key={country}
                        className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                Edit Profile
              </button>
            </div>

            {/* Match Info */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5" />
                <h3 className="font-semibold">How Matching Works</h3>
              </div>
              <p className="text-sm text-indigo-100 mb-4">
                Our AI analyzes 50+ factors including your academic background, preferences,
                budget, and career goals to find the best universities for you.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Match scores updated daily</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {recommendations.map((university) => (
              <div key={university.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6 p-6">
                  {/* Match Score */}
                  <div className="flex-shrink-0 text-center">
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          className="text-gray-200 dark:text-gray-700"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 34}`}
                          strokeDashoffset={`${2 * Math.PI * 34 * (1 - university.matchScore / 100)}`}
                          className="text-indigo-600 dark:text-indigo-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {university.matchScore}%
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">Match</div>
                  </div>

                  {/* University Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {university.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {university.location}, {university.country}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleSave(university.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            savedUniversities.includes(university.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400 dark:text-gray-500'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-gray-600 dark:text-gray-400">Ranking</div>
                        <div className="font-medium text-gray-900 dark:text-white">#{university.ranking}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 dark:text-gray-400">Rating</div>
                        <div className="font-medium text-gray-900 dark:text-white">{university.rating}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 dark:text-gray-400">Tuition</div>
                        <div className="font-medium text-gray-900 dark:text-white">{university.tuitionFee}</div>
                      </div>
                    </div>

                    {/* Match Reasons */}
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Why this match:</div>
                      <div className="space-y-1">
                        {university.reasons.map((reason, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500 mt-1.5 flex-shrink-0" />
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                        Compare
                      </button>
                      <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                        Deadline: {university.deadline}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-8 text-center border border-indigo-100 dark:border-indigo-800">
              <Sparkles className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Want More Personalized Recommendations?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Update your profile with more details to get even better matches
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Update Profile
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
