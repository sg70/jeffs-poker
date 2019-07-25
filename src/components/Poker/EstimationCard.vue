<template>
  <div v-if="card.show" @click="doEstimate(card)">
    <card :card="card" :id="id" :textColor="textColor" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['card', 'id'],
  components: {
    'card': require('components/Poker/Card.vue').default
  },
  computed: {
    textColor: function () {
      return (this.chickenMode) ? 'text-grey-5' : 'text-black'
    },
    ...mapGetters('poker', ['chickenMode'])
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
