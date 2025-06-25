
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Heart, RotateCcw } from 'lucide-react';
import { useGalleryStore } from '../store/galleryStore';

interface FilterBarProps {
  onToggleFavorites: () => void;
  showFavorites: boolean;
  darkMode: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  onToggleFavorites, 
  showFavorites, 
  darkMode 
}) => {
  const { filters, setFilter, resetFilters } = useGalleryStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg mb-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-md`}
    >
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Filters:
          </span>
        </div>

        {/* Orientation Filter */}
        <div className="flex items-center gap-2">
          <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Orientation:
          </label>
          <select
            value={filters.orientation}
            onChange={(e) => setFilter('orientation', e.target.value)}
            className={`px-3 py-1 rounded-md text-sm border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="square">Square</option>
          </select>
        </div>

        {/* Color Filter */}
        <div className="flex items-center gap-2">
          <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Color:
          </label>
          <select
            value={filters.color}
            onChange={(e) => setFilter('color', e.target.value)}
            className={`px-3 py-1 rounded-md text-sm border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
          </select>
        </div>

        {/* Reset Filters */}
        <motion.button
          onClick={resetFilters}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition-colors ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </motion.button>

        {/* Favorites Toggle */}
        <motion.button
          onClick={onToggleFavorites}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            showFavorites
              ? 'bg-red-500 text-white'
              : darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
          {showFavorites ? 'Show All' : 'Favorites'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FilterBar;
