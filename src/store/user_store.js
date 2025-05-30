import { defineStore } from 'pinia'
import { signup, signin } from '@/api/user_api'

export const useUserStore = defineStore('user_store', {
    state: () => ({
        token: null
    }),
    actions: {
        async signup(data){
            const result = await signup(data);
            if (result){
                delete data.name;
                await this.signin(data);
                return true;
            }
            return false;
        },
        async signin(data){
            const token = await signin(data);
            console.log("token", token);
            if(token){
                this.token = token;
                return true;
            }
            return false;
        }
    }
})