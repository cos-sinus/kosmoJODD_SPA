<template>
    <header class="bg-blue-lighten-2 d-flex justify-end align-center">
      <v-btn v-if="user" class="mr-10" :to="{name: 'profile'}">Мой профиль</v-btn>
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