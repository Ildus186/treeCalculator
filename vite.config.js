import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa' 

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate', 
      includeAssets: ['logo.png', 'apple-icon-180.png'],
      manifest: {
        name: 'Калькулятор дерева',
        short_name: 'CalcWood',
        description: 'Калькулятор для расчёта объёма и стоимости дерева',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable' 
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 
              }
            }
          }
        ]
      }
    })
  ]
})