<template>
    <v-card class="mt-10" color="blue-lighten-4">
        <v-card-title class="text-h2">Имя пользователя</v-card-title>
        <v-card-subtitle class="text-h5">Почта</v-card-subtitle>
    </v-card>
    <v-card class="left-0 w-auto h-auto mt-10">
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="text-h6">Мои запросы</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list :items="items"></v-list>
    </v-card>
</template>

<script> 
import { useUserStore } from '../store/user_store';
import { mapActions } from 'pinia';
export default {
    data(){
        return {
            items: [
                {
                    title: 'Item 1',
                    value: 1,
                },
                {
                    title: 'Item 2',
                    value: 2,
                },
            ],
        }
    },
    methods: {
        ...mapActions(useUserStore, {
            profile: 'profile',
        }),
        submitForm() {
            this.signin(this.signupData).then(result => {
                if(result) this.$router.push({name: "home"});
                else alert("error");
            })
        }
    }
}
</script>
