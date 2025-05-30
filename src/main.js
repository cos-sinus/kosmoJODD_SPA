import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
// import '@mdi/font/css/materialdesignicons.css'


const vuetify = createVuetify();

createApp(App)
  .use(router)
  .use(createPinia())
  .use(vuetify)
  .mount('#app')
