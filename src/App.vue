<template>
  <v-app>
    <Header />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'App',
  components : {
    Header
  },
  data: () => ({
    //
  })
}
</script>
<style scoped>
header{
  width: 100vw;
  height: 100px;
}
</style>