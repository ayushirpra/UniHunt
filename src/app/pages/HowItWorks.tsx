import { UserPlus, Search, Sparkles, FileText, Send, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Sign up and tell us about your academic background, interests, and goals. The more we know, the better we can help you.',
      features: ['Academic history', 'Study preferences', 'Budget and location', 'Career goals'],
    },
    {
      icon: Search,
      title: 'Explore Universities',
      description: 'Browse thousands of universities worldwide with powerful search and filtering tools. Compare programs, rankings, costs, and more.',
      features: ['Advanced filters', 'Side-by-side comparison', 'Real-time data', 'Student reviews'],
    },
    {
      icon: Sparkles,
      title: 'Get AI Recommendations',
      description: 'Our AI analyzes your profile and suggests universities that match your goals, increasing your chances of acceptance and success.',
      features: ['Personalized matches', 'Match percentage', 'Success predictions', 'Hidden gems'],
    },
    {
      icon: FileText,
      title: 'Prepare Documents',
      description: 'Use our AI-powered tools to create compelling SOPs, resumes, and other application materials tailored to each university.',
      features: ['SOP generator', 'Resume builder', 'Document templates', 'Expert tips'],
    },
    {
      icon: Send,
      title: 'Track Applications',
      description: 'Manage all your applications in one place. Track deadlines, monitor status updates, and never miss an important date.',
      features: ['Deadline reminders', 'Status tracking', 'Document checklist', 'Progress dashboard'],
    },
    {
      icon: CheckCircle,
      title: 'Get Accepted',
      description: 'Receive your acceptance letters and make informed decisions about your future. We\'re with you every step of the way.',
      features: ['Decision support', 'Visa guidance', 'Next steps', 'Success stories'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10 dark:from-indigo-900/30 dark:via-purple-900/10 dark:to-blue-900/30" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        <motion.div 
          className="relative max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold text-sm tracking-wide border border-indigo-200 dark:border-indigo-800 shadow-sm">
            Simplified Admissions
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">UniHunt AI</span> Works
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A seamless, intelligent journey from dreaming about college to receiving your acceptance letter.
          </motion.p>
        </motion.div>
      </section>

      {/* Timeline Steps Section */}
      <section className="py-24 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative">
          
          {/* Central Timeline Line (hidden on mobile) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 via-purple-200 to-blue-200 dark:from-indigo-800 dark:via-purple-800 dark:to-blue-800 transform -translate-x-1/2 rounded-full opacity-50" />

          <div className="space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}
                >
                  {/* Timeline Dot (Desktop only) */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white dark:bg-gray-900 border-4 border-indigo-500 dark:border-indigo-400 rounded-full items-center justify-center z-20 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{index + 1}</span>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pr-12 text-left' : 'lg:pl-12 lg:text-left text-left'}`}>
                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-3xl p-8 lg:p-10 shadow-xl dark:shadow-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-lg border border-indigo-200 dark:border-indigo-800">
                          {index + 1}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{step.title}</h2>
                      </div>
                      
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{step.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {step.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-3 group">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-all">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                            <span className="text-base text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{feature}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Visual/Icon Side */}
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                      className="relative bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 w-64 h-64 lg:w-80 lg:h-80 rounded-[3rem] p-8 flex items-center justify-center shadow-inner border border-white/50 dark:border-white/5 overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <step.icon className="w-32 h-32 text-indigo-600 dark:text-indigo-400 drop-shadow-xl" strokeWidth={1.5} />
                    </motion.div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl relative"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 py-16 px-8 md:px-16 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to Accelerate Your Future?</h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who found their dream university using UniHunt AI. Start your personalized journey today.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-indigo-700 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all"
            >
              Start For Free
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
