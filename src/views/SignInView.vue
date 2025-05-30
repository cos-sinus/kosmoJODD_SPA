<template>
    <v-sheet class="mx-auto bg-blue-lighten-1 pa-8 ma-8 rounded elevation-8" max-width="300">
        <v-form validate-on="submit lazy" class="d-flex flex-column align-center">
            <h2 class="text-center mb-5">Вход</h2>
            <v-text-field label="Почта" v-model="signupData.email" width="250"></v-text-field>
            <v-text-field type="password" label="Пароль" v-model="signupData.password" width="250"></v-text-field>
            <v-btn class="text-center" @click="submitForm">Войти</v-btn>
        </v-form>
    </v-sheet>

</template>
<script> 
import { useUserStore } from '../store/user_store';
import { mapActions } from 'pinia';

export default {
    data(){
        return {
            signupData: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions(useUserStore, {
            signin: 'signin',
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