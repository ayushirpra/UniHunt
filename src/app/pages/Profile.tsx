import { useState, useEffect } from 'react';
import { User, Mail, GraduationCap, MapPin, Save, Edit2, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    academicLevel: '',
    preferredCountries: '',
    budgetMin: 0,
    budgetMax: 0,
    gpa: 0,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please log in to view your profile');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile({
        fullName: data.full_name || '',
        email: user.email || '',
        academicLevel: data.academic_level || '',
        preferredCountries: data.preferred_countries || '',
        budgetMin: data.budget_min || 0,
        budgetMax: data.budget_max || 0,
        gpa: data.gpa || 0,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.fullName,
          academic_level: profile.academicLevel,
          preferred_countries: profile.preferredCountries,
          budget_min: profile.budgetMin,
          budget_max: profile.budgetMax,
          gpa: profile.gpa,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !profile.email) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-2">Failed to load profile</h3>
            <p className="text-red-700 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchProfile}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <p className="text-green-700 dark:text-green-400 text-center font-medium">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <p className="text-red-700 dark:text-red-400 text-center font-medium">{error}</p>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your personal information and preferences</p>
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? (
              <>
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {saving ? 'Saving...' : 'Save Changes'}
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
                  disabled={true}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Your phone number"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Academic Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Academic Level
                </label>
                <select
                  value={profile.academicLevel}
                  onChange={(e) => setProfile({ ...profile, academicLevel: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                >
                  <option value="">Select level</option>
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GPA (0-4.0)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={profile.gpa}
                  onChange={(e) => setProfile({ ...profile, gpa: parseFloat(e.target.value) || 0 })}
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
                  Preferred Countries (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., USA, UK, Canada"
                  value={profile.preferredCountries}
                  onChange={(e) => setProfile({ ...profile, preferredCountries: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget Min (USD)
                </label>
                <input
                  type="number"
                  min="0"
                  value={profile.budgetMin}
                  onChange={(e) => setProfile({ ...profile, budgetMin: parseInt(e.target.value) || 0 })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget Max (USD)
                </label>
                <input
                  type="number"
                  min="0"
                  value={profile.budgetMax}
                  onChange={(e) => setProfile({ ...profile, budgetMax: parseInt(e.target.value) || 0 })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-600 dark:disabled:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
