<template>
  <div class="flex justify-center">
    <div class="w-1/2 border border-t-0 border-b-0 border-green-200 center-section">
      <div class="border-b border-green-200 flex justify-center items-center flex-col p-3">
        <div class="w-14 h-14 rounded-full border-2 border-green-200 flex justify-center items-center mb-3">
          <svg class="fill-green-200 h-8 w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
        </div>
        <h3 v-if="usersProfile" class="text-xl text-green-400">{{ usersProfile.email }}</h3>
      </div>
      <div v-if="loggedUser && loggedUser.id == profilesId" class="border-b border-green-200">
        <input v-model="form.title" type="text" class="w-full shadow-inner p-4 border-0 focus:outline-none" placeholder="Title">
        <p class="text-red-500" v-if="titleError !== ''">{{ titleError }}</p>
        <textarea v-model="form.post" class="w-full shadow-inner p-4 border-0 focus:outline-none resize-none" placeholder="Write Post" rows="4" ></textarea>
        <p class="text-red-500" v-if="postError !== ''">{{ postError }}</p>
        <button @click="savePost()" class="bg-green-400 hover:bg-green-700 text-white font-bold py-1 px-6 rounded-full ml-3 mb-3">
          Post
        </button>
      </div>
      <div>
        <div v-for="(post, i) in posts" :key="post.id" class="p-3 border-b border-green-200">
          <router-link :to="{ name: 'Profile', params: {id: post.id}}" class="text-green-400 text-lg hover:underline">{{ post.author }}</router-link>
          <h3 class="text-gray-400 font-semibold mt-3 mb-1">{{ post.title }}</h3>
          <p class="text-gray-400">{{ post.post }}</p>
          <div class="w-full flex justify-end mt-3">
            <svg @click="editPostModal(post.id, post.title, post.post)" v-if="loggedUser && post.userId === user.id" class="fill-red w-6 h-6 mr-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 64 64" id="Layer_1" version="1.1" viewBox="0 0 64 64" xml:space="preserve"><g><path d="M55.736,13.636l-4.368-4.362c-0.451-0.451-1.044-0.677-1.636-0.677c-0.592,0-1.184,0.225-1.635,0.676l-3.494,3.484   l7.639,7.626l3.494-3.483C56.639,15.998,56.639,14.535,55.736,13.636z"/><polygon points="21.922,35.396 29.562,43.023 50.607,22.017 42.967,14.39  "/><polygon points="20.273,37.028 18.642,46.28 27.913,44.654  "/><path d="M41.393,50.403H12.587V21.597h20.329l5.01-5H10.82c-1.779,0-3.234,1.455-3.234,3.234v32.339   c0,1.779,1.455,3.234,3.234,3.234h32.339c1.779,0,3.234-1.455,3.234-3.234V29.049l-5,4.991V50.403z"/></g></svg>
            <svg @click="deletePostModal(post.id)" v-if="loggedUser && post.userId === user.id" class="fill-gray w-6 h-6 mr-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
            <svg @click="showComment(i)" class="fill-green w-6 h-6 mr-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="Layer_1" style="enable-background:new 0 0 30 30;" version="1.1" viewBox="0 0 30 30" xml:space="preserve"><path d="M25,24H5c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h20c1.105,0,2,0.895,2,2v15C27,23.105,26.105,24,25,24z"/><polygon points="9,28 9,23 15,23 10.818,28.57 "/><circle cx="10" cy="28" r="1"/></svg>
          </div>
          <comments v-if="isShowing(i)" :post="post"></comments>
        </div>
      </div>
    </div>
    <modal-wrapper v-if="deleteModal">
      <div class="w-96 h-56 bg-white border border-green-500 rounded-lg flex justify-center items-center flex-col">
        <h3 class="text-green-500 text-2xl">Are you sure?</h3>
        <div class="w-4/6 flex justify-center items-center mt-10">
          <button @click="deletePost()" class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-1 px-6 rounded-full mr-5 mb-3">
            Delete
          </button>
          <button @click="deleteModal = false" class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-1 px-6 rounded-full mb-3">
            Cancel
          </button>
        </div>
      </div>
    </modal-wrapper>
    <modal-wrapper v-if="editModal">
      <div class="w-124 h-96 bg-white border border-green-500 rounded-lg flex justify-center items-center flex-col">
        <h3 class="text-green-500 text-2xl">Edit Post</h3>
        <div class="p-3 w-5/6">
          <input v-model="editForm.title" type="text" class="w-full shadow-inner p-4 border border-gray-100 focus:outline-none mb-3" placeholder="Title">
          <p class="text-red-500" v-if="editTitleError !== ''">{{ editTitleError }}</p>
          <textarea v-model="editForm.post" class="w-full shadow-inner p-4 border border-gray-100 focus:outline-none resize-none" placeholder="Write Post" rows="4" ></textarea>
          <p class="text-red-500" v-if="editPostError !== ''">{{ editPostError }}</p>
        </div>
        <div class="w-4/6 flex justify-center items-center mt-3">
          <button @click="editPost()" class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-1 px-6 rounded-full mr-5 mb-3">
            Edit
          </button>
          <button @click="editModal = false" class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-1 px-6 rounded-full mb-3">
            Cancel
          </button>
        </div>
      </div>
    </modal-wrapper>
  </div>
