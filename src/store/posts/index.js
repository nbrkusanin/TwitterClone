import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      posts: [], 
      post: null
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
      state.posts = state.posts.filter(post => {
        return post.id !== id
      })
    }
  },

  actions: {
    getPosts (context) {
      let params = new URLSearchParams()
      params.append('_sort', 'id')
      params.append('_order', 'desc')
      axios.get(`http://localhost:3000/posts?${params}`)
      .then( response => {
        context.commit('setPosts', response.data)
      })
      .catch ( error => {
        console.log(error)
      })
    },

    getPostsById (context, id) {
      let params = new URLSearchParams()
      params.append('userId', id)
      params.append('_sort', 'id')
      params.append('_order', 'desc')
      axios.get(`http://localhost:3000/posts?${params}`)
      .then( response => {
        context.commit('setPosts', response.data)
      })
      .catch ( error => {
        console.log(error)
      })
    },

    createPost (context, payload) {
      axios.post(`http://localhost:3000/posts`, {
        userId: payload.userId,
        title: payload.title,
        author: payload.author,
        post: payload.post
      })
      .then( response => {
        context.commit('addPost', response.data)
      })
      .catch ( error => {
        console.log(error)
      })
    },

    deletePost (context, id) {
      axios.delete(`http://localhost:3000/posts/${id}`)
      .then( () => {
        context.commit('deletePost', id)
      })
      .catch ( error => {
        console.log(error)
      })
    },

    editPost (context, payload) {
      axios.put(`http://localhost:3000/posts/${payload.id}`, payload)
      .then( () => {
        context.dispatch('getPosts')
      })
      .catch ( error => {
        console.log(error)
      })
    }
  },

  getters: {
    posts (state) {
      return state.posts
    }
  }
}