
import React, { useState, useMemo } from 'react';
import { images } from '../data/images';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';
import Header from './Header';

const PhotoGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter images based on search term
  const filteredImages = useMemo(() => {
    if (!searchTerm.trim()) {
      return images;
    }

    const searchLower = searchTerm.toLowerCase();
    return images.filter(image => 
      image.name.toLowerCase().includes(searchLower) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }, [searchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Our Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through our curated collection of beautiful images by name or tags. 
            Discover technology, nature, architecture, and wildlife photography.
          </p>
        </div>

        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={handleSearchChange} 
        />

        <div className="mb-4">
          <p className="text-sm text-gray-500 text-center">
            Showing {filteredImages.length} of {images.length} images
            {searchTerm && (
              <span className="ml-2 text-blue-600 font-medium">
                for "{searchTerm}"
              </span>
            )}
          </p>
        </div>

        <ImageGrid images={filteredImages} />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>© 2024 Photo Gallery. Built with React and Tailwind CSS.</p>
            <p className="mt-2 text-sm">Images provided by Unsplash</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PhotoGallery;
