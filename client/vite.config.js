// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // 👈 ये बहुत जरूरी है अगर आपने custom base path यूज़ किया हो तो '/' ही रखें
  build: {
    rollupOptions: {
      input: '/index.html',
    },
  },
})
