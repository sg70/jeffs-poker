<template>
  <q-page v-if="hasSession === true" class="q-pa-md column">
    <q-list class="row">
      <card v-for="(name, key) in names" :key="key" :card="name" :id="key"/>
    </q-list>
    <q-space />
    <q-list class="row">
      <card color="bg-blue-3" :card="{'name': estimationLabel, 'label': estimationValueLabel, 'value': estimation}" :id="estimationLabel" />
      <q-separator vertical inset />
      <q-btn push stack glossy icon-right="mdi-replay" color="accent" :label="reEstimateLabel" @click="resetEstimation" class="q-ma-md q-pa-md" />
    </q-list>
    <q-space />
    <q-list class="row">
      <estimation-card v-for="(value, key) in values" :key="key" :card="value" :id="key" />
    </q-list>
  </q-page>
  <q-page v-else class="q-pa-md column">
     <name />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Poker',
  computed: {
    ...mapGetters('poker', ['hasSession', 'names', 'estimationLabel', 'estimation', 'values', 'name', 'estimationValueLabel', 'reEstimateLabel'])
  },
  components: {
    'card': require('components/Poker/Card.vue').default,
    'estimation-card': require('components/Poker/EstimationCard.vue').default,
    'name': require('components/Poker/Name.vue').default
  },
  methods: {
    ...mapActions('poker', ['resetEstimation'])
  }
}
</script>

<style>
</style>
