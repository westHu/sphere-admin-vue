import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址 WW
            target: 'http://localhost:8088/sphere/admin',
            ws: true,
          },
        },
      },
    },
  };
});
