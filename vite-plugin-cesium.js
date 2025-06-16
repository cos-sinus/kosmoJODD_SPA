// vite-plugin-cesium.js
import fse from 'fs-extra'
import path from 'path'

export default function cesiumCopyPlugin() {
  return {
    name: 'copy-cesium-assets',
    closeBundle() {
      const cesiumBuildPath = path.resolve('node_modules/cesium/Build/Cesium')
      const publicCesiumPath = path.resolve('public/cesium')

      const foldersToCopy = ['Assets', 'Widgets', 'ThirdParty', 'Workers']

      for (const folder of foldersToCopy) {
        const from = path.join(cesiumBuildPath, folder)
        const to = path.join(publicCesiumPath, folder)
        fse.copySync(from, to)
      }

      console.log('✅ Cesium assets copied to public/cesium')
    }
  }
}
