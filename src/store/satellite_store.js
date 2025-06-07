import { defineStore } from 'pinia'
import { get_all_satellites, get_near_satellites } from '../api/satellite_api'

export const useSatelliteStore = defineStore('satellite_store', {
    state: () => ({
        satellites : [],
        selected_satellite : null,
        near_satellites : []
    }),
    actions : {
        async getAllSatellites(){
            this.satellites = await get_all_satellites();
        },
        async getNearSatellites(satellite_id){
            this.near_satellites = await get_near_satellites(satellite_id);
        },
        setSelectedSatellite(satellite){
            this.selected_satellite = satellite;
        }
    }
})