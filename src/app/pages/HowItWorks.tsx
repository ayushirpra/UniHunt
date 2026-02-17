import { UserPlus, Search, Sparkles, FileText, Send, CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description:
        'Sign up and tell us about your academic background, interests, and goals. The more we know, the better we can help you.',
      features: ['Academic history', 'Study preferences', 'Budget and location', 'Career goals'],
    },
    {
      icon: Search,
      title: 'Explore Universities',
      description:
        'Browse thousands of universities worldwide with powerful search and filtering tools. Compare programs, rankings, costs, and more.',
      features: [
        'Advanced filters',
        'Side-by-side comparison',
        'Real-time data',
        'Student reviews',
      ],
    },
    {
      icon: Sparkles,
      title: 'Get AI Recommendations',
      description:
        'Our AI analyzes your profile and suggests universities that match your goals, increasing your chances of acceptance and success.',
      features: [
        'Personalized matches',
        'Match percentage',
        'Success predictions',
        'Hidden gems',
      ],
    },
    {
      icon: FileText,
      title: 'Prepare Documents',
      description:
        'Use our AI-powered tools to create compelling SOPs, resumes, and other application materials tailored to each university.',
      features: [
        'SOP generator',
        'Resume builder',
        'Document templates',
        'Expert tips',
      ],
    },
    {
      icon: Send,
      title: 'Track Applications',
      description:
        'Manage all your applications in one place. Track deadlines, monitor status updates, and never miss an important date.',
      features: [
        'Deadline reminders',
        'Status tracking',
        'Document checklist',
        'Progress dashboard',
      ],
    },
    {
      icon: CheckCircle,
      title: 'Get Accepted',
      description:
        'Receive your acceptance letters and make informed decisions about your future. We\'re with you every step of the way.',
      features: ['Decision support', 'Visa guidance', 'Next steps', 'Success stories'],
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-indigo-950/30 dark:via-gray-900 dark:to-blue-950/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">How UniHunt AI Works</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A simple, AI-powered process to help you find and apply to your dream university
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/20">
                      <step.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{step.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {step.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-12 aspect-square flex items-center justify-center">
                    <step.icon className="w-32 h-32 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join UniHunt AI today and let us help you find your perfect university match
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-colors text-lg font-medium">
            Create Free Account
          </button>
        </div>
      </section>
    </div>
  );
}
