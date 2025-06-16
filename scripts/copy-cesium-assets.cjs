// scripts/copy-cesium-assets.cjs
const path = require('path')
const fse = require('fs-extra')

const cesiumPath = path.resolve(__dirname, '../node_modules/cesium/Build/Cesium')
const outputPath = path.resolve(__dirname, '../public/cesium')

fse.ensureDirSync(outputPath)
fse.copySync(cesiumPath, outputPath)

console.log('✅ Cesium assets copied to public/cesium')
