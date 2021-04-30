import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import Vuelidate from 'vuelidate'

// Tailwind
import '@/assets/css/tailwind.scss'

// Loading 
import 'vue-loading-overlay/dist/vue-loading.css'

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(Loading, {
  color: '#10b981',
  width: 64,
  height: 64,
  backgroundColor: '#000',
  opacity: 0.5,
  zIndex: 999,
  loader: 'bars'
});
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
