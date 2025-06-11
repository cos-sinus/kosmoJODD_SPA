<template>
  <v-data-table
    v-model="selected"
    :items="items"
    item-value="name"
    show-select
  ></v-data-table>
</template>
<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>