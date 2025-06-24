
import React, { useState } from 'react';
import { Tag } from 'lucide-react';

interface ImageCardProps {
  image: {
    id: number;
    url: string;
    name: string;
    tags: string[];
  };
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="aspect-w-16 aspect-h-12 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl"></div>
        )}
        {hasError ? (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-xl">
            <span className="text-gray-400">Failed to load image</span>
          </div>
        ) : (
          <img
            src={image.url}
            alt={image.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-48 object-cover rounded-t-xl transition-all duration-300 group-hover:scale-105 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-t-xl"></div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors duration-200">
          {image.name}
        </h3>
        <div className="flex items-center flex-wrap gap-1">
          <Tag className="h-4 w-4 text-gray-400 mr-1" />
          {image.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-1 mb-1 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
