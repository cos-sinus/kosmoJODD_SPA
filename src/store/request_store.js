import { defineStore } from 'pinia'
import { send_request } from '../api/request_api'
import { useUserStore } from './user_store'

export const useRequestStore = defineStore('request_store', {
    state: () => ({
        
    }),
    actions: {
        async sendRequest(data){
            const userStore = useUserStore();
            const token = userStore.token;
            const response = await send_request(data, token);
            return response;
        }
    }
})