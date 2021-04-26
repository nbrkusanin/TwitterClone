import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'

import '@/assets/css/tailwind.css'

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
