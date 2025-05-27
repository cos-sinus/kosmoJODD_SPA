<template>
    <div id="cesium-viewer"></div>

</template>

<script>
import * as Cesium from 'cesium'

export default{
    data(){
        return {
            viewer : null
        }
    },
    mounted(){
        this.initCesium();
    },
    methods : {
        initCesium() {
            this.viewer = new Cesium.Viewer('cesium-viewer', {
                animation: false,
                timeline: false,
                shouldAnimate : true
            })
        }
    }
}
</script>