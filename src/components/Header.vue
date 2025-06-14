<template>
    <header class="bg-blue-lighten-2 d-flex justify-space-between align-center pa-4">
        <h1 class="text-white font-weight-bold">КосмоЦОДД</h1>
        <v-btn v-if="user && user?.is_admin" class="mr-10" :to="{name: 'requests'}">Заявки</v-btn>
        <div v-else></div>
        <v-btn v-if="user" class="mr-10" :to="{name: 'profile'}">{{ user.name }}</v-btn>
        <v-btn v-else class="mr-10" :to="{name: 'signin'}">Вход</v-btn>
    </header>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useUserStore } from '../store/user_store';
export default {
    computed : {
        ...mapState(useUserStore, {
            user: 'user',
        })
    },
    methods : {
        ...mapActions(useUserStore, {
            me : "me"
        })
    },
    async mounted(){
        await this.me();
    }
}
</script>