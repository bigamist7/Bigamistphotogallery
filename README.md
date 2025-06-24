
# Photo Gallery with Search

A modern, responsive photo gallery application built with React and Tailwind CSS. Features real-time search functionality to filter images by name or tags.

## Features

- 📸 **Responsive Grid Layout**: Beautiful masonry-style grid that adapts to all screen sizes
- 🔍 **Real-time Search**: Filter images instantly by name or tags as you type
- ✨ **Smooth Animations**: Elegant hover effects and loading animations
- 🎨 **Modern UI**: Clean, minimalist design with Tailwind CSS
- 📱 **Mobile Friendly**: Optimized for desktop, tablet, and mobile devices
- 🚀 **Performance Optimized**: Efficient rendering and image loading
- 🔧 **Future Ready**: Architecture prepared for backend integration

## Technology Stack

- **React 18** with functional components and hooks
- **Tailwind CSS** for styling and responsive design
- **Lucide React** for beautiful icons
- **TypeScript** for type safety
- **Vite** for fast development and building

## Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd photo-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Linux Server Deployment

### Option 1: Using Nginx (Recommended)

1. **Install Nginx on Ubuntu/Debian**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Build the application**
   ```bash
   npm run build
   ```

3. **Copy files to web directory**
   ```bash
   sudo cp -r dist/* /var/www/html/
   ```

4. **Configure Nginx** (create `/etc/nginx/sites-available/photo-gallery`)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Enable gzip compression
       gzip on;
       gzip_types text/css application/javascript application/json image/svg+xml;
       gzip_comp_level 9;

       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

5. **Enable the site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/photo-gallery /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Option 2: Using PM2 with serve

1. **Install PM2 and serve globally**
   ```bash
   sudo npm install -g pm2 serve
   ```

2. **Build the application**
   ```bash
   npm run build
   ```

3. **Start the application with PM2**
   ```bash
   pm2 serve dist 3000 --name "photo-gallery"
   pm2 startup
   pm2 save
   ```

### Option 3: Using Apache

1. **Install Apache**
   ```bash
   sudo apt update
   sudo apt install apache2
   ```

2. **Build and copy files**
   ```bash
   npm run build
   sudo cp -r dist/* /var/www/html/
   ```

3. **Enable mod_rewrite for SPA routing**
   ```bash
   sudo a2enmod rewrite
   ```

4. **Create .htaccess file** in `/var/www/html/`
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

5. **Restart Apache**
   ```bash
   sudo systemctl restart apache2
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── PhotoGallery.tsx # Main gallery container
│   ├── SearchBar.tsx    # Search input component
│   ├── ImageGrid.tsx    # Grid layout component
│   ├── ImageCard.tsx    # Individual image card
│   └── Header.tsx       # App header
├── data/               # Data files
│   └── images.js       # Image data with metadata
├── pages/              # Page components
│   └── Index.tsx       # Main page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── index.css          # Global styles and Tailwind
```

## Data Structure

Images are stored in `src/data/images.js` with the following structure:

```javascript
{
  id: number,
  url: string,
  name: string,
  tags: string[]
}
```

To add new images, simply add objects to the `images` array following this structure.

## Future Enhancements

The application is structured to easily support:

- **Backend Integration**: Replace local data with API calls
- **Image Upload**: Add functionality to upload new images
- **User Authentication**: Add user accounts and personal galleries
- **Advanced Filtering**: Add category filters, date ranges, etc.
- **Image Optimization**: Add lazy loading and image optimization
- **Social Features**: Add likes, comments, and sharing

## Performance Considerations

- Images are loaded on-demand with proper error handling
- Search filtering uses React's `useMemo` for optimization
- Responsive images with proper sizing
- Minimal JavaScript bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue on GitHub or contact the development team.
