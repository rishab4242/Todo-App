import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy'; // ✅ plugin import

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects',  // ✅ source path
          dest: '.'                  // ✅ destination is root of build
        }
      ]
    })
  ],
  build: {
    outDir: 'build'
  }
});
