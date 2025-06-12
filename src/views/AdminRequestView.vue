<template>
  <v-data-table
    v-if="requests && requests?.length > 0"
    v-model="selected"
    :items="requests"
    item-value="id"
    show-select
  ></v-data-table>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useRequestStore } from '../store/request_store';

export default {
  data(){
    return {
      selected: null
    }
  },
  computed: {
    ...mapState(useRequestStore, {
      requests : 'unchecked'
    })
  },
  methods : {
    ...mapActions(useRequestStore, {
      getUncheckedRequests : 'getUncheckedRequests'
    })
  },
  async mounted(){
    await this.getUncheckedRequests();
  }
}
</script>