<template>
  <v-app>
    <header class="bg-blue-lighten-2">
    </header>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
<style scoped>
header{
  width: 100vw;
  height: 100px;
}
</style>