<template>
  <div class="start">
    <h1>{{ msg }}</h1>
    <input placeholder="Enter Name" v-model="$root.name">
    <p v-if="errors.length">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </p>
    <div class="selection">
      <button v-on:click="toInvite" :disabled="clicked">{{ host }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Start',
  data () {
    return {
      msg: 'Welcome to Planning Poker',
      join: 'Join Session',
      host: 'Host Session',
      errors: [],
      clicked: false
    }
  },
  methods: {
    checkName: function () {
      if (this.$root.name !== '') {
        return true
      } else {
        this.errors.push('Please provide a name.')
        this.clicked = false
        return false
      }
    },
    toInvite: function (event) {
      if (this.clicked === false) {
        this.clicked = true
        this.errors = []
        if (this.checkName()) {
          this.$root.isHost = true
          this.$root.getCode().then(gotCode => {
            this.$router.push('/invite')
          }).catch(error => {
            this.errors.push('Error occured while getting code: ' + error)
            this.clicked = false
          })
        }
      }
    }
  }
}
</script>

<style scoped>

div.selection {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
