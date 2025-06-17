// import { copyFileSync, mkdirSync } from 'fs'
// import path from 'path'

// export default function cesiumCopyPlugin() {
//   return {
//     name: 'copy-cesium-assets',
//     closeBundle() {
//       const cesiumBuildPath = 'node_modules/cesium/Build/Cesium'
//       const publicCesiumPath = 'public/cesium'
//       mkdirSync(publicCesiumPath, { recursive: true })
//       copyFileSync(`${cesiumBuildPath}/Assets`, `${publicCesiumPath}/Assets`)
//       copyFileSync(`${cesiumBuildPath}/Widgets`, `${publicCesiumPath}/Widgets`)
//       copyFileSync(`${cesiumBuildPath}/ThirdParty`, `${publicCesiumPath}/ThirdParty`)
//     }
//   }
// }

// import { cpSync, mkdirSync, existsSync } from 'fs'
// import path from 'path'

// export default function cesiumCopyPlugin() {
//   return {
//     name: 'copy-cesium-assets',
//     closeBundle() {
//       const cesiumBuildPath = 'node_modules/cesium/Build/Cesium'
//       const publicCesiumPath = 'public/cesium'

//       mkdirSync(publicCesiumPath, { recursive: true })

//       const foldersToCopy = ['Assets', 'Widgets', 'ThirdParty']

//       for (const folder of foldersToCopy) {
//         const source = path.join(cesiumBuildPath, folder)
//         const destination = path.join(publicCesiumPath, folder)

//         if (existsSync(source)) {
//           cpSync(source, destination, { recursive: true })
//         } else {
//           console.warn(`[vite-plugin-cesium] Warning: ${source} does not exist`)
//         }
//       }
//     }
//   }
// }


// import copy from 'rollup-plugin-copy'

// export default function cesiumPlugin() {
//   return {
//     name: 'cesium-plugin',
//     apply: 'build',
//     enforce: 'post',
//     buildEnd() {
//       copy({
//         targets: [
//           { src: 'node_modules/cesium/Build/Cesium/Assets', dest: 'public/cesium' },
//           { src: 'node_modules/cesium/Build/Cesium/Widgets', dest: 'public/cesium' },
//           { src: 'node_modules/cesium/Build/Cesium/Workers', dest: 'public/cesium' }
//         ],
//         hook: 'writeBundle'
//       }).generateBundle?.()
//     }
//   }
// }

// vite-plugin-cesium.js
// import { cpSync, mkdirSync, existsSync } from 'fs'
// import path from 'path'

// export default function cesiumCopyPlugin() {
//   return {
//     name: 'copy-cesium-assets',
//     enforce: 'post',
//     apply: 'build',
//     closeBundle() {
//       const cesiumBuildPath = path.join('node_modules', 'cesium', 'Build', 'Cesium')
//       const publicCesiumPath = path.join('public', 'cesium')

//       if (!existsSync(publicCesiumPath)) {
//         mkdirSync(publicCesiumPath, { recursive: true })
//       }

//       const foldersToCopy = ['Assets', 'Widgets', 'ThirdParty', 'Workers']

//       for (const folder of foldersToCopy) {
//         const source = path.join(cesiumBuildPath, folder)
//         const destination = path.join(publicCesiumPath, folder)

//         if (existsSync(source)) {
//           cpSync(source, destination, { recursive: true })
//           console.log(`Copied ${folder} to ${destination}`)
//         } else {
//           console.warn(`[vite-plugin-cesium] Warning: ${source} does not exist`)
//         }
//       }
//     }
//   }
// }

// vite-plugin-cesium.js
import { cpSync, mkdirSync, existsSync } from 'fs'
import path from 'path'

export default function cesiumCopyPlugin() {
  return {
    name: 'copy-cesium-assets',
    enforce: 'post', // ⚠️ Важно: выполняется ПОСЛЕ основной сборки
    apply: 'build',  // ⚠️ Только в production-сборке
    closeBundle() {
      const cesiumBuildPath = path.join('node_modules', 'cesium', 'Build', 'Cesium')
      const publicCesiumPath = path.join('public', 'cesium')

      if (!existsSync(publicCesiumPath)) {
        mkdirSync(publicCesiumPath, { recursive: true })
      }

      const foldersToCopy = ['Assets', 'Widgets', 'ThirdParty', 'Workers']

      for (const folder of foldersToCopy) {
        const source = path.join(cesiumBuildPath, folder)
        const destination = path.join(publicCesiumPath, folder)

        if (existsSync(source)) {
          cpSync(source, destination, { recursive: true })
          console.log(`✅ Copied ${folder} to ${destination}`)
        } else {
          console.warn(`⚠️ [vite-plugin-cesium] ${source} does not exist!`)
        }
      }
    }
  }
}