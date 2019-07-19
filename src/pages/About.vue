<template>
  <q-page class="q-ma-md">
    <h5>{{ aboutTitle }}</h5>
    <p v-for="(aboutText, key) in aboutTexts" :key="key" v-html="aboutText"></p>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'About',
  computed: {
    ...mapGetters('poker', ['aboutTitle', 'aboutTexts'])
  }
}
</script>

<style>
</style>
