import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for exploring universities',
      features: [
        'Browse 10,000+ universities',
        'Basic search and filters',
        'Save up to 10 universities',
        'Track up to 5 deadlines',
        'Basic profile',
        'Community support',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For serious applicants',
      features: [
        'Everything in Free, plus:',
        'AI-powered recommendations',
        'Unlimited saved universities',
        'Unlimited deadline tracking',
        'AI SOP generator (5/month)',
        'AI resume builder',
        'Advanced comparison tools',
        'Priority email support',
        'Application progress tracking',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '$99',
      period: 'per month',
      description: 'Complete application support',
      features: [
        'Everything in Pro, plus:',
        'Unlimited AI SOP generation',
        'Unlimited AI resume versions',
        'Personal application consultant',
        '1-on-1 video consultations',
        'Document review service',
        'Interview preparation',
        'Visa guidance',
        'Post-acceptance support',
        '24/7 priority support',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-indigo-950/30 dark:via-gray-900 dark:to-blue-950/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start free and upgrade as you need more features. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl border-2 p-8 ${
                  plan.highlighted
                    ? 'border-indigo-600 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 shadow-xl scale-105'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-full text-sm font-medium mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">/ {plan.period}</span>
                </div>

                <Link
                  to="/signup"
                  className={`block w-full py-3 rounded-lg text-center font-medium transition-colors mb-8 ${
                    plan.highlighted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {plan.cta}
                </Link>

                <div className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span
                        className={`text-sm ${
                          feature.startsWith('Everything') ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Can I change plans anytime?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take
                  effect immediately.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Pro plan comes with a 14-day free trial. No credit card required to start.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We accept all major credit cards, debit cards, and PayPal for your convenience.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Do you offer student discounts?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! Students get 20% off on all paid plans. Contact us with your student ID.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Our team is here to help you choose the right plan for your needs
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-colors text-lg font-medium"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
