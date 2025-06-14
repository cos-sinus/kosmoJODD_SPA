import { defineStore } from 'pinia'
import { 
    send_request, 
    get_unchecked_requests,
    confirm, reject
} from '../api/request_api'
import { useUserStore } from './user_store'

export const useRequestStore = defineStore('request_store', {
    state: () => ({
        unchecked: null
    }),
    actions: {
        async sendRequest(data){
            const userStore = useUserStore();
            const token = userStore.token;
            const response = await send_request(data, token);
            return response;
        },
        async getUncheckedRequests(){
            const userStore = useUserStore();
            const token = userStore.token;
            const response = await get_unchecked_requests(token);
            if(response) this.unchecked = response;
            else return false;
        },
        async rejectRequest(id, data){
            const userStore = useUserStore();
            const token = userStore.token;
            const response = await reject(token, id, data);
            if(response) await this.getUncheckedRequests();
        },
        async confirmRequest(id, formData){
            const userStore = useUserStore();
            const token = userStore.token;
            const response = await confirm(token, id, formData);
            if(response) await this.getUncheckedRequests();
        }
    }
})