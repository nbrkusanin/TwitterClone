<template>
  <div class="flex justify-start">
    <div class="w-1/4">
      <page-left-section />
    </div>
    <div class="w-1/2 border border-t-0 border-b-0 border-green-200 center-section">
      <div class="border-b border-green-200 p-3">
        <h3 class="text-gray-400 text-2xl">Home</h3>
      </div>

      <posts-form v-if="user" :user="user"/>

      <div>
        <post v-for="(post, i) in posts" :key="post.id" :post="post" :index="i" :user="user"/>
      </div>
    </div>

    
  </div>
</template>

<script>
import Post from '../common/Post'
import PostsForm from '../common/PostsForm'
import PageLeftSection from '../common/PageLeftSection'


export default {
  components: {
    PageLeftSection,
    Post,
    PostsForm
  },

  computed: {
    posts () {
      return this.$store.getters['postsModule/posts']
    },

    user () {
      return this.$store.getters['authModule/loggedUser']
    },
  },

  created () {
    this.loadPosts()
  },

  methods: {
    async loadPosts () {
      const loader = this.$loading.show()
      try {
        await this.$store.dispatch('postsModule/getPosts')
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },
  }
}
</script>