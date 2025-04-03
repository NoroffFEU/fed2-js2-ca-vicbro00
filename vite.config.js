import { defineConfig } from 'vite';

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
});
