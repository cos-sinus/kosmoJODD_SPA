<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import { Viewer, Cartesian3, Color, EllipsoidTerrainProvider } from '/node_modules/cesium/Source/Cesium.js'
import * as satellite from 'satellite.js'
import { useSatelliteStore } from '../store/satellite_store';
import { mapState } from 'pinia';

export default {
    name: 'EarthViewer',
    data() {
      return {
        viewer: null,
      }
    },
    computed: {
      ...mapState(useSatelliteStore, {
        satellites : "satellites",
        selectedSatellite : "selected_satellite"
      })
    },
    mounted() {
      // Инициализация Cesium после монтирования DOM
      this.viewer = new Viewer('cesiumContainer', {
        terrainProvider: new EllipsoidTerrainProvider(),
        animation: false,
        timeline: false,
        shouldAnimate: true,
        infoBox: false,
        selectionIndicator: false,
        // imageryProvider: false,
        // baseLayerPicker: false,
      })
      this.$emit("init");
      console.log("Cesium загрузился");
    },
    beforeUnmount() {
      // Убираем viewer при удалении компонента
      if (this.viewer) {
        this.viewer.destroy()
      }
    },
    methods : {
      getTleLine1(fullTle) {
        const lines = fullTle.split('\n');
        return lines.length > 0 ? lines[0] : '';
      },
      getTleLine2(fullTle) {
        const lines = fullTle.split('\n');
        return lines.length > 1 ? lines[1] : '';
      },
      renderSatellite(sat, is_highlighted = false){
          if (!sat.full_TLE) {
            console.warn('Satellite missing full_TLE:', sat);
            return;
          }
          const tleLine1 = this.getTleLine1(sat.full_TLE);
          const tleLine2 = this.getTleLine2(sat.full_TLE);
          const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
          const positionAndVelocity = satellite.propagate(satrec, new Date());
          const positionEci = positionAndVelocity?.position || null;
          if (!positionEci) {
            console.warn('No position for satellite:', sat);
            return;
          }
          const gmst = satellite.gstime(new Date());
          const positionGd = satellite.eciToGeodetic(positionEci, gmst);
          const lon = satellite.degreesLong(positionGd.longitude);
          const lat = satellite.degreesLat(positionGd.latitude);
          const height = positionGd.height;
          const entity = this.viewer.entities.add({
            id: sat.id,
            position: Cartesian3.fromDegrees(lon, lat, height),
            point: { 
              pixelSize: (is_highlighted) ? 10 : 15, 
              color: (is_highlighted) ? Color.LIGHTBLUE : Color.LIME
            },
            label: { 
              text: sat.name || 'Satellite', 
              font: '14pt sans-serif',
              fillColor: (is_highlighted) ? Color.RED : Color.WHITE,
            }
          });
      },
      initSatellites() {
        this.viewer.entities.removeAll();
        if (!this.satellites.length) {
          console.warn('No satellites data available');
          return;
        }
        const seletedId = (this.selectedSatellite) ? this.selectedSatellite[0].id : 0
        this.satellites.forEach(sat => this.renderSatellite(sat, sat.id === seletedId));
      }
    },
    watch : {
      satellites(){
        this.initSatellites();
      },
      selectedSatellite(){
        this.initSatellites();
      }
    }
}
</script>
<style scoped>
#cesiumContainer{
  width: 100%;
  height: 80vh;
}
</style>