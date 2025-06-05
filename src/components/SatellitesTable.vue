<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="satellites"
      item-value="name"
      select-strategy="single"
      show-select
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
    data (){
        return {
            headers : [
            {
                title: 'Спутник',
                align: 'start',
                key: 'name',
            },
            { title: 'Norad ID', align: 'end', key: 'cutalog_num' },
            { title: 'Год запуска', align: 'end', key: 'international_des_year' },
            ],
        }
       
    },
    props: {
      satellites: Array
    }
}
</script>
