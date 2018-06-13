<template>
    <div class="invite">
        <h1>{{ msg }}</h1>

        <div class="start">
            <q-r-code v-bind:text="this.inviteUrl"></q-r-code>
            <p class="code">{{ this.$root.code }}</p>
            <button v-on:click="toEstimation">{{ start }}</button>
        </div>
    </div>
</template>

<script>
import QRCode from 'vue-qrcode-component'

export default {
  name: 'Invite',
  components: {
    QRCode
  },
  mounted () {
    if (this.$root.code !== '') {
      const a = document.createElement('a')
      a.href = this.$router.resolve('/join/' + this.$root.code).href
      this.inviteUrl = a.protocol + '//' + a.host + a.pathname + a.search + a.hash
    } else {
      this.$router.push('/')
    }
  },
  data () {
    return {
      msg: 'Invite players',
      start: 'Start game',
      inviteUrl: ''
    }
  },
  methods: {
    toEstimation: function (event) {
      this.$root.setUsername(this.$root.name)
      this.$router.push('/estimation')
    }
  }
}
</script>

<style scoped>

div.start {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p.code {
  font-size: 1.25rem;
}

</style>
