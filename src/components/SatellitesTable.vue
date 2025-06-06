<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="satellites"
      item-value="name"
      select-strategy="single"
      show-select
      return-object
      v-model="selectedSatellite"
    >
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useSatelliteStore } from '../store/satellite_store';

export default {
    data (){
        return {
          selectedSatellite: null,
          headers : [
            {
                title: 'Спутник',
                align: 'start',
                key: 'name',
            },
            { title: 'Norad ID', align: 'end', key: 'cutalog_num' },
            { title: 'Год запуска', align: 'end', key: 'international_des_year' },
          ],
        }
    },
    props: {
      satellites: Array
    },
    methods : {
      ...mapActions(useSatelliteStore, {
        setSelectedSatellite: "setSelectedSatellite"
      })
    },
    watch : {
      selectedSatellite(newValue) {
        this.setSelectedSatellite(newValue);
      }
    }
}
</script>
