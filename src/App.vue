<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('auth', ['getState']),
  },

  mounted () {
    // get user state
    this.getState()
  }
}
</script>
