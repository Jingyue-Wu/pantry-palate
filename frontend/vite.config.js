import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    registerType: 'prompt',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    manifest: {
      name: 'PantryPalette',
      short_name: 'PantryPalette',
      description: 'test',
      permissions: ['camera'],
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'apple touch icon',
        },
        {
          src: '/maskable_icon.png',
          sizes: '225x225',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
      theme_color: '#121212',
      background_color: '#121212',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      orientation: 'portrait',
    },
  }),],
});
