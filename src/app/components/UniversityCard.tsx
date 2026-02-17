import { Heart, MapPin, Star, DollarSign, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  saved = false,
  onToggleSave,
}: UniversityCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleSave?.(id);
          }}
          className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
          />
        </button>
        <div className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full">
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