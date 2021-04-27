import store from '@/store'

const loggedIn = () => {
  const state = store.getters
  const id = localStorage.getItem('loggedUser')
  if (id === null) {
    return false
  } else if (!state.loggedIn && id) {
    store.dispatch('authModule/getUserById', id)
    return id
  } else {
    return id
  }
}

export default loggedIn
