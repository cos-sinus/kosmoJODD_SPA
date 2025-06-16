import { copyFileSync, mkdirSync } from 'fs'
import path from 'path'

export default function cesiumCopyPlugin() {
  return {
    name: 'copy-cesium-assets',
    closeBundle() {
      const cesiumBuildPath = 'node_modules/cesium/Build/Cesium'
      const publicCesiumPath = 'public/cesium'
      mkdirSync(publicCesiumPath, { recursive: true })
      copyFileSync(`${cesiumBuildPath}/Assets`, `${publicCesiumPath}/Assets`)
      copyFileSync(`${cesiumBuildPath}/Widgets`, `${publicCesiumPath}/Widgets`)
      copyFileSync(`${cesiumBuildPath}/ThirdParty`, `${publicCesiumPath}/ThirdParty`)
    }
  }
}