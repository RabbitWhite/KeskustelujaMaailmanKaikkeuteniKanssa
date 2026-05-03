import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/KeskustelujaMaailmanKaikkeuteniKanssa/',
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  test: {
  environment: 'jsdom',
  setupFiles: './src/setupTests.js',
  globals: true,
  server: {
    deps: {
      inline: [/@testing-library/],
    },
  },
},
})
