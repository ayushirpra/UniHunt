import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    country: '',
    educationLevel: '',
    fieldOfStudy: '',
    gpa: '',
    budget: '',
    studyDestinations: [] as string[],
    degreeType: '',
    intake: '',
  });
  const navigate = useNavigate();

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleDestination = (destination: string) => {
    setFormData({
      ...formData,
      studyDestinations: formData.studyDestinations.includes(destination)
        ? formData.studyDestinations.filter((d) => d !== destination)
        : [...formData.studyDestinations, destination],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-transparent dark:border-gray-700">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Tell us about your background
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                This helps us recommend the best universities for you
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none"
                  >
                    <option value="">Select your country</option>
                    <option value="india">India</option>
                    <option value="china">China</option>
                    <option value="usa">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Education Level
                  </label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none"
                  >
                    <option value="">Select education level</option>
                    <option value="high-school">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={formData.fieldOfStudy}
                    onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    placeholder="Your field of study"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GPA / Grade</label>
                  <input
                    type="text"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    placeholder="Your GPA or grade"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Study Preferences */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your study preferences</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">What are you looking for in a university?</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Desired Degree Type
                  </label>
                  <select
                    value={formData.degreeType}
                    onChange={(e) => setFormData({ ...formData, degreeType: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none"
                  >
                    <option value="">Select degree type</option>
                    <option value="bachelors">Bachelor's</option>
                    <option value="masters">Master's</option>
                    <option value="phd">PhD</option>
                    <option value="diploma">Diploma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Preferred Study Destinations (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands'].map(
                      (destination) => (
                        <button
                          key={destination}
                          type="button"
                          onClick={() => toggleDestination(destination)}
                          className={`px-4 py-3 rounded-lg border-2 transition-all ${
                            formData.studyDestinations.includes(destination)
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                              : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          {destination}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Intake
                  </label>
                  <select
                    value={formData.intake}
                    onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none"
                  >
                    <option value="">Select intake</option>
                    <option value="fall-2026">Fall 2026</option>
                    <option value="spring-2027">Spring 2027</option>
                    <option value="fall-2027">Fall 2027</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Annual Budget (USD)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none"
                  >
                    <option value="">Select budget range</option>
                    <option value="0-20k">$0 - $20,000</option>
                    <option value="20k-40k">$20,000 - $40,000</option>
                    <option value="40k-60k">$40,000 - $60,000</option>
                    <option value="60k+">$60,000+</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You're all set!</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We've customized your experience based on your preferences
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Field of Study:</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formData.fieldOfStudy || 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Degree Type:</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formData.degreeType || 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Destinations:</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white text-right">
                    {formData.studyDestinations.join(', ') || 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Budget:</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formData.budget || 'Not specified'}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-6">
                You can update these preferences anytime from your profile settings
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                step === 1
                  ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {step === totalSteps ? 'Complete' : 'Continue'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
