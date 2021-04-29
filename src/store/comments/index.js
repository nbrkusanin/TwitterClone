import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      comments: [], 
      comment: null
    }
  },
  mutations: {
    setComments (state, payload) {
      state.comments = payload
    },

    deleteComment (state, id) {
      state.comments = state.comments.filter(comment => {
        return comment.id !== id
      })
    }
  },

  actions: {
    getCommentsByPost (context, id) {
      let params = new URLSearchParams()
      params.append('postId', id)
      params.append('_sort', 'id')
      params.append('_order', 'desc')
      axios.get(`http://localhost:3000/comments?${params}`)
      .then( response => {
        context.commit('setComments', response.data)
      })
      .catch ( error => {
        console.log(error)
      })
    },

    createComment (context, payload) {
      axios.post(`http://localhost:3000/comments`, {
        userId: payload.userId,
        authorId: payload.authorId,
        postId: payload.postId,
        author: payload.author,
        comment: payload.comment
      })
      .then( () => {
        context.dispatch('getCommentsByPost', payload.postId)
      })
      .catch ( error => {
        console.log(error)
      })
    },

    deleteComment (context, id) {
      axios.delete(`http://localhost:3000/comments/${id}`)
      .then( () => {
        context.commit('deleteComment', id)
      })
      .catch ( error => {
        console.log(error)
      })
    },

    editComment (context, payload) {
      axios.put(`http://localhost:3000/comments/${payload.id}`, payload)
      .then( () => {
        context.dispatch('getCommentsByPost', payload.postId)
      })
      .catch ( error => {
        console.log(error)
      })
    }
  },

  getters: {
    comments (state) {
      return state.comments
    }
  }
}