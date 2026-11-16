import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5175,
    allowedHosts: ['.loca.lt', '.trycloudflare.com', '.lhr.life'],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4175,
    allowedHosts: ['.loca.lt', '.trycloudflare.com', '.lhr.life']
  }
})
