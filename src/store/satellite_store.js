import { defineStore } from 'pinia'
import { get_all_satellites } from '../api/satellite_api'

export const useSatelliteStore = defineStore('satellite_store', {
    state: () => ({
        satellites : []
    }),
    actions : {
        async getAllSatellites(){
            this.satellites = await get_all_satellites();
        }
    }
})