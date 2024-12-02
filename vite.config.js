import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/PQChoiceAssistant',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    minify: 'esbuild', // default, fastest
    // or use 'terser' if you prefer
    // minify: 'terser',
  },
  server: {
    watch: {
        usePolling: true
    }
  },
})
