<template>
  <div v-if="card.show" @click="doEstimate(card)">
    <card :card="card" :id="id" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['card', 'id'],
  components: {
    'card': require('components/Poker/Card.vue').default
  },
  methods: {
    doEstimate: function (card) {
      this.estimate(card)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    ...mapActions('poker', ['estimate'])
  }
}
</script>

<style>

</style>
