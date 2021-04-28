<template>
  <div class="font-sans antialiased sticky top-0" id="app">
    <nav class="flex items-center justify-between flex-wrap bg-green-500 p-6">
      <router-link to="/" class="flex items-center flex-no-shrink text-white mr-6">
        <svg class="fill-white h-8 w-8 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
        <span class="font-semibold text-3xl tracking-tight">NBTwitter</span>
      </router-link>
      <div class="block sm:hidden">
        <button @click="toggle" class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div :class="open ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto justify-end">
        <!-- <div class="text-sm sm:flex-grow flex justify-center">
          <router-link to="/" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
            Docs
          </router-link>
          <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
            Examples
          </a>
          <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white">
            Blog
          </a>
        </div> -->
        <div class="relative text-gray-600">
          <input type="search" name="serch" placeholder="Search" class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none">
          <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
          </button>
        </div>
        <template v-if="loggedUser">
          <div class="ml-5">
            <div class="dropdown inline-block relative">
              <button @click="showDropdown = !showDropdown" class="bg-white border hover:bg-green-500 hover:text-white hover:border-white text-green-500 font-bold py-2 px-4 rounded outline-none inline-flex items-center">
                <span class="mr-1">{{ loggedUser.email }}</span>
                <svg class="fill-green h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
              </button>
              <ul v-if="showDropdown" class="dropdown-menu absolute text-gray-700 pt-1 border border-green-500 rounded w-full">
                <li class=""><router-link to="/" class="rounded-t bg-white hover:bg-green-100 py-2 px-4 block whitespace-no-wrap" href="#">Home</router-link></li>
                <li class=""><router-link :to="{ path: `profile/${loggedUser.id}`}" class="bg-white hover:bg-green-100 py-2 px-4 block whitespace-no-wrap" href="#">Profile</router-link></li>
                <li class=""><a @click="logout()" class="rounded-b bg-white hover:bg-green-100 py-2 px-4 block whitespace-no-wrap" href="javascript:void(0)">Logout</a></li>
              </ul>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex items-center justify-between ml-5">
            <router-link to="/register" class="bg-white border hover:bg-green-500 hover:text-white hover:border-white text-green-500 font-bold py-2 px-4 rounded outline-none" type="button">
              Register
            </router-link>
            <router-link to="/login" class="bg-white border hover:bg-green-500 hover:text-white hover:border-white text-green-500 font-bold py-2 px-4 rounded outline-none ml-2" type="button">
              Login
            </router-link>
          </div>
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
  import loggedIn from '@/services/auth'

  export default {
    data () {
      return {
        open: false,
        showDropdown: false
      }
    },

    mounted () {
      loggedIn()
    },

    computed: {
      loggedUser () {
        return this.$store.getters['authModule/loggedUser']
      }
    },

    methods: {
      toggle () {
        this.open = !this.open
      },

      logout () {
        this.$store.dispatch('authModule/logoutUser')
      }
    }
  }
</script>