import { Link } from 'react-router-dom';
import { Sparkles, Brain, FileText, User, MessageSquare, Zap, TrendingUp } from 'lucide-react';

export function AITools() {
  const stats = [
    { label: 'AI Tools Available', value: '4', icon: Zap },
    { label: 'SOPs Generated', value: '1,234', icon: FileText },
    { label: 'Recommendations Made', value: '5,678', icon: TrendingUp },
  ];

  const tools = [
    {
      id: 'university-matcher',
      title: 'AI University Matcher',
      description: 'Get personalized university recommendations based on your profile, preferences, and academic goals.',
      icon: Brain,
      gradient: 'from-purple-600 to-indigo-600',
      link: '/ai-recommendations',
      features: ['Smart matching algorithm', 'Personalized results', 'Detailed insights'],
      available: true,
    },
    {
      id: 'sop-generator',
      title: 'AI SOP Generator',
      description: 'Create compelling statements of purpose with AI assistance tailored to your target universities.',
      icon: FileText,
      gradient: 'from-blue-600 to-cyan-600',
      link: '/ai-sop',
      features: ['Custom templates', 'AI-powered writing', 'Multiple revisions'],
      available: true,
    },
    {
      id: 'resume-builder',
      title: 'AI Resume Builder',
      description: 'Build professional resumes optimized for university applications with AI-powered suggestions.',
      icon: User,
      gradient: 'from-green-600 to-emerald-600',
      link: '/ai-resume',
      features: ['ATS-friendly formats', 'Smart suggestions', 'Export to PDF'],
      available: false,
    },
    {
      id: 'interview-prep',
      title: 'AI Interview Prep',
      description: 'Practice interviews with AI-powered mock sessions and get instant feedback on your responses.',
      icon: MessageSquare,
      gradient: 'from-orange-600 to-red-600',
      link: '/ai-interview',
      features: ['Mock interviews', 'Real-time feedback', 'Common questions'],
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">AI-Powered Tools</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Leverage cutting-edge AI technology to streamline your university application journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                  <stat.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`h-2 bg-gradient-to-r ${tool.gradient}`} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 bg-gradient-to-br ${tool.gradient} rounded-xl`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  {!tool.available && (
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-semibold rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{tool.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{tool.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tool.gradient}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={tool.link}
                  className={`block w-full py-3 text-center rounded-lg font-medium transition-all ${
                    tool.available
                      ? `bg-gradient-to-r ${tool.gradient} text-white hover:opacity-90`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={(e) => !tool.available && e.preventDefault()}
                >
                  {tool.available ? 'Launch Tool' : 'Coming Soon'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
