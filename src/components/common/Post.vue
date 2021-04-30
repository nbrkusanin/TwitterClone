<template>
  <div>
    <div class="p-3 border-b border-green-200">
      <router-link :to="{ path: `profile/${post.userId}`}" class="text-green-400 text-lg hover:underline">{{ post.author }}</router-link>
      <h3 class="text-gray-400 font-semibold mt-3 mb-1">{{ post.title }}</h3>
      <p class="text-gray-400">{{ post.post }}</p>
      <div class="w-full flex justify-end mt-3">
        <svg @click="editPostModal(post.id, post.title, post.post)" v-if="user && post.userId === user.id" class="fill-red w-6 h-6 mr-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 64 64" id="Layer_1" version="1.1" viewBox="0 0 64 64" xml:space="preserve"><g><path d="M55.736,13.636l-4.368-4.362c-0.451-0.451-1.044-0.677-1.636-0.677c-0.592,0-1.184,0.225-1.635,0.676l-3.494,3.484   l7.639,7.626l3.494-3.483C56.639,15.998,56.639,14.535,55.736,13.636z"/><polygon points="21.922,35.396 29.562,43.023 50.607,22.017 42.967,14.39  "/><polygon points="20.273,37.028 18.642,46.28 27.913,44.654  "/><path d="M41.393,50.403H12.587V21.597h20.329l5.01-5H10.82c-1.779,0-3.234,1.455-3.234,3.234v32.339   c0,1.779,1.455,3.234,3.234,3.234h32.339c1.779,0,3.234-1.455,3.234-3.234V29.049l-5,4.991V50.403z"/></g></svg>
        <svg @click="deletePostModal(post.id)" v-if="user && post.userId === user.id" class="fill-gray w-6 h-6 mr-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
        <svg @click="showComment(index)" class="fill-green w-6 h-6 mr-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="Layer_1" style="enable-background:new 0 0 30 30;" version="1.1" viewBox="0 0 30 30" xml:space="preserve"><path d="M25,24H5c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h20c1.105,0,2,0.895,2,2v15C27,23.105,26.105,24,25,24z"/><polygon points="9,28 9,23 15,23 10.818,28.57 "/><circle cx="10" cy="28" r="1"/></svg>
      </div>
      <comments v-if="isShowing(index)" :post="post"></comments>
    </div>
    <confirm-modal
      v-if="editModal"
      text="Edit Post"
      button-text="Edit"
      @confirm="editPost()"
      @close="editModal = false">
      <input v-model="editForm.title" type="text" class="w-full shadow-inner p-4 border border-gray-100 focus:outline-none mb-3" placeholder="Title">
      <p v-if="$v.editForm.title.$dirty && !$v.editForm.title.required" class="text-red-500 mb-1 ml-2">Required</p>
      <textarea v-model="editForm.post" class="w-full shadow-inner p-4 border border-gray-100 focus:outline-none resize-none" placeholder="Write Post" rows="4" ></textarea>
      <p v-if="$v.editForm.post.$dirty && !$v.editForm.post.required" class="text-red-500 mb-1 ml-2">Required</p>
    </confirm-modal>

    <confirm-modal
      v-if="deleteModal"
      button-text="Delete"
      @confirm="deletePost()"
      @close="deleteModal = false" />

     
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import ConfirmModal from '../common/ConfirmModal'
import Comments from '../common/Comments'

export default {
  components: {
    ConfirmModal,
    Comments
  },

  props: {
    post: {
      type: Object,
      required: true
    },

    index: {
      type: Number,
      required: true
    },

    user: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      editForm: {
        title: '',
        post: ''
      },
      deleteModal: false,
      editModal: false,
      deleteId: null,
      editId: null,
      showing: []
    }
  },

  methods: {

    async editPost () {
      this.$v.$touch()

      if (this.$v.$invalid) {
          return
      }
      
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
  },

  validations: {
    editForm: {
      title: { required },
      post: { required }
    }
  }
}
</script>

<style>

</style>