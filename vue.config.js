const { defineConfig } = require('@vue/cli-service')
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const cesiumBuild = 'node_modules/cesium/Build/Cesium';



// module.exports = defineConfig({
//   transpileDependencies: true,

//   pluginOptions: {
//     vuetify: {
// 			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
// 		}
//   },

//   configureWebpack : {
//     plugins : [
//       new CopyPlugin({
//         patterns: [
//           { from: path.join(cesiumBuild, 'Workers'), to: 'Cesium/Workers'},
//           { from: path.join(cesiumBuild, 'Assets'), to: 'Cesium/Assets'},
//           { from: path.join(cesiumBuild, 'Widgets'), to: 'Cesium/Widgets'},
//           { from: path.join(cesiumBuild, 'ThirdParty'), to: 'Cesium/Third'}
//         ]
//       })
//     ],
//     resolve: {
//       alias: {
//         cesium: path.resolve(__dirname, cesiumBuild)
//       },
//       fallback: {
//         zlib: false,
//         http: false,
//         https: false,
//         url: false,
//         fs: false,
//         path: false
//       }
//     },
//     module : {
//       unknownContextCritical: false
//     }
//   },
//   publicPath: './',
//   chainWebpack: config => {
//     // Отключаем babel-loader для Cesium
//     config.module
//       .rule('js')
//       .exclude.add(path.resolve(__dirname, cesiumBuild))
//   }  
// })


module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
})