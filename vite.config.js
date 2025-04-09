import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/',

  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://v2.api.noroff.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },

  resolve: {
    alias: {
      path: 'rollup-plugin-node-polyfills/polyfills/path',
      fs: 'rollup-plugin-node-polyfills/polyfills/empty',
      url: 'rollup-plugin-node-polyfills/polyfills/url',
      'source-map-js': 'rollup-plugin-node-polyfills/polyfills/empty',
    },
  },
});
