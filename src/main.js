import './firebase'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import VueYoutube from 'vue-youtube'
import VueClipboard from 'vue-clipboard2'
 
Vue.config.productionTip = false

Vue.use(firestorePlugin)
Vue.use(VueYoutube)
Vue.use(VueClipboard)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
