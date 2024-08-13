import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:5188,
    proxy:{
      '/api':{
        target:'http://116.202.210.102:9093',
      }
    }
  },
  plugins: [react()],
})
