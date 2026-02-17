import { useState } from 'react';
import { User, Mail, MapPin, GraduationCap, Calendar, Save, Edit2 } from 'lucide-react';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'User Name',
    email: 'user@email.com',
    phone: '+1234567890',
    country: 'United States',
    city: 'Boston',
    currentEducation: "Bachelor's Degree",
    field: 'Computer Science',
    gpa: '3.8',
    graduationYear: '2025',
    desiredDegree: "Master's",
    desiredField: 'Artificial Intelligence',
    budget: '$40,000 - $60,000',
    preferredCountries: ['USA', 'UK', 'Canada'],
    intake: 'Fall 2026',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save to backend
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your personal information and preferences</p>
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Academic Background</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Education Level
                </label>
                <select
                  value={profile.currentEducation}
                  onChange={(e) => setProfile({ ...profile, currentEducation: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                >
                  <option>High School</option>
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>PhD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={profile.field}
                  onChange={(e) => setProfile({ ...profile, field: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GPA</label>
                <input
                  type="text"
                  value={profile.gpa}
                  onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Graduation Year
                </label>
                <input
                  type="text"
                  value={profile.graduationYear}
                  onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Study Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Study Preferences</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Desired Degree
                </label>
                <select
                  value={profile.desiredDegree}
                  onChange={(e) => setProfile({ ...profile, desiredDegree: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                >
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>PhD</option>
                  <option>Diploma</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Desired Field
                </label>
                <input
                  type="text"
                  value={profile.desiredField}
                  onChange={(e) => setProfile({ ...profile, desiredField: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Annual Budget (USD)
                </label>
                <select
                  value={profile.budget}
                  onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                >
                  <option>$0 - $20,000</option>
                  <option>$20,000 - $40,000</option>
                  <option>$40,000 - $60,000</option>
                  <option>$60,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Intake
                </label>
                <select
                  value={profile.intake}
                  onChange={(e) => setProfile({ ...profile, intake: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                >
                  <option>Fall 2026</option>
                  <option>Spring 2027</option>
                  <option>Fall 2027</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Preferred Countries
              </label>
              <div className="flex flex-wrap gap-2">
                {profile.preferredCountries.map((country) => (
                  <span
                    key={country}
                    className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-lg text-sm font-medium"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
