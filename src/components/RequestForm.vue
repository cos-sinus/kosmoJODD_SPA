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
        <v-btn>Отправить заявку</v-btn>
    </v-card>
    <v-card class="mt-5" v-else>
        <h2>Спутник не выбран или нет спутников для съемки</h2>
    </v-card>
</template>
<script>
import { mapState } from 'pinia';
import { useSatelliteStore } from '../store/satellite_store';
export default {
    data(){
        return {
            selectedCamera: null
        }
    },
    computed : {
        ...mapState(useSatelliteStore, {
            nearSatellites: "near_satellites"
        }),
        selectedShootingTime(){
            if(this.selectedCamera){
                const sat = this.nearSatellites.find(satellite => satellite.id === this.selectedCamera);
                return new Date(sat.time_visible).toLocaleString();
            }
            return "";
        }
    }
}

</script>
