
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Download, Share2 } from 'lucide-react';

interface LightboxProps {
  image: {
    id: number;
    url: string;
    name: string;
    tags: string[];
  };
  onClose: () => void;
  onToggleFavorite: (id: number) => void;
  isFavorite: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({ 
  image, 
  onClose, 
  onToggleFavorite, 
  isFavorite 
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${image.name}.jpg`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.name,
          text: `Check out this image: ${image.name}`,
          url: image.url,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(image.url);
      // You could add a toast notification here
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative max-w-4xl max-h-[90vh] w-full"
      >
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <motion.button
            onClick={() => onToggleFavorite(image.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>
          
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <Download className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Image */}
        <img
          src={image.url}
          alt={image.name}
          className="w-full h-full object-contain rounded-lg"
        />

        {/* Image Info */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white">
          <h3 className="text-xl font-bold mb-2">{image.name}</h3>
          <div className="flex flex-wrap gap-2">
            {image.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/20 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;
