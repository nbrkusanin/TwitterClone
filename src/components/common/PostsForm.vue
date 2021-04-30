<template>
  <div class="border-b border-green-200">
    <input v-model="form.title" type="text" class="w-full shadow-inner p-4 border-0 focus:outline-none" placeholder="Title">
    <p v-if="$v.form.title.$dirty && !$v.form.title.required" class="text-red-500 mb-1 ml-2">Required</p>
    <textarea v-model="form.post" class="w-full shadow-inner p-4 border-0 focus:outline-none resize-none" placeholder="Write Post" rows="4" ></textarea>
    <p v-if="$v.form.post.$dirty && !$v.form.post.required" class="text-red-500 mb-1 ml-2">Required</p>
    <button @click="savePost()" class="bg-green-400 hover:bg-green-700 text-white font-bold py-1 px-6 rounded-full ml-3 mb-3">
      Post
    </button>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    user: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      form: {
        title: '',
        post: ''
      }, 
    }
  },

  methods: {
    async savePost () {
      this.$v.$touch()

      if (this.$v.$invalid) {
          return
      }
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
        this.$v.$reset();
      } catch (e) {
        console.log(e)
      } finally {
        loader.hide()
      }
    },
  },

  validations: {
    form: {
      title: { required },
      post: { required }
    }
  }

}
</script>

<style>

</style>