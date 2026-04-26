import { Sparkles, Target, Heart, ArrowRight, RefreshCw, MapPin, DollarSign, Star, AlertCircle, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { getPlaceholderCampus, getPlaceholderLogo } from '@/lib/imageUtils';
import { postProtectedApi } from '@/lib/apiClient';

interface University {
  id: string;
  name: string;
  city: string;
  country: string;
  world_ranking: number;
  tuition_min: number;
  tuition_max: number;
  currency: string;
  acceptance_rate: number;
  logo_url: string;
}

interface Profile {
  gpa: number;
  budget_min: number;
  budget_max: number;
  preferred_countries: string | string[];
  academic_level: string;
}

interface Match {
  university: University;
  score: number;
  reasons: string[];
}

const MAX_BUDGET = 200000;

function clampBudget(val: number) {
  return Math.min(Math.max(Number(val) || 0, 0), MAX_BUDGET);
}

type RecommendationApiResponse = {
  recommendations: {
    university: string;
    reason: string;
    match_score: number;
  }[];
};

function ScoreCircle({ score }: { score: number }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#f97316';
  return (
    <div className="relative w-20 h-20 shrink-0">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} stroke="currentColor" strokeWidth="6" fill="none" className="text-gray-200 dark:text-gray-700" />
        <circle cx="40" cy="40" r={r} stroke={color} strokeWidth="6" fill="none"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - score / 100)} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-bold" style={{ color }}>{score}%</span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">Match</span>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-40 animate-pulse" />
  );
}

