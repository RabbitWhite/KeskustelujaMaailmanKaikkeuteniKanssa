import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/KeskustelujaMaailmanKaikkeuteniKanssa/',
  resolve: {
  extensions: ['.js', '.jsx'],
},
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
  environmentOptions: {
    jsdom: {},
  },
  pool: 'forks',
  poolOptions: {
    forks: {
      execArgv: [],
    },
  },
},
})
