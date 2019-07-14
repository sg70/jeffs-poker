<template>
  <q-page class="q-ma-md column">
    <div class="text-h5">{{ inviteTitle }}</div>
    <a :href="inviteUrl" target="_blank" class="q-my-md">
    <q-r-code :text="inviteUrl" />
    </a>
    <p v-html="inviteText"></p>
    <q-btn color="primary" :label="startGameBtnLabel" to="/" />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import QRCode from 'vue-qrcode-component'

export default {
  name: 'Invite',
  components: {
    QRCode
  },
  computed: {
    inviteUrl: function () {
      const a = document.createElement('a')
      a.href = this.$router.resolve('/join/' + this.sessionId).href
      return a.href
    },
    ...mapGetters('poker', ['inviteTitle', 'inviteText', 'sessionId', 'startGameBtnLabel'])
  }
}
</script>

<style>
p { font-size: 1.2rem; }
</style>
