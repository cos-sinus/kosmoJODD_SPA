<template>
    <v-card class="mt-10" color="blue-lighten-4">
        <v-card-title v-if="user" class="text-h2">{{ user.name }}</v-card-title>
        <v-card-subtitle v-if="user" class="text-h5">{{ user.email }}</v-card-subtitle>
    </v-card>
    <v-card class="left-0 w-auto h-auto mt-10">
        <v-list :items="requests" item-title="title" item-value="key">
        </v-list>
    </v-card>
</template>

<script> 
import { useUserStore } from '../store/user_store';
import { mapActions, mapState } from 'pinia';
import { useRequestStore } from '../store/request_store';
export default {
    data(){
        return {
            requests : [
                {
                    title: 'Мои запросы',
                    align: 'start',
                    key: 'id',
                },
            ],
        }
    },
    computed : {
        ...mapState(useUserStore, {
            user: 'user',
        }),
        ...mapState(useRequestStore, {
      requests : 'unchecked'
        })
    },
    methods : {
        ...mapActions(useUserStore, {
            me : "me"
        }),
        ...mapActions(useRequestStore, {
            getUncheckedRequests : 'getUncheckedRequests'
        })
    },
    async mounted(){
        await this.me();
        await this.getUncheckedRequests();
    }
}
</script>
