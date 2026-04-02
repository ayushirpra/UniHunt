import { Heart, MapPin, Star, DollarSign, Calendar, GitCompare, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCompare, type CompareUniversity } from '../context/CompareContext';
import { getPlaceholderCampus, getPlaceholderLogo } from '@/lib/imageUtils';

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
  Safe: 'bg-green-100/90 text-green-700 dark:bg-green-500/20 dark:text-green-300',
  Moderate: 'bg-yellow-100/90 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300',
  Ambitious: 'bg-red-100/90 text-red-700 dark:bg-red-500/20 dark:text-red-300',
  Recommended: 'bg-indigo-100/90 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300',
};

export function UniversityCard({
  id, name, location, country, ranking, rating, tuitionFee, deadline,
  image, logo_url, saved = false, matchScore, tag, onToggleSave, onTrack, rawData,
}: UniversityCardProps) {
  const [imgError, setImgError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(id);

  const campusImage = imgError || !image ? getPlaceholderCampus(name) : image;
  const logoSrc = logoError || !logo_url ? getPlaceholderLogo(name) : logo_url;

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
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 group">
        {/* Campus Background Image with Hover Zoom */}
        <img
          src={campusImage}
          alt={`${name} campus`}
          onError={() => setImgError(true)}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Soft Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

        {/* Floating Logo Badge */}
        <div className="absolute bottom-6 left-5 w-14 h-14 rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-1.5 shadow-2xl border border-white/40 dark:border-white/20 z-10 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <img
            src={logoSrc}
            alt={`${name} logo`}
            onError={() => setLogoError(true)}
            loading="lazy"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); onToggleSave?.(id); }}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white dark:hover:bg-gray-700 active:scale-95 z-10 group/btn"
        >
          <Heart className={`w-4 h-4 transition-all duration-300 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300 group-hover/btn:text-red-500'}`} />
        </button>

        {/* Tags Row */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 w-[calc(100%-3rem)] z-10 pointer-events-none transition-transform duration-500 group-hover:translate-x-1">
          {/* Ranking badge */}
          <div className="px-3 py-1 bg-indigo-600/90 backdrop-blur-sm border border-white/10 text-white text-xs font-semibold rounded-full shadow-lg">
            #{ranking || 'N/A'}
          </div>

          {/* Type Tag */}
          {tag && (
            <div className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full shadow-lg backdrop-blur-md border border-white/10 ${TAG_STYLES[tag]}`}>
              {tag}
            </div>
          )}
        </div>

        {/* Match score */}
        {matchScore !== undefined && (
          <div className="absolute top-4 right-14 px-2.5 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-white/20 dark:border-white/10 rounded-full shadow-lg z-10 transition-transform duration-500 group-hover:-translate-x-1">
            {matchScore}% match
          </div>
        )}
      </div>

      <Link to={`/university/${id}`} className="block p-6 pt-5 relative z-20 bg-white dark:bg-gray-800 -mt-2 rounded-t-2xl transition-colors duration-300">
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
