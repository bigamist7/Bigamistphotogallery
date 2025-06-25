
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Filters {
  orientation: 'all' | 'landscape' | 'portrait' | 'square';
  color: 'all' | 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  type: 'all' | 'photo' | 'illustration' | 'vector';
}

interface GalleryState {
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Favorites
  favorites: number[];
  toggleFavorite: (id: number) => void;
  
  // Filters
  filters: Filters;
  setFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
  
  // UI State
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
  
  // Language
  language: 'en' | 'es' | 'fr' | 'de';
  setLanguage: (lang: 'en' | 'es' | 'fr' | 'de') => void;
}

export const useGalleryStore = create<GalleryState>()(
  persist(
    (set, get) => ({
      // Theme
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      // Favorites
      favorites: [],
      toggleFavorite: (id: number) => set((state) => ({
        favorites: state.favorites.includes(id)
          ? state.favorites.filter(fav => fav !== id)
          : [...state.favorites, id]
      })),
      
      // Filters
      filters: {
        orientation: 'all',
        color: 'all',
        type: 'all'
      },
      setFilter: (key, value) => set((state) => ({
        filters: { ...state.filters, [key]: value }
      })),
      resetFilters: () => set({
        filters: {
          orientation: 'all',
          color: 'all',
          type: 'all'
        }
      }),
      
      // UI State
      showFavorites: false,
      setShowFavorites: (show) => set({ showFavorites: show }),
      
      // Language
      language: 'en',
      setLanguage: (lang) => set({ language: lang })
    }),
    {
      name: 'gallery-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        favorites: state.favorites,
        language: state.language
      })
    }
  )
);
