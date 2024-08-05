import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    define: {
      'process.env.NODE_ENV': JSON.stringify('production')
    },
    base: mode === 'production' ? './' : '/', // 类似于 Vue CLI 的 publicPath
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      port: 8888,
      open: true,
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL || 'http://localhost:8080', // 使用环境变量配置 API 地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      minify: mode === 'production' ? 'esbuild' : false,
      assetsDir: 'assets'
    },
  };
});
