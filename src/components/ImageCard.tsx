
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, Heart } from 'lucide-react';

interface ImageCardProps {
  image: {
    id: number;
    url: string;
    name: string;
    tags: string[];
  };
  onClick: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  darkMode: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ 
  image, 
  onClick, 
  onToggleFavorite, 
  isFavorite,
  darkMode 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <motion.div 
      className={`group relative rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${
        darkMode 
          ? 'bg-gray-800 shadow-gray-900/20 hover:shadow-gray-900/40' 
          : 'bg-white shadow-gray-200/50 hover:shadow-gray-300/60'
      }`}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-xl"></div>
        )}
        {hasError ? (
          <div className={`w-full h-48 flex items-center justify-center rounded-t-xl ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <span className="text-gray-400">Failed to load image</span>
          </div>
        ) : (
          <img
            src={image.url}
            alt={image.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full object-cover rounded-t-xl transition-all duration-300 group-hover:scale-105 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ height: 'auto', minHeight: '200px' }}
          />
        )}
        
        {/* Favorite button */}
        <motion.button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`}
          />
        </motion.button>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-t-xl"></div>
      </div>
      
      <div className="p-4">
        <h3 className={`font-semibold mb-2 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {image.name}
        </h3>
        <div className="flex items-center flex-wrap gap-1">
          <Tag className="h-4 w-4 text-gray-400 mr-1" />
          {image.tags.map((tag, index) => (
            <span
              key={index}
              className={`inline-block text-xs px-2 py-1 rounded-full mr-1 mb-1 transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-blue-700 hover:text-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-800'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ImageCard;
