import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      posts: [], 
    }
  },
  mutations: {
    setPosts (state, payload) {
      state.posts = payload
    },

    addPost (state, payload) {
      state.posts.unshift(payload)
    },

    deletePost (state, id) {
      const index = state.posts.findIndex(post => post.id === id)
      state.posts.splice(index, 1)
    }
  },

  actions: {
    async getPosts ({ commit }) {
      let params = new URLSearchParams()
      params.append('_sort', 'id')
      params.append('_order', 'desc')
      try {
        const res = await axios.get(`/posts?${params}`)
        commit('setPosts', res.data)
        return res
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async getPostsById ({ commit }, id) {
      let params = new URLSearchParams()
      params.append('userId', id)
      params.append('_sort', 'id')
      params.append('_order', 'desc')
      try {
        const res = await axios.get(`/posts?${params}`)
        commit('setPosts', res.data)
        return res
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async createPost ({ commit }, payload) {
      try {
        const res = await axios.post(`/posts`, payload)
        commit('addPost', res.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async deletePost ({ commit }, id) {
      try {
        await axios.delete(`/posts/${id}`)
        commit('deletePost', id)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async editPost ({ dispatch }, payload) {
      try {
        await axios.put(`/posts/${payload.id}`, payload)
        dispatch('getPosts')
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },

  getters: {
    posts (state) {
      return state.posts
    }
  }
}