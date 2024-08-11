import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
    server: {
        port: 3000,
        open: true,
        proxy: {
        '/api': {
            target: process.env.VITE_API_URL || 'http://localhost:8080',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
        }
    }
})
