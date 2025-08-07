import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    // proxy:{
    //   '/api': {
    //     target: 'http://localhost:6000',
    //     changeOrigin:true,
    //     secure:false
    //   }
    // },
    // host:"192.168.55.100"
  },
});
