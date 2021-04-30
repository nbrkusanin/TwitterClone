<template>
  <div class="w-full h-screen flex items-center justify-center auth-page">
    <form @submit.prevent class="w-full md:w-1/3 bg-white rounded-lg">
      <div class="flex font-bold justify-center items-center mt-6 border border-green-500  w-16 h-16 rounded-full mx-auto mb-3">
          <svg class="fill-green h-8 w-8 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
      </div>
      <h2 class="text-3xl text-center text-gray-700 mb-4">Register</h2>
      <div class="px-12 pb-10">
        <div class="w-full mb-5">
          <p class="text-red-500 text-center">{{ errorMessage }}</p>
          <div class="flex items-center">
            <input v-model="email" type='text' placeholder="Username" class="auth-input" />
          </div>
          <p v-if="$v.email.$dirty && !$v.email.required" class="text-red-500">Required</p>
          <p v-if="$v.email.$dirty && !$v.email.email" class="text-red-500">Not valid email address.</p>
        </div>
        <div class="w-full mb-4">
          <div class="flex items-center">
            <input v-model="password" type='password' placeholder="Password" class="auth-input" />
          </div>
          <p v-if="$v.password.$dirty && !$v.password.required" class="text-red-500">Required</p>
          <p v-if="$v.password.$dirty && !$v.password.minLength" class="text-red-500">Password must have at least {{ $v.password.$params.minLength.min }} characters.</p>
        </div>
        <button @click="register()" class="w-full py-2 rounded-full bg-green-500 text-gray-100  focus:outline-none">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },

  methods: {
    async register () {
      this.$v.$touch()

      if (this.$v.$invalid) {
          return
      }

      const loader = this.$loading.show()
      try {
        await this.$store.dispatch('authModule/register', {
          email: this.email,
          password: this.password
        })
        this.$router.replace({ path: '/' })
      } catch (e) {
        this.errorMessage = e.message
      } finally {
        loader.hide()
      }
    }
  },

  validations: {
    email: { required, email },
    password: { 
      required, 
      minLength: minLength(6) 
    }
  }
}
</script>