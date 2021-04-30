<template>
  <modal-wrapper>
    <div class="w-96 py-4 bg-white border border-green-500 rounded-lg flex justify-center items-center flex-col">
      <h3 class="text-green-500 text-2xl">{{ text }}</h3>
      <div class="p-3 w-5/6">
        <slot />
      </div>
      <div class="w-4/6 flex justify-center items-center mt-10">
        <button @click="$emit('confirm')" class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-1 px-6 rounded-full mr-5 mb-3">
          {{ buttonText }}
        </button>
        <button @click="$emit('close')" class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-1 px-6 rounded-full mb-3">
          Cancel
        </button>
      </div>
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from './ModalWrapper'

export default {
  components: {
    ModalWrapper
  },

  props: {
    text: {
      type: String,
      default: 'Are you sure?'
    },

    buttonText: {
      type: String,
      default: 'Confirm'
    }
  },
}
</script>