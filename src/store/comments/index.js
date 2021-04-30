import axios from 'axios'
import Vue from 'vue'

export default {
  namespaced: true,
  state () {
    return {
      comments: {}, 
    }
  },
  mutations: {
    setComments (state, {id, data}) {
      Vue.set(state.comments, id, data)
    },

    deleteComment (state, payload) {
      console.log(state, payload)
      const index = state.comments[payload.postId].findIndex(post => post.id === payload.id)
      state.comments[payload.postId].splice(index, 1)
    }
  },

  actions: {
    async getCommentsByPost ({ commit }, id) {
      let params = new URLSearchParams()
      params.append('postId', id)
      params.append('_sort', 'id')
      params.append('_order', 'desc')
      try {
        const res = await axios.get(`/comments?${params}`)
        commit('setComments', {id, data: res.data})
        return res
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async createComment ({ dispatch }, payload) {
      try {
        await axios.post(`/comments`, payload)
        dispatch('getCommentsByPost', payload.postId)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async deleteComment ({ commit }, payload) {
      try {
        await axios.delete(`/comments/${payload.id}`)
        commit('deleteComment', payload)
      } catch (error) {
        return Promise.reject(error)
      }
    },

    async editComment ({ dispatch }, payload) {
      try {
        await axios.put(`/comments/${payload.id}`, payload)
        dispatch('getCommentsByPost', payload.postId)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },

  getters: {
    comments: (state) => (id) => state.comments[id]
  }
}