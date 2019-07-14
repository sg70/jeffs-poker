<template>
  <q-item>
    <q-item-section class="elevated shadow-3 rounded-borders q-pa-md text-center" :class="backgroundClass">
      <q-item-label class="text-subtitle2">
        {{ card.name }}
      </q-item-label>
      <q-item-label class="text-h5">
        {{ card.label }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['card', 'id', 'color'],
  computed: {
    backgroundColor: function () {
      return (this.color) ? this.color : 'bg-info'
    },
    backgroundClass: function () {
      var bgColor = this.backgroundColor
      if (this.card.rank) {
        if (this.card.rank === 1) {
          bgColor = 'bg-amber-3'
        } else if (this.card.rank === -1) {
          bgColor = 'bg-deep-purple-3'
        }
      }
      return bgColor
    }
  }
}
</script>

<style>

</style>
