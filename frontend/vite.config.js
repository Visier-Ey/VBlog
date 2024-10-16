import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import {serverConfig} from './custom.config.js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: serverConfig,
  alias: {
    '$': resolve(__dirname, 'src'),
  },
})

