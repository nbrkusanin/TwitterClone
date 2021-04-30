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
      state.loggedIn = !!payload.user
    },

    setUsersProfile (state, payload) {
      state.usersProfile = payload
    },

    setSearchUsers (state, payload) {
      state.searchUsers = payload
    },
  },

  actions: {
     async login ({ commit, dispatch },payload) {
        try {
          const res = await axios.get(`/users?${payload.query}`)
          commit('setUser', {
            user: res.data[0]
          })
          dispatch('saveUser', res.data[0].id)
          return res.data
        } catch (error) {
          return Promise.reject(error)
        }
    },

    async register ({commit, dispatch}, payload) {
      try {
        const res = await axios.post('/users', payload)
        commit('setUser', {
          user: res.data
        })
        dispatch('saveUser', res.data.id)
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },

    saveUser (_, id) {
      localStorage.setItem('loggedUser', id)
    },

    async getUserById ({commit, dispatch}, id) {
      try {
        const res = await axios.get(`/users/${id}`)
        commit('setUser', {
          user: res.data,
          loggedIn: true
        })
        dispatch('saveUser', res.data.id)
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async getUserByName ({commit}, payload) {
      let params = new URLSearchParams()
      params.append('_limit', '5')
      params.append('email_like', payload)
      try {
        const res = await axios.get(`/users?${params}`)
        commit('setSearchUsers',  res.data)
        return res
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async getUsersProfile ({commit}, id) {
      try {
        const res = await axios.get(`/users/${id}`)
        commit('setUsersProfile', res.data)
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },

    logoutUser ({commit}) {
      localStorage.removeItem('loggedUser')
      commit('setUser', {
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