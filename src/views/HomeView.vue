<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <EarthViewer />
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <SatellitesTable />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SatellitesTable from '../components/SatellitesTable.vue';
import EarthViewer from '../components/EarthViewer.vue';
export default{
  components : {
    EarthViewer,
    SatellitesTable
  }
}
</script>