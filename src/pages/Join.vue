<template>
  <q-page class="q-ma-md">
    <h5>{{ joinTitle }}</h5>
    <name :id=id />
    </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['id'],
  name: 'Join',
  computed: {
    ...mapGetters('poker', ['joinTitle'])
  },
  components: {
    'name': require('components/Poker/Name.vue').default
  }
}
</script>

<style>
</style>
