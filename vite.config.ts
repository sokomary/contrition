import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
    server: {
      proxy: {
        '/api': {
          target: 'https://localhost:9443',
          changeOrigin: true,
          secure: false,
        }
      },
    },
    plugins: [
      vanillaExtractPlugin(),
      react({ include: '**/*.{jsx,tsx}' }),
      // mkcert(),
      VitePWA({
        registerType: 'prompt',
        manifest: {
          "short_name": "Contrition",
          "name": "Conscious nutrition",
          "icons": [
            {
              "src": "logo64.png",
              "sizes": "64x64 32x32 24x24 16x16",
              "type": "image/x-icon"
            },
            {
              "src": "logo192.png",
              "type": "image/png",
              "sizes": "192x192"
            },
            {
              "src": "logo512.png",
              "type": "image/png",
              "sizes": "512x512"
            }
          ],
          "start_url": ".",
          "display": "standalone",
          "theme_color": "#000000",
          "background_color": "#ffffff"
        },
      }),
    ],
    resolve: {
      alias: { src: path.resolve(__dirname, 'src') }
    },
    build: {
      outDir: './build',
    },
    publicDir: './public',
});