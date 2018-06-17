<template>
  <div class="start">
    <h1>{{ msg }}</h1>
    <input type="text" name="name" placeholder="Enter Name" v-model="$root.name" v-on:keyup.enter="toInvite">
    <p v-if="errors.length">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
    </p>
    <div class="selection">
      <button v-if="sessionExists" v-on:click="reJoin" :disabled="clicked">{{ rejoin }}</button>
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
      rejoin: 'Rejoin Session',
      host: 'Host Session',
      errors: [],
      clicked: false,
      sessionExists: false
    }
  },
  mounted () {
    this.checkSession()
  },
  methods: {
    checkName: function () {
      if (this.$root.hasUsername()) {
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
    },
    reJoin: function (event) {
      this.$router.push('/estimation')
    },
    checkSession: function () {
      this.sessionExists = false
      if (this.$root.hasUserIdAndSession()) {
        this.$root.validateCode(this.$root.code).then(valid => {
          if (valid === true) {
            this.$root.userExists().then(exists => {
              if (exists === true) {
                this.sessionExists = true
              } else {
                this.$root.clearUserIdAndSession()
              }
            })
          } else {
            this.$root.clearUserIdAndSession()
          }
        }).catch(error => {
          console.error(error)
          this.$root.clearUserIdAndSession()
        })
      } else {
        this.$root.clearUserIdAndSession()
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
