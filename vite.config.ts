import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import visualizer from 'rollup-plugin-visualizer'

import path from 'path'

const projectRootDir = path.resolve(__dirname)

export const PROXY_API_URL = 'https://localhost:5516'
export const PROXY_TXMAP_URL = 'https://apis.map.qq.com'
export const PROXY_QINIU_API_URL = 'https://localhost:5516'

export const isProduction = process.env.NODE_ENV === 'production'

const proxy = {
  '/api/Qiniu': {
    target: PROXY_QINIU_API_URL,
    secure: false,
    rewrite: (path) => path.replace(/^\/api\/Qiniu/, '')
  },
  '/map': {
    target: PROXY_TXMAP_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/map/, ''),

  },
  // '^/api/.*': {
  //   target: PROXY_API_URL,
  //   changeOrigin: true,
  //   rewrite: (path) => path.replace(/^\/api/, '')
  // }
}


// 编译插件
const buildPlugins = isProduction 
  ? []
  : [
    visualizer({
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    })
  ]

// https://vitejs.dev/config/
export default defineConfig({
  mode: isProduction ? 'production': 'development',
  build: {
    cssCodeSplit: true,
    brotliSize: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          clipboard: ['clipboard'],   
          normalizeCss: ['normalize.css'],   
          screenfull: ['screenfull']
        }
      },
      plugins: buildPlugins
    }
  },
  server: {
    host: '0.0.0.0',
    // port: 3000,
    proxy: proxy,
    cors: true,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(projectRootDir, 'src')
      }
    ]
  },
  plugins: [
    vue(), 
    vueJsx()
  ]
})
