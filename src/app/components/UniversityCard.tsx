import { Heart, MapPin, Star, DollarSign, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
  onToggleSave?: (id: string) => void;
}

export function UniversityCard({
  id,
  name,
  location,
  country,
  ranking,
  rating,
  tuitionFee,
  deadline,
  image,
  logo_url,
  saved = false,
  onToggleSave,
}: UniversityCardProps) {
  const [imgError, setImgError] = useState(false);
  
  const getPlaceholderImage = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=4F46E5&color=fff&bold=true`;
  };

  const displayImage = logo_url || image || getPlaceholderImage();

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
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleSave?.(id);
          }}
          className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md transition-all duration-300 hover:scale-110 active:scale-95 btn-ripple"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              saved 
                ? 'fill-red-500 text-red-500 animate-heart-beat' 
                : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
            }`}
          />
        </button>
        <div className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full shadow-lg animate-scale-in">
          #{ranking}
        </div>
      </div>

      <Link to={`/university/${id}`} className="block p-5">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">{name}</h3>

        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <MapPin className="w-4 h-4" />
          <span>
            {location}, {country}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-900 dark:text-white">{rating}</span>
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
    </div>
  );
}