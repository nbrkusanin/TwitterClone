import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth'
import postsModule from './posts'
import commentsModule from './comments'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authModule,
    postsModule,
    commentsModule
  }
})
