import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' && process.env.DEPLOY_PLATFORM === 'github' 
    ? '/portfolio-website/' // Base path for GitHub Pages
    : '/', // Base path for other environments like Netlify
});
