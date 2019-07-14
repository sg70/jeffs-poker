<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions('poker', ['initState'])
  },
  mounted: function () {
    this.initState()
  }
}
</script>

<style>
</style>
