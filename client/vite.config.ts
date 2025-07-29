import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy:{
      '/api': {
        target: 'http://localhost:6000', 
        changeOrigin:true, 
        secure:false
      }
    },

    host:"192.168.55.100"
  }
  
})
