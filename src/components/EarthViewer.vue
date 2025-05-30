<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import { Viewer, Cartesian3, Color } from '/node_modules/cesium/Source/Cesium.js'
import * as satellite from 'satellite.js'

export default {
    name: 'EarthViewer',
    mounted() {
    // Инициализация Cesium после монтирования DOM
    this.viewer = new Viewer('cesiumContainer', {
      terrainProvider: undefined,
      animation: false,
      timeline: false,
      shouldAnimate: true,
      infoBox: false,
      selectionIndicator: false
    })
    this.initSatellite()

  },
  beforeUnmount() {
    // Убираем viewer при удалении компонента
    if (this.viewer) {
      this.viewer.destroy()
    }
  },

  methods : {

    initSatellite(){
      
      const tleLine1 = '1 25544U 98067A   20029.54791435  .00000744  00000-0  21620-4 0  9993'
      const tleLine2 = '2 25544  51.6442 331.7543 0007415  24.2836  99.2725 15.49180509210616'

      const satrec = satellite.twoline2satrec(tleLine1, tleLine2)
      const positionAndVelocity = satellite.propagate(satrec, new Date())

      const positionEci = positionAndVelocity.position
      const gmst = satellite.gstime(new Date())
      const positionGd = satellite.eciToGeodetic(positionEci, gmst)

      console.log('Lat:', satellite.degreesLat(positionGd.latitude))
      console.log('Lon:', satellite.degreesLong(positionGd.longitude))

      const lon = satellite.degreesLat(positionGd.latitude);
      const lat = satellite.degreesLong(positionGd.longitude);
      const height = positionGd.height;

      const entity = this.viewer.entities.add({
        position: Cartesian3.fromDegrees(lon, lat, height),
        point: { pixelSize: 10, color: Color.YELLOW },
        label: { text: 'ISS', font: '14pt sans-serif' }
      })
      this.viewer.trackedEntity = entity

    }
  },
  data() {
    return {
      viewer: null,
    }
  },
}
</script>