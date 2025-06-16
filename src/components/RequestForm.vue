<template>
    <v-card v-if="nearSatellites.length > 0" class="mt-5 pa-2">
        <v-select
            label="Снимающий спутник"
            :items="nearSatellites"
            item-value="id"
            item-title="name"
            v-model="selectedCamera"
            variant="outlined"
        >
        </v-select>
        <v-chip class="ma-2" color="pink" label>
            <v-icon icon="mdi-clock-outline" start></v-icon>
            {{ selectedShootingTime }}
        </v-chip>
        <v-btn @click="send">Отправить заявку</v-btn>
    </v-card>
    <v-card class="mt-5" v-else>
        <h2>Спутник не выбран или нет спутников для съемки</h2>
    </v-card>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useSatelliteStore } from '../store/satellite_store';
import { useRequestStore } from '../store/request_store';
export default {
    data(){
        return {
            selectedCamera: null
        }
    },
    computed : {
        ...mapState(useSatelliteStore, {
            nearSatellites: "near_satellites",
            selectedSatellite: "selected_satellite",
        }),
        selectedShootingTime(){
            if(this.selectedCamera){
                const sat = this.nearSatellites.find(satellite => satellite.id === this.selectedCamera);
                return new Date(sat.time_visible).toLocaleString();
            }
            return "";
        }
    },
    methods : {
        ...mapActions(useRequestStore, {
            sendRequest: "sendRequest"
        }),
        async send(){
            if(!this.selectedCamera || !this.selectedSatellite) return;
            const requestData = {
                camera_satellite_id: this.selectedCamera,
                target_satellite_id: this.selectedSatellite[0].id,
                request_time: this.selectedShootingTime
            }
            console.log("Заявка", requestData);
            console.log("selectedSatellite", this.selectedSatellite);
            if(await this.sendRequest(requestData)){
                alert("Заявка успешно отправлена");
            }
            else{
                alert("Произошла ошибка при отправке заявки");
            }
        }
    }
}

</script>
