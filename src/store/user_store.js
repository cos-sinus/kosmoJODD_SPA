import { defineStore } from 'pinia'
import { signup, signin, me } from '../api/user_api';
import { setCookie, getCookie } from '../utils/cookieUtils';

export const useUserStore = defineStore('user_store', {
    state: () => ({
        token: null,
        user: null,
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
                setCookie("token", token);
                await this.me();
                return true;
            }
            return false;
        },
        async me(){
            let token = this.token;
            if(!token){
                token = getCookie("token");
            }
            if(!token) return;
            this.token = token;
            const user_info = await me(token);
            if(user_info){
                this.user = user_info;
            }
        }
    }
})