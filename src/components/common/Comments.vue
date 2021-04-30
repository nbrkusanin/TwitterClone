<template>
  <div class="border-t border-gray-200 p-3 mt-4">
    <div v-if="user" class="flex justify-start">
       <input v-model="comment" type="text" class="w-full shadow-inner h-9 pl-4 border border-gray-100 border-r-0 focus:outline-none" placeholder="Write comment...">
       <button @click="saveComment()" class="bg-green-500 border hover:bg-white hover:text-green-500 hover:border-green-500 text-white focus:outline-none font-bold h-9 px-4 rounded outline-none" type="button">
          Comment
        </button>
    </div>
    
    <div v-for="comment in comments" :key="comment.id" class="mt-3">
      <router-link :to="{ path: `profile/${comment.authorId}`}" class="text-green-400 text-sm hover:underline">{{ comment.author }}</router-link>
      <p class="text-xs text-gray-400">{{comment.comment}}</p>
      <div v-if="user" class="w-full flex justify-start mt-1">
        <svg v-if="user.id === comment.authorId" @click="editCommentModal(comment.id, comment.comment)"  class="fill-red w-4 h-4 mr-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 64 64" id="Layer_1" version="1.1" viewBox="0 0 64 64" xml:space="preserve"><g><path d="M55.736,13.636l-4.368-4.362c-0.451-0.451-1.044-0.677-1.636-0.677c-0.592,0-1.184,0.225-1.635,0.676l-3.494,3.484   l7.639,7.626l3.494-3.483C56.639,15.998,56.639,14.535,55.736,13.636z"/><polygon points="21.922,35.396 29.562,43.023 50.607,22.017 42.967,14.39  "/><polygon points="20.273,37.028 18.642,46.28 27.913,44.654  "/><path d="M41.393,50.403H12.587V21.597h20.329l5.01-5H10.82c-1.779,0-3.234,1.455-3.234,3.234v32.339   c0,1.779,1.455,3.234,3.234,3.234h32.339c1.779,0,3.234-1.455,3.234-3.234V29.049l-5,4.991V50.403z"/></g></svg>
        <svg v-if="user.id === comment.authorId || user.id === comment.userId" @click="deleteCommentModal(comment.id, post.id)" class="fill-gray w-4 h-4 mr-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
      </div>
    </div>

    <confirm-modal
      v-if="editModal"
      text="Edit Post"
      button-text="Edit"
      @confirm="updateComment()"
      @close="editModal = false">
      <textarea v-model="editComment" class="w-full shadow-inner p-4 border border-gray-100 focus:outline-none resize-none" placeholder="Write Post" rows="4" ></textarea>
      <p v-if="$v.editComment.$dirty && !$v.editComment.required" class="text-red-500 mb-1 ml-2">Required</p>
    </confirm-modal>

    <confirm-modal
      v-if="deleteModal"
      button-text="Delete"
      @confirm="deleteComment()"
      @close="deleteModal = false" />
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import ConfirmModal from '../common/ConfirmModal'


export default {
  components: {
    ConfirmModal
  },

  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      comment: '',
      deleteModal: false,
      deleteId: null,
      deletePostId: null,
      editModal: false, 
      editId: null,
      editComment: '',
    }
  },

  computed: {
    comments () {
      return this.$store.getters['commentsModule/comments'](this.post.id)
    },

    user () {
      return this.$store.getters['authModule/loggedUser']
    },
  },

  created () {
    this.loadComments()
  },

  methods: {
    async loadComments () {
      const loader = this.$loading.show()
      try {
        await this.$store.dispatch('commentsModule/getCommentsByPost', this.post.id)
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },

    async saveComment () {
      this.$v.$touch()

      if (this.$v.comment.$invalid) {
          return
      }

      const payload = {
        userId: this.post.userId, 
        authorId: this.user.id, 
        postId: this.post.id, 
        author: this.user.email, 
        comment: this.comment
      }
      const loader = this.$loading.show()
      try {
        await this.$store.dispatch('commentsModule/createComment', payload)
        this.comment = ''
        this.$v.$reset();
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },

    async deleteComment () {
      const loader = this.$loading.show()
      try {
        await this.$store.dispatch('commentsModule/deleteComment', {
          id: this.deleteId,
          postId: this.deletePostId
        })
        this.deleteModal = false
        this.deleteId = null
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },

    async updateComment () {
      this.$v.$touch()

      if (this.$v.editComment.$invalid) {
          return
      }
      
      const payload = {
        id: this.editId,
        userId: this.post.userId, 
        authorId: this.user.id, 
        postId: this.post.id,
        author: this.user.email, 
        comment: this.editComment
      }
      const loader = this.$loading.show()
      try {
        await this.$store.dispatch('commentsModule/editComment', payload)
        this.editComment = ''
        this.editModal = false
        this.editId = null
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },

    deleteCommentModal (id, postId) {
      this.deleteModal = true
      this.deleteId = id
      this.deletePostId = postId
    },

    editCommentModal (id, comment) {
      this.editModal = true
      this.editId = id
      this.editComment = comment
    },
  },

  validations: {
    comment: { required },
    editComment: { required },
  }
}
</script>

<style>

</style>