import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import {serverConfig} from './custom.config.js'
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    tailwindcss()
  ],
  server: serverConfig,
  alias: {
    '@': resolve(__dirname, 'src'),
  },
})

