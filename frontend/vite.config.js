import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://problem-notes-1.onrender.com',
        changeOrigin: true,
      }
    }
  },
  plugins: [react()],
})
