<template>
  <v-data-table
    v-if="requests && requests?.length > 0"
    :headers="headers"
    :items="processedRequests"
    item-value="id"
  >
  <template #item.actions="{ item }">
      <v-btn 
        color="green" 
        icon="mdi-check-circle-outline" 
        size="small" 
        @click="approveDialog = true"
        @mouseover="selected = item"
      ></v-btn>
      <v-btn 
        color="red" 
        icon="mdi-close-circle-outline" 
        size="small"
        @click="rejectDialog = true"
        @mouseover="selected = item"
      ></v-btn>
    </template>
  </v-data-table>

  <ApproveRequestDialog 
    v-model:visible="approveDialog"
    :request="selected"
    @confirm="approve" /> 

    <RejectRequestDialog
    v-model:visible="rejectDialog"
    :request="selected"
    @confirm="reject"
  /> 
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useRequestStore } from '../store/request_store';
import ApproveRequestDialog from '../components/dialogs/ApproveRequestDialog.vue';
import RejectRequestDialog from '../components/dialogs/RejectRequestDialog.vue';
export default {
  components : {
    ApproveRequestDialog,
    RejectRequestDialog
  },
  data(){
    return {
      selected: null,
      headers : [
        { title: 'Номер запроса', align: 'start', key: 'id' },
        { title: 'Объект съемки', align: 'end', key: 'target_satellite' },
        { title: 'Снимающий спутник', align: 'end', key: 'camera_satellite' },
        { title: 'Время съемки', align: 'end', key: 'request_time'},
        { title: 'Статус запроса', align: 'end', key: 'status' },
        { title: 'Действия', align: 'end', key: 'actions' },
      ],
      approveDialog: false,
      rejectDialog: false
    }
  },
  computed: {
    ...mapState(useRequestStore, {
      requests : 'unchecked'
    }),
    processedRequests(){
      return this.requests.map(request => ({
        id: request.id,
        target_satellite: request.target_satellite.name,
        camera_satellite: request.camera_satellite.name,
        request_time: new Date(request.request_time).toLocaleString(),
        status: request.status.title,
        comment: request.comment
      }))
    }
  },
  methods : {
    ...mapActions(useRequestStore, {
      getUncheckedRequests : 'getUncheckedRequests',
      rejectRequest: 'rejectRequest',
      confirmRequest: 'confirmRequest'
    }),
    async reject(data){
      await this.rejectRequest(this.selected.id, data);
    },
    async approve(data){
      const formData = new FormData();
      formData.append('comment', data.comment);
      formData.append('file', data.file);
      await this.confirmRequest(this.selected.id, formData);
    }
  },
  async mounted(){
    await this.getUncheckedRequests();
    console.log(this.requests);
  }
}
</script>