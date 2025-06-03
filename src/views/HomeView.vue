<template>
  <v-container>
    <v-row v-show="isLoaded">
      <v-col cols="6">
        <v-card>
          <EarthViewer @init="isLoaded = true" />
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <SatellitesTable />
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
  }
}
</script>