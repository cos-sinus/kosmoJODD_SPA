import { defineStore } from 'pinia'
import { get_all_satellites } from '../api/satellite_api'

export const useSatelliteStore = defineStore('satellite_store', {
    state: () => ({
        satellites : [],
        selected_satellite : null
    }),
    actions : {
        async getAllSatellites(){
            this.satellites = await get_all_satellites();
        },
        setSelectedSatellite(satellite){
            this.selected_satellite = satellite;
        }
    }
})