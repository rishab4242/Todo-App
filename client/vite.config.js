import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ✅ Already correct
  },
  server: {
    port: 5000,
  },
  // ✅ For deployment routing support
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
});
