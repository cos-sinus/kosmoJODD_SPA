<template>
    abc
  <div id="cesiumContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script>
import { Viewer } from '/node_modules/cesium/Source/Cesium.js'
export default {
    name: 'EarthViewer',
    mounted() {
    // Инициализация Cesium после монтирования DOM
    this.viewer = new Viewer('cesiumContainer', {
      terrainProvider: undefined,
      animation: false,
      timeline: false,
      shouldAnimate: true,
    })
    console.log(this.viewer)
  },
  beforeUnmount() {
    // Убираем viewer при удалении компонента
    if (this.viewer) {
      this.viewer.destroy()
    }
  },
  data() {
    return {
      viewer: null,
    }
  },
}
</script>