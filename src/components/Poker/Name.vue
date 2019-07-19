<template>
  <div>
    <q-input
      v-model="Name"
      autofocus
      :rules="[val => !!val || nameFieldError]"
      :label="nameFieldLabel" />
    <q-btn color="primary" :label="startGameBtnLabel" @click="startGame" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['id'],
  computed: {
    Name: {
      set (payload) {
        this.setName(payload)
      },
      get () {
        return this.name
      }
    },
    ...mapGetters('poker', ['name', 'nameFieldLabel', 'nameFieldError', 'startGameBtnLabel'])
  },
  methods: {
    startGame: function () {
      this.startSession(this.id)
      this.$router.push('/')
    },
    ...mapActions('poker', ['setName', 'startSession'])
  }
}
</script>

<style>
</style>
