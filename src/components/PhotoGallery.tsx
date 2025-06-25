
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { images } from '../data/images';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';
import Header from './Header';
import FilterBar from './FilterBar';
import Lightbox from './Lightbox';
import { useGalleryStore } from '../store/galleryStore';

const PhotoGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [displayedImages, setDisplayedImages] = useState(images.slice(0, 12));
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  
  const { 
    filters, 
    darkMode, 
    toggleDarkMode,
    favorites,
    toggleFavorite,
    showFavorites,
    setShowFavorites
  } = useGalleryStore();

  // Filter images based on search term and filters
  const filteredImages = useMemo(() => {
    let result = showFavorites 
      ? images.filter(img => favorites.includes(img.id))
      : images;

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(image => 
        image.name.toLowerCase().includes(searchLower) ||
        image.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply filters
    if (filters.orientation !== 'all') {
      result = result.filter(image => {
        const aspectRatio = image.width / image.height;
        if (filters.orientation === 'landscape') return aspectRatio > 1.2;
        if (filters.orientation === 'portrait') return aspectRatio < 0.8;
        if (filters.orientation === 'square') return aspectRatio >= 0.8 && aspectRatio <= 1.2;
        return true;
      });
    }

    if (filters.color !== 'all') {
      result = result.filter(image => 
        image.color?.toLowerCase() === filters.color.toLowerCase()
      );
    }

    return result;
  }, [searchTerm, filters, favorites, showFavorites]);

  // Load more images for infinite scroll
  const loadMoreImages = useCallback(() => {
    if (displayedImages.length < filteredImages.length) {
      const nextImages = filteredImages.slice(0, displayedImages.length + 12);
      setDisplayedImages(nextImages);
      setHasMore(nextImages.length < filteredImages.length);
    } else {
      setHasMore(false);
    }
  }, [displayedImages.length, filteredImages]);

  // Trigger load more when in view
  useEffect(() => {
    if (inView && hasMore) {
      loadMoreImages();
    }
  }, [inView, hasMore, loadMoreImages]);

  // Reset displayed images when filters change
  useEffect(() => {
    setDisplayedImages(filteredImages.slice(0, 12));
    setHasMore(filteredImages.length > 12);
  }, [filteredImages]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Header onToggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">
            {showFavorites ? 'Your Favorites' : 'Explore Our Collection'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {showFavorites 
              ? 'View your favorite images from the collection'
              : 'Search through our curated collection of beautiful images by name or tags. Discover technology, nature, architecture, and wildlife photography.'
            }
          </p>
        </motion.div>

        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={handleSearchChange} 
          darkMode={darkMode}
        />

        <FilterBar 
          onToggleFavorites={() => setShowFavorites(!showFavorites)}
          showFavorites={showFavorites}
          darkMode={darkMode}
        />

        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Showing {displayedImages.length} of {filteredImages.length} images
            {searchTerm && (
              <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">
                for "{searchTerm}"
              </span>
            )}
          </p>
        </div>

        <ImageGrid 
          images={displayedImages} 
          onImageClick={handleImageClick}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
          darkMode={darkMode}
        />

        {hasMore && (
          <div ref={ref} className="flex justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        )}

        <AnimatePresence>
          {selectedImage && (
            <Lightbox 
              image={selectedImage} 
              onClose={closeLightbox}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(selectedImage.id)}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className={`border-t mt-16 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>© 2024 Photo Gallery. Built with React and Tailwind CSS by jcasanova.pt.</p>
            <p className="mt-2 text-sm">Images provided by Unsplash</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PhotoGallery;