</template>

<script>
import ModalWrapper from '../common/ModalWrapper'
import Comments from '../common/Comments'

export default {
  components: {
    ModalWrapper,
    Comments
  },

  data () {
    return {
      form: {
        title: '',
        post: ''
      }, 
      editForm: {
        title: '',
        post: ''
      },
      deleteModal: false,
      editModal: false,
      deleteId: null,
      editId: null,
      titleError: '',
      postError: '',
      editTitleError: '',
      editPostError: '',
      showing: []
    }
  },

  computed: {
    posts () {
      return this.$store.getters['postsModule/posts']
    },

    user () {
      return this.$store.getters['authModule/loggedUser']
    },

    loggedUser () {
      return this.$store.getters['authModule/loggedUser']
    },

    profilesId () {
      return this.$route.params.id
    },

    usersProfile () {
      return this.$store.getters['authModule/usersProfile']
    }
  },

  watch: {
    profilesId () {
      this.loadPosts(this.profilesId)
      this.getUsersProfile(this.profilesId)
    }
  },

  mounted () {
    this.loadPosts(this.profilesId),
    this.getUsersProfile(this.profilesId)
  },

  methods: {
    async loadPosts (id) {
      const loader = this.$loading.show()
      try {
        await this.$store.dispatch('postsModule/getPostsById', id)
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },

    async getUsersProfile (id) {
      const loader = this.$loading.show()
      try {
        await this.$store.dispatch('authModule/getUsersProfile', id)
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },

    async savePost () {
      if(this.form.title !== '' && this.form.post !== '') {
        const payload = {
          userId: this.user.id, 
          author: this.user.email, 
          title: this.form.title,
          post: this.form.post
        }
        const loader = this.$loading.show()
        try {
          await this.$store.dispatch('postsModule/createPost', payload)
          this.form.title = ''
          this.form.post = ''
          this.titleError = null
          this.postError = null
        } catch (e) {
          console.log(e)
        } finally {
          loader.hide()
        }
      } else {
        if (this.form.title === '') {
          this.titleError = 'Title field is empty.'
        }
        if (this.form.post === '') {
          this.postError = 'Post field is empty.'
        }
      }
    },

    async editPost () {
      if(this.editForm.title !== '' && this.editForm.post !== '') {
        const payload = {
          id: this.editId,
          userId: this.user.id, 
          author: this.user.email, 
          title: this.editForm.title,
          post: this.editForm.post
        }
        const loader = this.$loading.show()
        try {
          await this.$store.dispatch('postsModule/editPost', payload)
          this.editForm.title = ''
          this.editForm.post = ''
          this.editModal = null
          this.editId = null
        } catch (e) {
          console.log(e)
        } finally {
          loader.hide()
        }
      } else {
        if (this.editForm.title === '') {
          this.editTitleError = 'Title field is empty.'
        }
        if (this.editForm.post === '') {
          this.editPostError = 'Post field is empty.'
        }
      }
    },

    async deletePost () {
      const loader = this.$loading.show()
      try {
        await this.$store.dispatch('postsModule/deletePost', this.deleteId)
        this.deleteModal = false
        this.deleteId = null
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },

    deletePostModal (id) {
      this.deleteModal = true
      this.deleteId = id
    },

    editPostModal (id, title, post) {
      this.editModal = true
      this.editId = id
      this.editForm.title = title
      this.editForm.post = post
    },

    showComment(index) {
      if(this.showing.includes(index)) {
        this.showing.splice(this.showing.indexOf(index), 1)
      } else {
        this.showing.push(index)
      }
    },

    isShowing (index) {
      return this.showing.includes(index)
    },
  }
}
</script>

<style lang="scss" scoped>
  .center-section {
    height: calc(100% - 90px);
    overflow-y: auto;
  }
</style>