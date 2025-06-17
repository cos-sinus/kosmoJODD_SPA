// // vite.config.js
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path'
// import cesiumPlugin from './vite-plugin-cesium'
// import vuetify from 'vite-plugin-vuetify'

// export default defineConfig({
//   plugins: [
//     vue(), 
//     cesiumPlugin(),
//     vuetify({ autoImport: true })
//   ],
//   resolve: {
//     alias: {
//       cesium: path.resolve(__dirname, 'node_modules/cesium/Source'),
//     },
//   },
//   define: {
//     CESIUM_BASE_URL: JSON.stringify('/cesium'),
//   },
//   optimizeDeps: {
//     include: [
//       'mersenne-twister', 
//       'urijs', 
//       'grapheme-splitter',
//       'bitmap-sdf',
//       'lerc',
//       'nosleep.js'
//     ],  // форсируем пре-бандлинг
//   },
//   build: {
//     commonjsOptions: {
//       include: [/node_modules/],   // прогоняем через commonjs плагин все ноде_модули
//       transformMixedEsModules: true,
//     },
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           cesium: ['cesium']
//         }
//       }
//     }
//   }
// })
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import cesiumPlugin from './vite-plugin-cesium'
import vuetify from 'vite-plugin-vuetify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    cesiumPlugin(),
    vuetify({ autoImport: true })
  ],
  resolve: {
    alias: {
      cesium: path.resolve(__dirname, 'node_modules/cesium/Source/Cesium.js'),
      'cesium/Widgets': path.resolve(__dirname, 'node_modules/cesium/Source/Widgets'),
    }
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium')
  },
  optimizeDeps: {
    include: [
      'mersenne-twister', 
      'urijs', 
      'grapheme-splitter',
      'bitmap-sdf',
      'lerc',
      'nosleep.js'
    ]
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          cesium: ['cesium']
        }
      }
    }
  }
})

