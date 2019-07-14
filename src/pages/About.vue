<template>
  <q-page class="q-ma-md">
    <h4>{{ aboutTitle }}</h4>
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
p { font-size: 1.2rem; }
</style>
