import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Active Tailwind CSS dans le projet
  ],
  server: {
    // Proxy : redirige les appels /api vers le backend Go sur le port 8080
    // Ainsi le frontend peut appeler /api/projects sans spécifier localhost:8080
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
