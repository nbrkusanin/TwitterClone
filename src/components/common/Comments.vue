<template>
  <div class="border-t border-gray-200 p-3 mt-4">
    <div v-if="user" class="flex justify-start">
       <input v-model="comment" type="text" class="w-full shadow-inner h-9 pl-4 border border-gray-100 border-r-0 focus:outline-none" placeholder="Write comment...">
       <button @click="saveComment()" class="bg-green-500 border hover:bg-white hover:text-green-500 hover:border-green-500 text-white focus:outline-none font-bold h-9 px-4 rounded outline-none" type="button">
          Comment
        </button>
    </div>
    <p class="text-red-500" v-if="commentError !== ''">{{ commentError }}</p>
    <div v-for="comment in comments" :key="comment.id" class="mt-3">
      <router-link :to="{ path: `profile/${comment.authorId}`}" class="text-green-400 text-sm hover:underline">{{ comment.author }}</router-link>
      <p class="text-xs text-gray-400">{{comment.comment}}</p>
      <div v-if="user" class="w-full flex justify-start mt-1">
        <svg v-if="user.id === comment.authorId" @click="editCommentModal(comment.id, comment.comment)"  class="fill-red w-4 h-4 mr-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 64 64" id="Layer_1" version="1.1" viewBox="0 0 64 64" xml:space="preserve"><g><path d="M55.736,13.636l-4.368-4.362c-0.451-0.451-1.044-0.677-1.636-0.677c-0.592,0-1.184,0.225-1.635,0.676l-3.494,3.484   l7.639,7.626l3.494-3.483C56.639,15.998,56.639,14.535,55.736,13.636z"/><polygon points="21.922,35.396 29.562,43.023 50.607,22.017 42.967,14.39  "/><polygon points="20.273,37.028 18.642,46.28 27.913,44.654  "/><path d="M41.393,50.403H12.587V21.597h20.329l5.01-5H10.82c-1.779,0-3.234,1.455-3.234,3.234v32.339   c0,1.779,1.455,3.234,3.234,3.234h32.339c1.779,0,3.234-1.455,3.234-3.234V29.049l-5,4.991V50.403z"/></g></svg>
        <svg v-if="user.id === comment.authorId || user.id === comment.userId" @click="deleteCommentModal(comment.id)" class="fill-gray w-4 h-4 mr-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
      </div>
    </div>
    <modal-wrapper v-if="deleteModal">
      <div class="w-96 h-56 bg-white border border-green-500 rounded-lg flex justify-center items-center flex-col">
        <h3 class="text-green-500 text-2xl">Are you sure?</h3>
        <div class="w-4/6 flex justify-center items-center mt-10">
          <button @click="deleteComment()" class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-1 px-6 rounded-full mr-5 mb-3">
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
          <textarea v-model="editComment" class="w-full shadow-inner p-4 border border-gray-100 focus:outline-none resize-none" placeholder="Write Post" rows="4" ></textarea>
          <p class="text-red-500" v-if="editCommentError !== ''">{{ editCommentError }}</p>
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

export default {
  components: {
    ModalWrapper
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
      commentError: '',
      deleteModal: false,
      deleteId: null,
      editModal: false, 
      editId: null,
      editComment: '',
      editCommentError: ''
    }
  },

  computed: {
    comments () {
      return this.$store.getters['commentsModule/comments']
    },

    user () {
      return this.$store.getters['authModule/loggedUser']
    },
  },

  mounted () {
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
      if(this.comment !== '') {
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
          this.commentError = ''
        } catch (e) {
          console.log(e)
        } finally {
          loader.hide()
        }
      } else {
        if (this.comment === '') {
          this.commentError = 'Please add comment first.'
        }
      }
    },

    async deleteComment () {
      const loader = this.$loading.show()
      try {
        await this.$store.dispatch('commentsModule/deleteComment', this.deleteId)
        this.deleteModal = false
        this.deleteId = null
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },

    async editPost () {
      if(this.editComment !== '') {
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
      } else {
        if (this.editComment === '') {
          this.editTitleError = 'Please add comment first.'
        }
      }
    },

    deleteCommentModal (id) {
      this.deleteModal = true
      this.deleteId = id
    },

    editCommentModal (id, comment) {
      this.editModal = true
      this.editId = id
      this.editComment = comment
    },
  }
}
</script>

<style>

</style>