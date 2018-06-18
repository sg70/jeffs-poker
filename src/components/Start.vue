<template>
  <div class="start">
    <h1>{{ msg }}</h1>
    <input type="text" name="name" placeholder="Enter Name" v-model="$root.name" v-on:keyup.enter="toInvite">
    <ul v-if="errors.length">
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>
    <button v-if="sessionExists" v-on:click="reJoin" :disabled="clicked">{{ rejoin }}</button>
    <button v-on:click="toInvite" :disabled="clicked">{{ host }}</button>
  </div>
</template>

<script>
export default {
  name: 'Start',
  data () {
    return {
      msg: 'Jeff’s Planning Poker',
      rejoin: 'Rejoin Session',
      host: 'Start Session',
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

<style>
div.start {
  text-align: center;
}

div.start ul {
  list-style: none;
}

div.start ul li {
  text-align: left;
  margin: 1rem auto;
  width: 67%;
}


</style>
