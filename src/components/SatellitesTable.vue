<template>
<v-data-table
    :headers="headers"
    :items="satellites"
    item-value="name"
    select-strategy="single"
    show-select
  ></v-data-table>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useSatelliteStore } from '../store/satellite_store';


export default {
    data (){
        return {
            headers : [
            {
                title: 'Спутник',
                align: 'start',
                key: 'name',
            },
            { title: 'Номер в катологе', align: 'end', key: 'cutalog_num' },
            { title: 'Год запуска', align: 'end', key: 'international_des_year' },
            { title: 'Номер запуска в году', align: 'end', key: 'international_des_num' },
            { title: 'Часть запуска в году (Оно нам надо?)', align: 'end', key: 'international_des_push' },
            { title: 'Год эпохи', align: 'end', key: 'epoch_day' },
            ],
        //      satellites : [
        //         {
        //         name: 'abracadabra',
        //         NumInCat: 57184,
        //         DesYear: 24,
        //         DesNum: 91,
        //         DesPush: "AC",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'nononononono',
        //         NumInCat: 65342,
        //         DesYear: 25,
        //         DesNum: 34,
        //         DesPush: "V",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'brbrbrbrbrb',
        //         NumInCat: 53245,
        //         DesYear: 22,
        //         DesNum: 12,
        //         DesPush: "W",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'totototototot',
        //         NumInCat: 54353,
        //         DesYear: 23,
        //         DesNum: 43,
        //         DesPush: "W",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'rererererere',
        //         NumInCat: 65464,
        //         DesYear: 24,
        //         DesNum: 56,
        //         DesPush: "T",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'frfrfrfrfrfr',
        //         NumInCat: 23421,
        //         DesYear: 25,
        //         DesNum: 4,
        //         DesPush: "R",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'bubububububu',
        //         NumInCat: 64523,
        //         DesYear: 25,
        //         DesNum: 43,
        //         DesPush: "AD",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'kekekekekek',
        //         NumInCat: 73523,
        //         DesYear: 23,
        //         DesNum: 43,
        //         DesPush: "R",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'uiuiuiuiuiuiui',
        //         NumInCat: 74534,
        //         DesYear: 22,
        //         DesNum: 54,
        //         DesPush: "F",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'iririririri',
        //         NumInCat: 64324,
        //         DesYear: 24,
        //         DesNum: 4,
        //         DesPush: "H",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'trtrtrtrtrt',
        //         NumInCat: 54234,
        //         DesYear: 23,
        //         DesNum: 1,
        //         DesPush: "Y",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'opopopopopo',
        //         NumInCat: 57184,
        //         DesYear: 24,
        //         DesNum: 23,
        //         DesPush: "E",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'rtrtrtrt',
        //         NumInCat: 78452,
        //         DesYear: 25,
        //         DesNum: 76,
        //         DesPush: "R",
        //         EpochYear: 25,
        //         },
        //         {
        //         name: 'asasasasasa',
        //         NumInCat: 57234,
        //         DesYear: 23,
        //         DesNum: 54,
        //         DesPush: "J",
        //         EpochYear: 25,
        //         },
        //     ]
        }
       
    },
    computed : {
        ...mapState(useSatelliteStore, {
            satellites : 'satellites',
        })
    },
    methods : {
        ...mapActions(useSatelliteStore, {
            getAllSatellites : 'getAllSatellites',
        })
    },
    async mounted(){
        await this.getAllSatellites();
    }
}
</script>