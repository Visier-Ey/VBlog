import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host:'localhost',
    port: 80,
    open: true,
    cors: true,
  },
  alias: {
    '$': resolve(__dirname, 'src'),
  },
})

