
import React from 'react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import ImageCard from './ImageCard';

interface Image {
  id: number;
  url: string;
  name: string;
  tags: string[];
  width?: number;
  height?: number;
  color?: string;
}

interface ImageGridProps {
  images: Image[];
  onImageClick: (image: Image) => void;
  onToggleFavorite: (id: number) => void;
  favorites: number[];
  darkMode: boolean;
}

const ImageGrid: React.FC<ImageGridProps> = ({ 
  images, 
  onImageClick, 
  onToggleFavorite, 
  favorites,
  darkMode 
}) => {
  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  if (images.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className={`text-xl font-medium mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          No images found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search terms or filters
        </p>
      </motion.div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex w-auto -ml-4"
      columnClassName="pl-4 bg-clip-padding"
    >
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
          className="mb-4"
        >
          <ImageCard 
            image={image} 
            onClick={() => onImageClick(image)}
            onToggleFavorite={() => onToggleFavorite(image.id)}
            isFavorite={favorites.includes(image.id)}
            darkMode={darkMode}
          />
        </motion.div>
      ))}
    </Masonry>
  );
};

export default ImageGrid;
