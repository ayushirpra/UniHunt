import { Target, Users, Award, Heart } from 'lucide-react';

export function About() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About UniHunt AI</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              We're on a mission to democratize access to global education through AI-powered
              university discovery and application support.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              UniHunt AI was founded with a simple yet powerful vision: to help every student find
              their perfect university match, regardless of background or location. We believe that
              education has the power to transform lives, and finding the right university is the
              first step in that journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/20 mb-4">
                <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Precision Matching</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI algorithms analyze 50+ factors to find your perfect university matches
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Global Community</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join 100,000+ students from around the world on their education journey
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Expert Guidance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered tools backed by insights from admission experts
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Student First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every feature designed with student success and well-being in mind
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  UniHunt AI was born from the personal experiences of our founders, who struggled
                  with the overwhelming process of finding and applying to universities abroad. The
                  lack of personalized guidance and the complexity of managing multiple applications
                  inspired us to create a better solution.
                </p>
                <p>
                  Since our launch in 2024, we've helped over 100,000 students discover their dream
                  universities and successfully navigate the application process. Our AI-powered
                  platform has matched students with universities across 50+ countries, leading to
                  countless success stories.
                </p>
                <p>
                  Today, UniHunt AI continues to evolve, incorporating the latest AI technologies
                  and user feedback to make the university search and application process as smooth
                  and stress-free as possible.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1758270704262-ecc82b23dc37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29sbGVnZSUyMHN0dWRlbnRzJTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzcwMzE3MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Students studying"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe quality education guidance should be accessible to everyone, regardless
                of their background or financial situation.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We continuously innovate, leveraging cutting-edge AI to provide the best possible
                experience for our users.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Transparency</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to being transparent about how our platform works and the value we
                provide to students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of students who have found their dream university with UniHunt AI
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-colors text-lg font-medium">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}
