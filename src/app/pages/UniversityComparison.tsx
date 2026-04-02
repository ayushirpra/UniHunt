import { X, Trophy, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { getPlaceholderLogo } from '@/lib/imageUtils';

// Highlight the best (lowest/highest) value in a row
function getBestIndex(values: (number | null)[], mode: 'min' | 'max'): number {
  const valid = values.map((v, i) => ({ v, i })).filter((x) => x.v !== null) as { v: number; i: number }[];
  if (valid.length === 0) return -1;
  return mode === 'min'
    ? valid.reduce((a, b) => (a.v < b.v ? a : b)).i
    : valid.reduce((a, b) => (a.v > b.v ? a : b)).i;
}

interface Row {
  label: string;
  getValue: (uni: any) => string;
  getNumeric?: (uni: any) => number | null;
  bestMode?: 'min' | 'max';
}

const ROWS: Row[] = [
  { label: 'Country', getValue: (u) => u.country || 'N/A' },
  {
    label: 'World Ranking',
    getValue: (u) => u.ranking ? `#${u.ranking}` : 'N/A',
    getNumeric: (u) => u.ranking ?? null,
    bestMode: 'min',
  },
  {
    label: 'Tuition (USD/yr)',
    getValue: (u) => u.tuition_min ? `$${Number(u.tuition_min).toLocaleString()}` : (u.tuitionFee || 'N/A'),
    getNumeric: (u) => u.tuition_min ?? null,
    bestMode: 'min',
  },
  {
    label: 'Living Cost (USD/yr)',
    getValue: (u) => u.living_cost ? `$${Number(u.living_cost).toLocaleString()}` : 'N/A',
    getNumeric: (u) => u.living_cost ?? null,
    bestMode: 'min',
  },
  {
    label: 'Acceptance Rate',
    getValue: (u) => u.acceptance_rate != null ? `${u.acceptance_rate}%` : 'N/A',
    getNumeric: (u) => u.acceptance_rate ?? null,
    bestMode: 'max',
  },
  {
    label: 'GPA Requirement',
    getValue: (u) => u.gpa_requirement != null ? `${u.gpa_requirement}/4.0` : 'N/A',
    getNumeric: (u) => u.gpa_requirement ?? null,
    bestMode: 'min',
  },
  {
    label: 'IELTS Requirement',
    getValue: (u) => u.ielts_requirement != null ? `${u.ielts_requirement}` : 'N/A',
    getNumeric: (u) => u.ielts_requirement ?? null,
    bestMode: 'min',
  },
  {
    label: 'TOEFL Requirement',
    getValue: (u) => u.toefl_requirement != null ? `${u.toefl_requirement}` : 'N/A',
    getNumeric: (u) => u.toefl_requirement ?? null,
    bestMode: 'min',
  },
  { label: 'Course Duration', getValue: (u) => u.course_duration || 'N/A' },
  {
    label: 'Scholarships',
    getValue: (u) => u.scholarships === true ? '✅ Available' : u.scholarships === false ? '❌ No' : 'N/A',
  },
  { label: 'Application Deadline', getValue: (u) => u.deadline || 'N/A' },
];

export function UniversityComparison() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No universities selected</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Go to Search and click "Compare" on universities you want to compare.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Universities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">University Comparison</h1>
            <p className="text-gray-600 dark:text-gray-400">Side-by-side comparison of {compareList.length} universities</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/search')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              + Add More
            </button>
            <button
              onClick={clearCompare}
              className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Best value legend */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span>Gold highlight = best value in that category</span>
        </div>

        {/* Comparison Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                  {/* Criteria column */}
                  <th className="text-left p-5 font-semibold text-gray-700 dark:text-gray-300 min-w-[180px] sticky left-0 bg-indigo-50 dark:bg-indigo-900/20 z-10">
                    Criteria
                  </th>
                  {compareList.map((uni) => (
                    <th key={uni.id} className="p-5 min-w-[220px] text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <img
                            src={uni.logo_url || getPlaceholderLogo(uni.name)}
                            alt={uni.name}
                            className="w-12 h-12 object-contain rounded-lg mb-3 bg-white/50 backdrop-blur-sm p-1 border border-indigo-100 shadow-sm transition-transform duration-300 hover:scale-110"
                            onError={(e) => { e.currentTarget.src = getPlaceholderLogo(uni.name); }}
                          />
                          <div className="font-semibold text-gray-900 dark:text-white text-base leading-tight">
                            {uni.name}
                          </div>
                          <Link
                            to={`/university/${uni.id}`}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-0.5 block"
                          >
                            View Details →
                          </Link>
                        </div>
                        <button
                          onClick={() => removeFromCompare(uni.id)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors shrink-0"
                        >
                          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, rowIdx) => {
                  // Compute best index for numeric rows
                  const numerics = row.getNumeric
                    ? compareList.map((u) => row.getNumeric!(u))
                    : null;
                  const bestIdx = numerics && row.bestMode
                    ? getBestIndex(numerics, row.bestMode)
                    : -1;

                  return (
                    <tr
                      key={rowIdx}
                      className={rowIdx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}
                    >
                      <td className="p-5 font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-inherit text-sm">
                        {row.label}
                      </td>
                      {compareList.map((uni, colIdx) => {
                        const isBest = bestIdx === colIdx;
                        return (
                          <td
                            key={uni.id}
                            className={`p-5 text-sm transition-colors ${
                              isBest
                                ? 'bg-yellow-50 dark:bg-yellow-900/20 font-semibold text-yellow-800 dark:text-yellow-300'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              {isBest && <Trophy className="w-3.5 h-3.5 text-yellow-500 shrink-0" />}
                              {row.getValue(uni)}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 text-sm">💡 Comparison Tips</h3>
          <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-300 list-disc list-inside">
            <li>Gold highlights show the best value in each category</li>
            <li>Consider total cost = tuition + living cost when comparing</li>
            <li>Higher acceptance rate = easier admission</li>
            <li>Check scholarship availability to offset tuition costs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
