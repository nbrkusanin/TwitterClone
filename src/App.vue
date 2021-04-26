<template>
  <div id="app">
    <navigation />
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from './components/common/Navigation'

export default {
  components: {
    Navigation
  }
}
</script>

