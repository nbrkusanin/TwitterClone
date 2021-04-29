import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      loggedIn: false, 
      user: null,
      usersProfile: null,
      searchUsers: []
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload.user
      state.loggedIn = payload.loggedIn
    },

    setUsersProfile (state, payload) {
      state.usersProfile = payload.usersProfile
    },

    setSearchUsers (state, payload) {
      state.searchUsers = payload
    },
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
      .catch ( (error) => {
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

    getUserByName (context, payload) {
      let params = new URLSearchParams()
      params.append('email_like', payload)
      axios.get(`http://localhost:3000/users?${params}`)
      .then( response => {
        context.commit('setSearchUsers',  response.data)
      })
      .catch ( error => {
        console.log(error)
      })
    },

    getUsersProfile (context, id) {
      axios.get(`http://localhost:3000/users/${id}`)
      .then( response => {
        context.commit('setUsersProfile', {
          usersProfile: response.data
        })
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
    },

    usersProfile (state) {
      return state.usersProfile
    },

    searchUsers (state) {
      return state.searchUsers
    },
  }
}