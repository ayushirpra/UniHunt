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
} from 'lucide-react';

export function Landing() {
  const features = [
    {
      icon: Search,
      title: 'Smart University Search',
      description: 'Find your perfect match from thousands of universities worldwide with AI-powered filtering.',
    },
    {
      icon: Sparkles,
      title: 'AI Recommendations',
      description: 'Get personalized university suggestions based on your profile, goals, and preferences.',
    },
    {
      icon: FileText,
      title: 'SOP & Resume Builder',
      description: 'Create compelling application documents with AI assistance tailored to each university.',
    },
    {
      icon: BarChart3,
      title: 'Application Tracking',
      description: 'Monitor all your applications, deadlines, and progress in one centralized dashboard.',
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Profile',
      description: 'Tell us about your academic background, goals, and preferences.',
    },
    {
      step: '02',
      title: 'Discover Universities',
      description: 'Browse and compare universities with our intelligent search and filters.',
    },
    {
      step: '03',
      title: 'Get AI Assistance',
      description: 'Use our AI tools to create personalized SOPs and resumes.',
    },
    {
      step: '04',
      title: 'Track & Apply',
      description: 'Manage deadlines and track your application status effortlessly.',
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access 10,000+ universities across 50+ countries.',
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Streamline your application process and never miss a deadline.',
    },
    {
      icon: Shield,
      title: 'Expert Guidance',
      description: 'AI-powered insights backed by admission experts.',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-indigo-950/30 dark:via-gray-900 dark:to-blue-950/30 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered University Discovery
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Your Journey to the Perfect University Starts Here
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Discover, compare, and apply to universities worldwide with intelligent AI assistance.
                Make confident decisions for your future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-lg font-medium"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition-colors text-lg font-medium"
                >
                  Learn More
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free forever plan</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzcwMzM3MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students on campus"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful tools to simplify your university search and application process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Four simple steps to your dream university
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-indigo-100 dark:text-indigo-900/50 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-indigo-200 dark:text-indigo-800">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose UniHunt AI?</h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Join thousands of students who found their perfect university match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-indigo-100">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-colors text-lg font-medium"
            >
              Start Your Journey Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Universities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">100,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Find Your Dream University?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join UniHunt AI today and take the first step toward your future.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-lg font-medium"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}