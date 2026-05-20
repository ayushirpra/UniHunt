import { Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  FileText,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Globe,
  Clock,
  Shield,
  Brain,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Landing() {
  const { session } = useAuth();

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Profile',
      description: 'Tell us about your academic background, test scores, study preferences, and target countries.',
    },
    {
      step: '02',
      title: 'Discover Universities',
      description: 'Browse, search, and filter matching programs with our advanced database and comparison tools.',
    },
    {
      step: '03',
      title: 'Get AI Assistance',
      description: 'Draft tailored Statements of Purpose (SOP) and build professional resumes optimized for each program.',
    },
    {
      step: '04',
      title: 'Track & Apply',
      description: 'Keep track of application status, deadlines, checklists, and document completion in one place.',
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Explore programs in leading countries including the USA, UK, Canada, Australia, and Europe.',
    },
    {
      icon: Clock,
      title: 'Save Weeks of Work',
      description: 'Get match suggestions and draft letters in minutes instead of spending hours searching blindly.',
    },
    {
      icon: Shield,
      title: 'Reliable Guidance',
      description: 'Information and models updated according to the latest admission cycles and standards.',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-semibold tracking-wide border border-indigo-100/50 dark:border-indigo-900/30 animate-pulse-slow">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered University Discovery
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                Your Journey to the{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Perfect University
                </span>{' '}
                Starts Here
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Discover, compare, and apply to top-tier universities worldwide with intelligent AI matching and custom application builders. Achieve your academic goals with ease.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to={session ? '/dashboard' : '/signup'}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all hover:-translate-y-0.5 text-base"
                >
                  {session ? 'Go to Dashboard' : 'Get Started Free'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-805 transition-all font-semibold text-base"
                >
                  Learn More
                </Link>
              </div>
              
              <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free forever plan available</span>
                </div>
              </div>
            </div>
            
            {/* Right Visual (Interactive Stack) */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
              <div className="absolute -inset-4 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-3xl blur-3xl opacity-60 animate-pulse-slow pointer-events-none" />
              
              <div className="relative w-full max-w-[420px]">
                {/* Main Hero Image */}
                <img
                  src="https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzcwMzM3MjAwfDA&ixlib=rb-4.1.0&q=80&w=600"
                  alt="Students on campus"
                  className="rounded-3xl shadow-2xl border border-gray-200/20 dark:border-gray-700/50 object-cover aspect-[4/5] w-full"
                />
                
                {/* Floating Card 1: AI Match Badge */}
                <div className="glass-card p-4 flex items-center gap-3 absolute -top-6 -right-6 shadow-xl animate-float-slow z-20 hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center font-bold text-lg">
                    98%
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">AI RECOMMENDATION</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Stanford University</p>
                  </div>
                </div>

                {/* Floating Card 2: Doc Generator status */}
                <div className="glass-card p-4 flex items-center gap-3 absolute -bottom-6 -left-6 shadow-xl animate-float-fast z-20 hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-550">SOP BUILDER</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="h-2 w-20 bg-indigo-600 rounded-full" />
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">Drafted</span>
                    </div>
                  </div>
                </div>

                {/* Floating Card 3: Deadlines Badge */}
                <div className="glass-card px-3.5 py-2 absolute top-[55%] -right-10 shadow-lg animate-float-slow z-20 hover:scale-105 transition-transform duration-300 text-left border border-white/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-900 dark:text-white">3 Deadlines This Week</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Bento Grid Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-800/20 border-y border-gray-150 dark:border-gray-800/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg sm:text-xl text-gray-650 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Simplify your college research and application journey with custom-built tools.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 (Col-span 2): Smart University Search */}
            <div className="md:col-span-2 bg-white dark:bg-gray-800/80 rounded-3xl p-8 border border-gray-150 dark:border-gray-800/80 card-hover flex flex-col justify-between group overflow-hidden relative shadow-sm">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Program Search</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm max-w-md">
                  Browse thousands of master's and bachelor's programs worldwide. Use smart filters for IELTS/TOEFL requirements, tuition limits, intakes, and countries to zero in on your list.
                </p>
              </div>
              
              {/* Mock UI Container */}
              <div className="mt-8 p-5 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800/80 space-y-4 shadow-inner">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-lg flex items-center gap-1">🇺🇸 United States</span>
                  <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-lg flex items-center gap-1">🇨🇦 Canada</span>
                  <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-lg flex items-center gap-1">🇬🇧 United Kingdom</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800/80 pt-3">
                  <span className="font-medium">Tuition Range: $15k - $30k</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">1,240 matches found</span>
                </div>
              </div>
            </div>

            {/* Card 2 (Col-span 1): AI Recommendations */}
            <div className="md:col-span-1 bg-white dark:bg-gray-800/80 rounded-3xl p-8 border border-gray-150 dark:border-gray-800/80 card-hover flex flex-col justify-between group overflow-hidden relative shadow-sm">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI Match Engine</h3>
                <p className="text-gray-650 dark:text-gray-300 leading-relaxed text-sm">
                  Get personalized recommendations matched to your unique GPA, target majors, and financial profile.
                </p>
              </div>

              {/* Match Percentage Circle mockup */}
              <div className="mt-8 flex justify-center items-center gap-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-800/80 shadow-inner">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-600 border-r-purple-500 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-base">
                  96%
                </div>
                <div className="text-xs text-left">
                  <p className="font-bold text-gray-950 dark:text-white">Strong Match</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">Aligned with your GRE</p>
                </div>
              </div>
            </div>

            {/* Card 3 (Col-span 1): SOP & Resume Builder */}
            <div className="md:col-span-1 bg-white dark:bg-gray-800/80 rounded-3xl p-8 border border-gray-150 dark:border-gray-800/80 card-hover flex flex-col justify-between group overflow-hidden relative shadow-sm">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">SOP & Resume Builder</h3>
                <p className="text-gray-650 dark:text-gray-300 leading-relaxed text-sm">
                  Generate draft Statement of Purposes and build resumes tailored to each university's expectations.
                </p>
              </div>

              {/* Document Mockup */}
              <div className="mt-8 bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-800/80 shadow-inner space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <FileText className="w-4 h-4 text-pink-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Statement_of_Purpose.docx</span>
                </div>
                <div className="space-y-2 pt-1">
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full" />
                  <div className="h-2 w-5/6 bg-gray-200 dark:bg-gray-800 rounded-full" />
                  <div className="h-2 w-3/4 bg-gray-205 dark:bg-gray-800 rounded-full" />
                </div>
              </div>
            </div>

            {/* Card 4 (Col-span 2): Application Tracker */}
            <div className="md:col-span-2 bg-white dark:bg-gray-800/80 rounded-3xl p-8 border border-gray-150 dark:border-gray-800/80 card-hover flex flex-col justify-between group overflow-hidden relative shadow-sm">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Application Tracker</h3>
                <p className="text-gray-655 dark:text-gray-300 leading-relaxed text-sm max-w-md">
                  Keep tabs on dates, deadlines, and requirements. Visualise your progress across various application stages from preparation to acceptance.
                </p>
              </div>

              {/* Progress columns mockup */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="p-3.5 bg-yellow-500/5 dark:bg-yellow-500/10 border border-yellow-200/20 dark:border-yellow-900/30 rounded-xl text-center text-xs">
                  <span className="block font-bold text-yellow-600 dark:text-yellow-400 mb-0.5">Applied</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">4 Schools</span>
                </div>
                <div className="p-3.5 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-200/20 dark:border-blue-900/30 rounded-xl text-center text-xs">
                  <span className="block font-bold text-blue-600 dark:text-blue-400 mb-0.5">Review</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">2 Schools</span>
                </div>
                <div className="p-3.5 bg-green-500/10 border border-green-200/30 dark:border-green-900/40 rounded-xl text-center text-xs animate-pulse">
                  <span className="block font-bold text-green-600 dark:text-green-400 mb-0.5">Accepted 🎉</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">Stanford & MIT</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">How It Works</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Four simple steps to securing your dream university acceptance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="glass-card p-8 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 border border-gray-150 dark:border-gray-800/80 shadow-md flex flex-col justify-between group"
              >
                <div>
                  <span className="text-xs font-extrabold px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-md">
                    STEP {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-650 dark:text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits / Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-900 via-indigo-950 to-blue-900 bg-moving-gradient text-white border-y border-indigo-500/20 relative overflow-hidden">
        {/* Floating Glows inside dark section */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Why Choose UniHunt AI?</h2>
            <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who have simplified their application process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-4 max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto shadow-inner border border-white/10 hover:rotate-6 transition-transform">
                  <benefit.icon className="w-8 h-8 text-indigo-200" />
                </div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-indigo-100/80 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to={session ? '/dashboard' : '/signup'}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 rounded-xl hover:bg-gray-50 hover:shadow-lg transition-all font-bold text-base"
            >
              {session ? 'Go to Dashboard' : 'Start Your Journey Today'}
              <ArrowRight className="w-4 h-4 text-indigo-900" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            <div className="space-y-1">
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">10,000+</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Universities</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">50+</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Countries</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">100k+</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Happy Students</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">95%</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gray-50/50 dark:bg-transparent border-t border-gray-150 dark:border-gray-800/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-12 md:p-16 rounded-3xl text-center relative overflow-hidden border border-indigo-150/40 dark:border-indigo-900/30">
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 relative z-10 tracking-tight">
              Ready to Find Your Dream University?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-405 mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Join UniHunt AI today and experience the future of university applications. Build your profile, match programs, and write documents in one place.
            </p>
            <div className="relative z-10">
              <Link
                to={session ? '/dashboard' : '/signup'}
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all hover:-translate-y-0.5 text-base"
              >
                {session ? 'Go to Dashboard' : 'Get Started Free'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}