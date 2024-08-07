import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target:'https://task-3-event-management-utor.vercel.app',
      }
    }
  },
  plugins: [react()],
})