export function AIRecommendations() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [allCountries, setAllCountries] = useState<string[]>([]);

  // Filters — use refs so handleGenerate always reads latest values
  const [filterCountry, setFilterCountry] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [sliderBudgetMin, setSliderBudgetMin] = useState(0);
  const [sliderBudgetMax, setSliderBudgetMax] = useState(50000);

  // Store universities in a ref to avoid stale closure in handleGenerate
  const unisRef = useRef<University[]>([]);
  const userRef = useRef<{ id: string } | null>(null);
  const filterCountryRef = useRef('');
  const sliderBudgetMinRef = useRef(0);
  const sliderBudgetMaxRef = useRef(50000);

  // Keep refs in sync
  filterCountryRef.current = filterCountry;
  sliderBudgetMinRef.current = sliderBudgetMin;
  sliderBudgetMaxRef.current = sliderBudgetMax;

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      userRef.current = user;

      const [profileRes, unisRes, wlRes] = await Promise.all([
        user ? supabase.from('profiles').select('*').eq('id', user.id).single() : Promise.resolve({ data: null }),
        supabase.from('universities').select('*'),
        user ? supabase.from('wishlist').select('university_id').eq('user_id', user.id) : Promise.resolve({ data: [] }),
      ]);

      if (profileRes.data) {
        setProfile(profileRes.data);
        const pMin = clampBudget(profileRes.data.budget_min);
        const pMax = clampBudget(profileRes.data.budget_max) || 50000;
        setSliderBudgetMin(pMin);
        setSliderBudgetMax(pMax);
        sliderBudgetMinRef.current = pMin;
        sliderBudgetMaxRef.current = pMax;
      }

      if (unisRes.data && unisRes.data.length > 0) {
        const normalised: University[] = unisRes.data.map((u: any) => ({
          ...u,
          world_ranking: Number(u.world_ranking ?? u.ranking) || 9999,
          tuition_min: Number(u.tuition_min) || 0,
          tuition_max: Number(u.tuition_max) || 0,
        }));
        unisRef.current = normalised;
        setAllCountries([...new Set(normalised.map((u) => u.country).filter(Boolean))].sort() as string[]);
      }

      if (wlRes.data) setWishlist((wlRes.data as any[]).map((w) => w.university_id));
      setPageLoading(false);
    })();
  }, []);

  const missingFields = profile
    ? [
        !profile.gpa && 'GPA',
        (!profile.budget_min && !profile.budget_max) && 'Budget Range',
        !profile.preferred_countries && 'Preferred Countries',
      ].filter(Boolean)
    : [];

  const handleGenerate = async () => {
    if (!profile) return;
    setAnalyzing(true);
    setGenerated(false);
    setErrorMessage('');

    const preferredCountries: string[] = profile.preferred_countries
      ? (Array.isArray(profile.preferred_countries)
          ? profile.preferred_countries
          : (profile.preferred_countries as string).split(',').map((c) => c.trim()))
      : [];

    let unis = unisRef.current;
    const country = filterCountryRef.current;
    if (country) unis = unis.filter((u) => u.country === country);

    const bMin = sliderBudgetMinRef.current;
    const bMax = sliderBudgetMaxRef.current;
    const payload = {
      profile,
      filters: {
        country,
        level: filterLevel,
        budget_min: bMin,
        budget_max: bMax,
      },
      universities: unis.map((u) => ({
        id: u.id,
        name: u.name,
        city: u.city,
        country: u.country,
        world_ranking: u.world_ranking,
        tuition_min: u.tuition_min,
        tuition_max: u.tuition_max,
        acceptance_rate: u.acceptance_rate,
      })),
      preferredCountries,
    };

    try {
      const data = await postProtectedApi<RecommendationApiResponse>('/recommend', payload);
      const results: Match[] = (data.recommendations || []).map((rec, idx) => {
        const university = unis.find((u) => u.name.toLowerCase() === rec.university.toLowerCase())
          ?? unis.find((u) => u.name.toLowerCase().includes(rec.university.toLowerCase()))
          ?? {
            id: `ai-${idx}-${rec.university}`,
            name: rec.university,
            city: '',
            country: '',
            world_ranking: 9999,
            tuition_min: 0,
            tuition_max: 0,
            currency: 'USD',
            acceptance_rate: 0,
            logo_url: '',
          };

        return {
          university,
          score: Math.min(100, Math.max(0, Number(rec.match_score) || 0)),
          reasons: [rec.reason || 'Recommended based on your profile.'],
        };
      });

      setMatches(results);
      setGenerated(true);
    } catch (error: any) {
      setErrorMessage(error?.message || 'Could not generate recommendations right now. Please try again.');
      setMatches([]);
    } finally {
      setAnalyzing(false);
    }
  };

  const toggleWishlist = async (uniId: string) => {
    const user = userRef.current;
    if (!user) return;
    setTogglingId(uniId);
    if (wishlist.includes(uniId)) {
      await supabase.from('wishlist').delete().eq('user_id', user.id).eq('university_id', uniId);
      setWishlist((p) => p.filter((id) => id !== uniId));
    } else {
      await supabase.from('wishlist').insert({ user_id: user.id, university_id: uniId });
      setWishlist((p) => [...p, uniId]);
    }
    setTogglingId(null);
  };

  const avgScore = matches.length ? Math.round(matches.reduce((s, m) => s + m.score, 0) / matches.length) : 0;
  const strongMatches = matches.filter((m) => m.score >= 60).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Recommendations
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Find Your Perfect University</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Our AI analyzes 60+ universities against your profile to surface your best-fit matches.
          </p>
        </div>

        {/* Profile incomplete banner */}
        {!pageLoading && profile && missingFields.length > 0 && (
          <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-5 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                Complete your profile to get AI-powered recommendations!
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
                Missing: {(missingFields as string[]).join(', ')}
              </p>
              <Link to="/profile" className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 dark:text-amber-300 hover:underline">
                Go to Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Filters */}
        {!pageLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Country filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Country</label>
                <div className="relative">
                  <select
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">All Countries</option>
                    {allCountries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Academic level */}
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Academic Level</label>
                <div className="relative">
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">All Levels</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="masters">Master's</option>
                    <option value="phd">PhD</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Budget slider */}
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Max Budget: <span className="text-indigo-600 dark:text-indigo-400">${sliderBudgetMax.toLocaleString()}</span>
                </label>
                <input
                  type="range" min={0} max={MAX_BUDGET} step={1000}
                  value={sliderBudgetMax}
                  onChange={(e) => setSliderBudgetMax(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>$0</span><span>${(MAX_BUDGET / 1000).toFixed(0)}k</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generate button */}
        {!pageLoading && (
          <div className="mb-8">
            <div className="flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={analyzing || !profile}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 disabled:opacity-60 text-white rounded-xl font-semibold text-lg shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 transition-all"
              >
                {analyzing ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Analyzing {unisRef.current.length}+ universities...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {generated ? 'Regenerate Recommendations' : 'Generate Recommendations'}
                  </>
                )}
              </button>
            </div>
            {errorMessage && (
              <p className="text-center text-sm text-red-600 dark:text-red-400 mt-3">{errorMessage}</p>
            )}
          </div>
        )}

        {/* Analyzing message */}
        {analyzing && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 -mt-4 mb-6 animate-pulse">
            Analyzing universities to find your perfect matches...
          </p>
        )}

        {/* Skeletons while analyzing */}
        {analyzing && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Stats summary */}
        {generated && !analyzing && matches.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: <Target className="w-5 h-5 text-indigo-500" />, label: 'Universities Analyzed', value: `${unisRef.current.length}+` },
              { icon: <Star className="w-5 h-5 text-green-500" />, label: 'Strong Matches', value: strongMatches },
              { icon: <Sparkles className="w-5 h-5 text-blue-500" />, label: 'Avg Match Score', value: `${avgScore}%` },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                <div className="flex justify-center mb-2">{icon}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Match cards */}
        {generated && !analyzing && (
          <div className="space-y-4">
            {matches.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <Target className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">No matches found</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Try adjusting your budget or country preferences</p>
              </div>
            ) : (
              matches.map((match, idx) => (
                <div
                  key={match.university.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Campus Cover Image */}
                  <div className="absolute inset-x-0 top-0 h-28 overflow-hidden pointer-events-none">
                     <img 
                       src={getPlaceholderCampus(match.university.name)} 
                       alt="campus background" 
                       className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-110 group-hover:rotate-1"
                     />
                     {/* Gradient overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
                  </div>

                   <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 p-6 pt-16">
                    <ScoreCircle score={match.score} />
                    
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          {/* Logo badge overlapping image */}
                          <div className="w-12 h-12 rounded-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-1 shadow-lg border border-white/20 mb-2 mt-[-3.5rem] transition-transform duration-500 group-hover:-translate-y-1">
                            <img src={match.university.logo_url || getPlaceholderLogo(match.university.name)} onError={(e) => { e.currentTarget.src = getPlaceholderLogo(match.university.name); }} alt="" className="w-full h-full object-contain rounded-lg" />
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                            {match.university.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {match.university.city}, {match.university.country}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleWishlist(match.university.id)}
                          disabled={togglingId === match.university.id}
                          className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform ml-2 shrink-0 z-10"
                        >
                          <Heart className={`w-5 h-5 transition-colors ${wishlist.includes(match.university.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500 hover:text-red-500'}`} />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-4 my-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {match.university.world_ranking < 9999 && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            Rank #{match.university.world_ranking}
                          </span>
                        )}
                        {(match.university.tuition_min > 0 || match.university.tuition_max > 0) && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <DollarSign className="w-3.5 h-3.5 text-green-600" />
                            ${((match.university.tuition_min || match.university.tuition_max) / 1000).toFixed(0)}k/yr
                          </span>
                        )}
                        {match.university.acceptance_rate > 0 && (
                          <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                             {match.university.acceptance_rate}% acceptance
                          </span>
                        )}
                      </div>

                      <div className="mb-5 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800">
                        <p className="text-xs font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-wider mb-2">Why this match?</p>
                        <div className="space-y-1.5 flex flex-col">
                          {match.reasons.map((r, i) => (
                            <div key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <span className="opacity-70 mt-0.5">•</span> <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          to={`/university/${match.university.id}`}
                          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors border border-transparent shadow-md"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {matches.length > 0 && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate Recommendations
                </button>
              </div>
            )}

            <p className="text-xs text-center text-gray-400 dark:text-gray-500 pt-4 pb-2 max-w-2xl mx-auto">
              These recommendations are generated based on your profile data. Always verify requirements, deadlines, and program details on official university websites before applying.
            </p>
          </div>
        )}

        {pageLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
