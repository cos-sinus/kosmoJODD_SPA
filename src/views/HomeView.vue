<template>
  <v-container>
    <v-row v-show="isLoaded && satellites.length > 0">
      <v-col cols="6">
        <v-card>
          <EarthViewer @init="isLoaded = true" />
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <SatellitesTable :satellites="satellites"/>
        </v-card>
      </v-col>
    </v-row>
    <v-progress-circular
      v-if="!isLoaded"
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
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
      isLoaded : false
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
    })
  },
  async mounted(){
    await this.getAllSatellites();
  }
}
</script>