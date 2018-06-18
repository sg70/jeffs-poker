<template>
    <div class="invite">
        <h1>{{ msg }}</h1>
        <q-r-code v-bind:text="this.inviteUrl"></q-r-code>
        <p class="code"><a v-bind:href="this.inviteUrl" target="_blank">{{ inviteRef }}</a></p>
        <button v-on:click="toEstimation">{{ start }}</button>
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
    if (this.$root.hasSessionCode() === true) {
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
      inviteRef: 'Use your camera app or copy the url',
      inviteUrl: ''
    }
  },
  methods: {
    toEstimation: function (event) {
      this.$root.setUsername()
      this.$router.push('/estimation')
    }
  }
}
</script>

<style>
div.invite {
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

p.code {
  margin: 1rem auto;
}

p.code a {
  text-decoration: none;
  color: black;
}
</style>
