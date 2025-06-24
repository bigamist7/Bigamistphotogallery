
import React from 'react';
import ImageCard from './ImageCard';

interface Image {
  id: number;
  url: string;
  name: string;
  tags: string[];
}

interface ImageGridProps {
  images: Image[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No images found</h3>
        <p className="text-gray-500">Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        >
          <ImageCard image={image} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
