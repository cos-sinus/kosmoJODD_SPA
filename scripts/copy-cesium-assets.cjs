// // scripts/copy-cesium-assets.cjs
// const path = require('path')
// const fse = require('fs-extra')

// const cesiumPath = path.resolve(__dirname, '../node_modules/cesium/Build/Cesium')
// const outputPath = path.resolve(__dirname, '../public/cesium')

// fse.ensureDirSync(outputPath)
// fse.copySync(cesiumPath, outputPath)

// console.log('✅ Cesium assets copied to public/cesium')


// scripts/copy-cesium-assets.cjs
const path = require('path')
const fse = require('fs-extra')

const cesiumPath = path.resolve(__dirname, '../node_modules/cesium/Build/Cesium')
const outputPath = path.resolve(__dirname, '../public/cesium')

// Убедись, что папка существует
fse.ensureDirSync(outputPath)

// Копируем только нужные директории (а не всю папку Cesium целиком)
const subdirsToCopy = ['Assets', 'Widgets', 'ThirdParty', 'Workers']

for (const dir of subdirsToCopy) {
  const src = path.join(cesiumPath, dir)
  const dest = path.join(outputPath, dir)
  fse.copySync(src, dest)
  console.log(`✅ Copied ${dir}`)
}

console.log('✅ Cesium assets copied to public/cesium')
