<template>
  <h3 v-if="isLoading">Идет загрузка...</h3>
  <div id="cesiumContainer"></div>
</template>

<script>
import { Viewer, Cartesian3, Color, EllipsoidTerrainProvider } from '/node_modules/cesium/Source/Cesium.js'
import * as satellite from 'satellite.js'
import { useSatelliteStore } from '../store/satellite_store';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'EarthViewer',
    data() {
      return {
        viewer: null,
        isLoading: false
      }
    },
    computed: {
      ...mapState(useSatelliteStore, {
        satellites : "satellites",
        selectedSatellite : "selected_satellite",
        nearSatellites : "near_satellites"
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
      ...mapActions(useSatelliteStore, {
        get_near_satellites : "getNearSatellites"
      }),
      getTleLine1(fullTle) {
        const lines = fullTle.split('\n');
        return lines.length > 0 ? lines[0] : '';
      },
      getTleLine2(fullTle) {
        const lines = fullTle.split('\n');
        return lines.length > 1 ? lines[1] : '';
      },
      renderSatellite(sat, satellite_type = "default"){
          if (!sat.full_TLE) {
            console.warn('Satellite missing full_TLE:', sat);
            return;
          }
          let color, fillColor, fontSize;
          switch(satellite_type){
            case "highlighted":
              color = Color.LIGHTBLUE;
              fillColor = Color.RED;
              fontSize = 15;
              break;
            case "near":
              color = Color.ORANGE;
              fillColor = Color.ORANGERED;
              fontSize = 15;
              break;
            default:
              color = Color.LIME;
              fillColor = Color.WHITE;
              fontSize = 10;
              break;
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
          this.viewer.entities.add({
            id: sat.id,
            position: Cartesian3.fromDegrees(lon, lat, height),
            point: { 
              pixelSize: fontSize, 
              color: color
            },
            label: { 
              text: sat.name || 'Satellite', 
              font: '14pt sans-serif',
              fillColor: fillColor,
            }
          });
      },
      initSatellites() {
        this.viewer.entities.removeAll();
        if (!this.satellites.length) {
          console.warn('No satellites data available');
          return;
        }
        const selectedId = (this.selectedSatellite) ? this.selectedSatellite[0].id : 0
        this.satellites.forEach(sat => {
          let satType;
          if(sat.id === selectedId){
            satType = "highlighted";
          }
          else if(this.nearSatellites.find(s => s.id === sat.id) != undefined){
            satType = "near";
          }
          else{
            satType = "default";
          }
          this.renderSatellite(sat, satType)
        });
      }
    },
    watch : {
      satellites(){
        this.initSatellites();
      },
      async selectedSatellite(){
        this.isLoading = true;
        await this.get_near_satellites(this.selectedSatellite[0].id);
        console.log("near", this.nearSatellites);
        this.initSatellites();
        this.isLoading = false;
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