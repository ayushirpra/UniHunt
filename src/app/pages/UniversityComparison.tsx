import { X, Check, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function UniversityComparison() {
  // Mock data for comparison
  const universities = [
    {
      id: '1',
      name: 'MIT',
      location: 'Cambridge, USA',
      ranking: 1,
      rating: 4.8,
      tuition: '$53,790/year',
      acceptanceRate: '7%',
      studentCount: '11,520',
      international: '33%',
      duration: '2 years',
      deadline: 'Feb 15, 2026',
      employmentRate: '95%',
      avgSalary: '$120,000',
      research: 'Excellent',
      housing: 'Available',
      scholarships: 'Yes',
    },
    {
      id: '2',
      name: 'Stanford',
      location: 'Stanford, USA',
      ranking: 2,
      rating: 4.9,
      tuition: '$56,169/year',
      acceptanceRate: '5%',
      studentCount: '17,249',
      international: '23%',
      duration: '2 years',
      deadline: 'Feb 20, 2026',
      employmentRate: '96%',
      avgSalary: '$125,000',
      research: 'Excellent',
      housing: 'Available',
      scholarships: 'Yes',
    },
    {
      id: '3',
      name: 'Harvard',
      location: 'Cambridge, USA',
      ranking: 3,
      rating: 4.7,
      tuition: '$51,904/year',
      acceptanceRate: '6%',
      studentCount: '31,566',
      international: '25%',
      duration: '2 years',
      deadline: 'Mar 1, 2026',
      employmentRate: '94%',
      avgSalary: '$118,000',
      research: 'Excellent',
      housing: 'Limited',
      scholarships: 'Yes',
    },
  ];

  const comparisonRows = [
    { label: 'World Ranking', key: 'ranking', format: (val: any) => `#${val}` },
    { label: 'Rating', key: 'rating', format: (val: any) => `${val}/5.0` },
    { label: 'Location', key: 'location' },
    { label: 'Annual Tuition', key: 'tuition' },
    { label: 'Acceptance Rate', key: 'acceptanceRate' },
    { label: 'Total Students', key: 'studentCount' },
    { label: 'International Students', key: 'international' },
    { label: 'Program Duration', key: 'duration' },
    { label: 'Application Deadline', key: 'deadline' },
    { label: 'Employment Rate', key: 'employmentRate' },
    { label: 'Average Starting Salary', key: 'avgSalary' },
    { label: 'Research Opportunities', key: 'research' },
    { label: 'On-Campus Housing', key: 'housing' },
    { label: 'Scholarships Available', key: 'scholarships' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">University Comparison</h1>
          <p className="text-gray-600 dark:text-gray-400">Compare universities side by side to make an informed decision</p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                  <th className="text-left p-6 font-semibold text-gray-900 dark:text-white min-w-[200px] sticky left-0 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                    Criteria
                  </th>
                  {universities.map((uni) => (
                    <th key={uni.id} className="p-6 min-w-[250px]">
                      <div className="text-left">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{uni.name}</h3>
                          <button className="p-1 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>
                        <Link
                          to={`/university/${uni.id}`}
                          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                        >
                          View Details →
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}
                  >
                    <td className="p-6 font-medium text-gray-900 dark:text-white sticky left-0 bg-inherit">
                      {row.label}
                    </td>
                    {universities.map((uni) => {
                      const value = uni[row.key as keyof typeof uni];
                      const displayValue = row.format ? row.format(value) : value;
                      
                      return (
                        <td key={uni.id} className="p-6 text-gray-700 dark:text-gray-300">
                          {row.key === 'research' || row.key === 'housing' || row.key === 'scholarships' ? (
                            <div className="flex items-center gap-2">
                              {displayValue === 'Yes' || displayValue === 'Available' || displayValue === 'Excellent' ? (
                                <>
                                  <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
                                  <span>{displayValue}</span>
                                </>
                              ) : displayValue === 'Limited' ? (
                                <>
                                  <Minus className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                                  <span>{displayValue}</span>
                                </>
                              ) : (
                                <span>{displayValue}</span>
                              )}
                            </div>
                          ) : (
                            displayValue
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/search"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Add More Universities
          </Link>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            Export Comparison
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Comparison Tips</h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Consider not just rankings, but also factors like location, cost, and program fit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Research opportunities and employment rates are key indicators of program quality</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Check if scholarships are available to help with tuition costs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Visit university websites and connect with current students for insider perspectives</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
