import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import { serverConfig } from './custom.config.js'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  tailwindcss(),
  // compression({
  //   algorithm: 'gzip',      // 使用 gzip
  //   ext: '.gz',             // 输出 .gz 文件
  //   threshold: 10240,       // >10kb 才压缩
  //   deleteOriginFile: false // 保留源文件
  // }),
  ],
  server: serverConfig,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})

