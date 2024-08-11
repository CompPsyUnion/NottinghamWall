import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  // resolve: {
  //   alias: {
  //     '@': 'src',
  //   }
  // }
    // server: {
    //     proxy: {
    //     '/api': {
    //         target: 'http://localhost:3000',
    //         changeOrigin: true,
    //         rewrite: (path) => path.replace(/^\/api/, '')
    //     }
    //     }
    // }
})
