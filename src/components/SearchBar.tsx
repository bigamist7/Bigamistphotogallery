
import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  darkMode: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, darkMode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative max-w-md mx-auto mb-8"
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search by name or tags..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md ${
          darkMode 
            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:placeholder-gray-500' 
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:placeholder-gray-400'
        }`}
      />
    </motion.div>
  );
};

export default SearchBar;
