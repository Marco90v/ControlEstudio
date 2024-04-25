import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port : 5173,
    // proxy: {
    //     '^/api/v1/*': {
    //         target: 'http://localhost:3030',
    //         changeOrigin: true
    //     },
    //     '^/api/v2/*': {
    //       target: 'http://localhost:3030',
    //       changeOrigin: true
    //   }
    // }
  },
  define:{
    "globalThis.__DEV__": JSON.stringify(false),
  }
})