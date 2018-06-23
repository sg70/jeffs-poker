<template>
  <div class="estimation">
    <ul v-if="users.length > 0" class="estimates">
      <li v-for="user in users" v-bind:key="user.id" v-bind="{ 'value': user.showEstimate }" v-bind:class="{ 'max': (user.rank > 0), 'min': (user.rank < 0) }">
        <span>{{ user.name }}</span>
        <span>{{ getEstimationValue(user.showEstimate).value }}</span>
      </li>
    </ul>

    <ul class="estimate">
      <li v-if="estimation >= 0">
        <span>{{ avg }}</span>
        <span>{{ estimation }}</span>
      </li>
      <li v-else-if="estimation === -6" v-on:click="resetEstimation()">
        <span>↻</span>
        <span>{{ redo }}</span>
      </li>
      <li v-else><span>{{ avg }}</span>
        <span>⏳</span>
      </li>
    </ul>

    <ul v-if="estimationValues.length" class="cards">
      <li v-for="estimateValue in estimationValues" v-bind:key="estimateValue.key"  v-if="estimateValue.show == true" v-on:click="setEstimation(estimateValue.key)"><span>{{ estimateValue.value }}</span></li>
    </ul>
  </div>
</template>

<script>
import Poker from '../stores/poker'

export default {
  name: 'Estimation',
  data () {
    return {
      poker: Poker.data,
      avg: 'Average',
      redo: 'Re-Estimate',
      // users in session
      users: [],
      // average estimation
      estimation: -4,
      // possible estimation values
      estimationSteps: 15,
      estimationValues: [
        { value: '0', key: 0, show: true }, // initial fibonacci value
        { value: '∞', key: -1, show: true }, // infinity
        { value: '?', key: -2, show: true }, // unsure
        { value: '☕', key: -3, show: true }, // break
        { value: '⏳', key: -4, show: false }, // waiting for user
        { value: '⌛', key: -5, show: false } // user done
      ]
    }
  },
  mounted () {
    if (Poker.methods.hasUserAndSession() === true) {
      this.getUsers()
      this.initEstimationValues(this.estimationSteps)
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    initEstimationValues: function (steps) {
      for (var i = 1; i < steps; i++) {
        var fibonacci = this.fibonacci(i)
        this.estimationValues.splice(i, 0, { value: fibonacci, key: fibonacci, show: true })
      }
    },
    fibonacci: function (n) {
      if (n <= 1) return 1
      return this.fibonacci(n - 1) + this.fibonacci(n - 2)
    },
    getEstimationValue: function (key) {
      return this.estimationValues.find(o => o.key === key)
    },
    setEstimation: function (value) {
      var userRef = Poker.methods.getSessionCollection(this.$root.db).doc(this.poker.code).collection('users').doc(this.poker.user)
      userRef.update({estimate: value})
    },
    getUsers: function () {
      this.users = []
      Poker.methods.getSessionCollection(this.$root.db).doc(this.poker.code).collection('users').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'removed') {
            this.users = this.users.filter(o => o.id !== change.doc.id)
          } else {
            var userData = change.doc.data()
            if (userData.estimate > -4) {
              userData.showEstimate = -5
            } else if (userData.estimate === -4) {
              userData.showEstimate = -4
            }
            var user = this.users.find(o => o.id === change.doc.id)
            if (user) {
              user.name = userData.name
              user.rank = userData.rank
              user.estimate = userData.estimate
              user.showEstimate = userData.showEstimate
              if (user.id === this.poker.user) {
                user.showEstimate = user.estimate
              }
            } else {
              userData.id = change.doc.id
              this.users.push(userData)
            }
          }
        })
        this.updateEstimations()
      })
    },
    updateEstimations: function () {
      var user = this.users.find(o => o.estimate === -4)
      if (user === undefined) {
        var numEstimations = 0
        var sumEstimations = 0
        var estimatedValues = []
        var steps = 0
        var countSteps = false
        var seenSteps = 0

        this.estimationValues.filter(v => v.key >= 0).forEach(v => {
          if (countSteps === true) {
            steps++
          }
          var count = this.users.filter(u => u.estimate === v.key).length
          if (count > 0) {
            countSteps = true
            numEstimations += count
            sumEstimations += (v.key * count)
            estimatedValues.push(v.key)
            seenSteps = steps
          }
        })

        this.users.forEach(user => {
          user.showEstimate = user.estimate
          if (estimatedValues.length > 1) {
            if (user.estimate === estimatedValues[0]) {
              user.rank = -1
            } else if (user.estimate === estimatedValues[estimatedValues.length - 1]) {
              user.rank = 1
            }
          }
        })

        if (seenSteps < 3) {
          this.estimation = Math.round(sumEstimations / numEstimations)
        } else {
          this.estimation = -6
        }
      } else {
        this.estimation = -4
      }
    },
    resetEstimation: function () {
      return Poker.methods.resetEstimation(this.$root.db)
    }
  }
}
</script>

<style>

div.estimation {
  text-align: center;
  display: block;
  width: 100%;
}

.estimation ul {
  list-style: none;
  display: inline-block;
  margin: 0;
  width: 100%;
  padding: 0.5rem 0rem;
}

.estimation ul li {
  display: grid;
  border: none;
  color: #000;
  padding: 0.75rem 1rem;
  text-align: center;
  text-decoration: none;
  float: left;
  font-size: 1rem;
  line-height: 2rem;
  border-radius: 8px;
  margin: 0.5rem;
  box-shadow: 4px 8px 6px #aaa;
  min-width: 1.25rem;
}

ul.estimates li {
  background-color: #ccc;
}

ul.cards li {
  background-color: #007aff;
  color: #fff;
  cursor: pointer;
}

ul.estimate li {
  background-color: #ff007a;
  color:#fff;
  cursor: pointer;
}

ul.estimates li.max,
ul.estimates li.min {
  font-weight: bold;
  background-color:#ff8500;
  border: 2px #000 solid;
}

</style>
