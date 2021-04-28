import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      loggedIn: false, 
      user: null
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload.user
      state.loggedIn = payload.loggedIn
    }
  },

  actions: {
    login (context, payload) {
      axios.get(`http://localhost:3000/users?${payload.query}`)
      .then( response => {
        context.commit('setUser', {
          user: response.data[0],
          loggedIn: true
        })
        context.dispatch('saveUser', response.data[0].id)
      })
      .catch ( error => {
        console.log(error)
      })
    },

    register (context, payload) {
      axios.post('http://localhost:3000/users', {
          email: payload.email,
          password: payload.password
      })
      .then( response => {
        context.commit('setUser', {
          user: response.data,
          loggedIn: true
        })
        context.dispatch('saveUser', response.data.id)
      })
      .catch ( error => {
        console.log(error)
      })
    },

    saveUser (_, id) {
      localStorage.setItem('loggedUser', id)
    },

    getUserById (context, id) {
      axios.get(`http://localhost:3000/users/${id}`)
      .then( response => {
        context.commit('setUser', {
          user: response.data,
          loggedIn: true
        })
        context.dispatch('saveUser', response.data.id)
      })
      .catch ( error => {
        console.log(error)
      })
    },

    logoutUser (context) {
      localStorage.removeItem('loggedUser')
      context.commit('setUser', {
        user: null,
        loggedIn: false
      })
    }
  },

  getters: {
    loggedUser (state) {
      return state.user
    }
  }
}