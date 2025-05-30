import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
// import 'cesium/Build/Cesium/Widgets/widgets.css'
// window.CESIUM_BASE_URL = '/Cesium'

loadFonts()

createApp(App)
  .use(router)
  .use(createPinia())
  .use(vuetify)
  .mount('#app')
