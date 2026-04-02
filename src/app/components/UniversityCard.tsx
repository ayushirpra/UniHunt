import { Heart, MapPin, Star, DollarSign, Calendar, GitCompare, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCompare, CompareUniversity } from '../context/CompareContext';

interface UniversityCardProps {
  id: string;
  name: string;
  location: string;
  country: string;
  ranking: number;
  rating: number;
  tuitionFee: string;
  deadline: string;
  image: string;
  logo_url?: string;
  saved?: boolean;
  matchScore?: number;
  tag?: 'Safe' | 'Moderate' | 'Ambitious' | 'Recommended';
  onToggleSave?: (id: string) => void;
  onTrack?: (id: string, name: string) => void;
  // Raw data for comparison
  rawData?: Partial<CompareUniversity>;
}

const TAG_STYLES: Record<string, string> = {
  Safe: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  Moderate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  Ambitious: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  Recommended: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400',
};

export function UniversityCard({
  id, name, location, country, ranking, rating, tuitionFee, deadline,
  image, logo_url, saved = false, matchScore, tag, onToggleSave, onTrack, rawData,
}: UniversityCardProps) {
  const [imgError, setImgError] = useState(false);
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(id);

  const getPlaceholderImage = () =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=4F46E5&color=fff&bold=true`;

  const displayImage = logo_url || image || getPlaceholderImage();

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCompare) {
      removeFromCompare(id);
    } else {
      addToCompare({
        id, name, country,
        city: location,
        ...rawData,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] card-hover animate-slide-up">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 group flex items-center justify-center">
        <img
          src={imgError ? getPlaceholderImage() : displayImage}
          alt={`${name} logo`}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); onToggleSave?.(id); }}
          className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Heart className={`w-5 h-5 transition-all duration-300 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400 hover:text-red-500'}`} />
        </button>

        {/* Ranking badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full shadow-lg">
          #{ranking || 'N/A'}
        </div>

        {/* Tag badge */}
        {tag && (
          <div className={`absolute bottom-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full ${TAG_STYLES[tag]}`}>
            {tag}
          </div>
        )}

        {/* Match score */}
        {matchScore !== undefined && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/90 dark:bg-gray-800/90 text-xs font-bold text-indigo-600 dark:text-indigo-400 rounded-full shadow">
            {matchScore}% match
          </div>
        )}
      </div>

      <Link to={`/university/${id}`} className="block p-5">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">{name}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{location}, {country}</span>
        </div>
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-900 dark:text-white">{rating || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4" />
            <span>{tuitionFee}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>Deadline: {deadline}</span>
        </div>
      </Link>

      {/* Action buttons */}
      <div className="px-5 pb-4 flex gap-2">
        <button
          onClick={handleCompareToggle}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg border transition-colors ${
            inCompare
              ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
              : 'border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
          }`}
        >
          <GitCompare className="w-3.5 h-3.5" />
          {inCompare ? 'Added' : 'Compare'}
        </button>
        <button
          onClick={(e) => { e.preventDefault(); onTrack?.(id, name); }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg border border-green-300 dark:border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Track
        </button>
      </div>
    </div>
  );
}
