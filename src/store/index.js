import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth'
import postsModule from './posts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authModule,
    postsModule
  }
})
