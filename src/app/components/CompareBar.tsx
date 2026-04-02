import { X, GitCompare, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';

export function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t-2 border-indigo-500 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
          <GitCompare className="w-5 h-5" />
          Compare ({compareList.length}/4)
        </div>

        {/* Selected universities */}
        <div className="flex-1 flex items-center gap-3 overflow-x-auto">
          {compareList.map((uni) => (
            <div
              key={uni.id}
              className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-lg px-3 py-1.5 shrink-0"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white max-w-[140px] truncate">
                {uni.name}
              </span>
              <button
                onClick={() => removeFromCompare(uni.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: 4 - compareList.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex items-center justify-center w-32 h-9 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg shrink-0"
            >
              <span className="text-xs text-gray-400 dark:text-gray-500">+ Add</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
          <button
            onClick={() => navigate('/compare')}
            disabled={compareList.length < 2}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
}
