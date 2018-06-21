<template>
  <div class="start">
    <h1>{{ msg }}</h1>
    <input type="text" name="name" placeholder="Enter Name" v-model="poker.name" v-on:keyup.enter="toInvite">
    <ul v-if="errors.length">
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>
    <button v-on:click="toInvite" :disabled="clicked">{{ host }}</button>
    <button v-if="sessionExists" v-on:click="reJoin" :disabled="clicked">{{ rejoin }}</button>
  </div>
</template>

<script>
import Poker from '../stores/poker'

export default {
  name: 'Start',
  data () {
    return {
      poker: Poker.data,
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
      if (Poker.methods.hasUsername()) {
        return true
      } else {
        this.errors.push('Please provide a name.')
        this.clicked = false
        return false
      }
    },
    getCode: function () {
      return new Promise((resolve, reject) => {
        Poker.methods.getSessionCollection(this.$root.db).add({
          created: this.$root.firebase.firestore.FieldValue.serverTimestamp()
        }).then(docRef => {
          this.poker.code = docRef.id
          resolve(true)
        }).catch(error => {
          reject(error)
        })
      })
    },
    userExists: function () {
      return new Promise((resolve, reject) => {
        Poker.methods.getSessionCollection(this.$root.db).doc(this.poker.code).collection('users').doc(this.poker.user).get().then(user => {
          resolve(user.exists)
        }).catch(error => {
          reject(error)
        })
      })
    },
    clearUserIdAndSession: function () {
      this.poker.user = ''
      this.poker.code = ''
    },
    toInvite: function (event) {
      if (this.clicked === false) {
        this.clicked = true
        this.errors = []
        if (this.checkName()) {
          this.poker.isHost = true
          this.getCode().then(gotCode => {
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
      if (Poker.methods.hasUserIdAndSession()) {
        Poker.methods.validateCode(this.$root.db, this.poker.code).then(valid => {
          if (valid === true) {
            this.userExists(this.$root.db).then(exists => {
              if (exists === true) {
                this.sessionExists = true
              } else {
                this.clearUserIdAndSession()
              }
            })
          } else {
            this.clearUserIdAndSession()
          }
        }).catch(error => {
          console.error(error)
          this.clearUserIdAndSession()
        })
      } else {
        this.clearUserIdAndSession()
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
