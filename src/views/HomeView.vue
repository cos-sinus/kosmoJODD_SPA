<template>
  <v-container>
    <v-progress-circular
      v-show="!isSatellitesLoaded || !isCesiumLoaded"
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
    <v-row v-show="isSatellitesLoaded && satellites.length > 0">
      <v-col cols="6">
        <v-card>
          <EarthViewer @init="isCesiumLoaded = true" />
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <SatellitesTable :satellites="satellites"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useSatelliteStore } from '../store/satellite_store';
import { mapActions, mapState } from 'pinia';
import SatellitesTable from '../components/SatellitesTable.vue';
import EarthViewer from '../components/EarthViewer.vue';
export default{
  data(){
    return {
      isSatellitesLoaded : false,
      isCesiumLoaded : false
    }
  },
  components : {
    EarthViewer,
    SatellitesTable
  },
  computed: {
    ...mapState(useSatelliteStore, {
      satellites : "satellites"
    })
  },
  methods : {
    ...mapActions(useSatelliteStore, {
        getAllSatellites : 'getAllSatellites',
    }),
    init(){
      console.log("init");
      this.isSatellitesLoaded = true;
    }
  },
  async created(){
    await this.getAllSatellites();
    this.init();
  }
}
</script>