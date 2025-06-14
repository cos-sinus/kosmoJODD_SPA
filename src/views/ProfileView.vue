<template>
    <v-card class="mt-10" color="blue-lighten-4">
        <v-card-title v-if="user" class="text-h2">{{ user.name }}</v-card-title>
        <v-card-subtitle v-if="user" class="text-h5">{{ user.email }}</v-card-subtitle>
    </v-card>
    <v-card>
        <v-data-table
            v-if="requests && requests?.length > 0"
            :headers="headers"
            :items="processedRequests"
            item-value="id"
        >
        <template #item.status="{ item }">
            <v-chip :color="statusColor(item.status_id)">{{ item.status }}</v-chip>
        </template>
        <template #item.file="{ item }">
            <v-btn v-if="item.file" @click="download(item.file)">Скачать</v-btn>
            <p v-else>Файла нет</p>
        </template>
        </v-data-table>
    </v-card>
</template>

<script> 
import { useUserStore } from '../store/user_store';
import { mapActions, mapState } from 'pinia';
import { useRequestStore } from '../store/request_store';
import { downloadFile } from '../utils/download';
import { useTemplateRef } from 'vue';
export default {
    data(){
        return {
            selected: null,
            headers : [
                { title: 'Номер запроса', align: 'start', key: 'id' },
                { title: 'Объект съемки', align: 'end', key: 'target_satellite' },
                { title: 'Снимающий спутник', align: 'end', key: 'camera_satellite' },
                { title: 'Время съемки', align: 'end', key: 'request_time'},
                { title: 'Статус запроса', align: 'end', key: 'status' },
                { title: 'Ссылка на фото', align: 'end', key: 'file' },
                { title: 'Комментарий', align: 'end', key: 'comment' },
            ],
        }
    },
    computed : {
        ...mapState(useUserStore, {
            user: 'user',
        }),
        ...mapState(useRequestStore, {
            requests : 'own'
        }),
        processedRequests(){
            return this.requests.map(request => ({
                id: request.id,
                target_satellite: request.target_satellite.name,
                camera_satellite: request.camera_satellite.name,
                request_time: new Date(request.request_time).toLocaleString(),
                status: request.status.title,
                status_id: request.status.id,
                comment: request.comment,
                file: request.file_path,
            }))
        }
    },
    methods : {
        ...mapActions(useUserStore, {
            me : "me"
        }),
        ...mapActions(useRequestStore, {
            getOwnRequests : 'getOwnRequests'
        }),
        download(file_path){
            const url = `http://localhost:5000/${file_path}`;
            downloadFile(url);
        },
        statusColor(status_id){
            switch(status_id){
                case 1:
                    return 'blue-lighten-2';
                case 2:
                    return 'red-lighten-2';
                case 3:
                    return 'green-lighten-2';
                default:
                    return 'grey-lighten-2';
            }
        }
    },
    async mounted(){
        await this.me();
        await this.getOwnRequests();
        console.log("own", this.requests);
    }
}
</script>
