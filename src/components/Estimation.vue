<template>
    <div class="estimation">
        <h1>{{ msg }}</h1>
        <p v-if="$root.users.length > 0" class="estimates">
          <b>participant(s):</b><br />
          <ul>
            <li v-for="user in $root.users" v-bind:key="user.id" v-bind="{ 'value': user.showEstimate }" v-bind:class="{ 'max': (user.rank > 0), 'min': (user.rank < 0) }">
              <span>{{ $root.getEstimationValue(user.showEstimate).value }}</span>
              <span>{{ user.name }}</span>
            </li>
          </ul>
        </p>

        <p class="estimate">
          <b>estimation</b><br />
          <ul>
            <li v-if="$root.estimation >= 0">{{ $root.estimation }}</li>
            <li v-else>⏳</li>
          </ul>
        </p>

        <p v-if="$root.estimationValues.length" class="cards">
          <b>poker card(s):</b><br />
          <ul>
            <li v-for="estimateValue in $root.estimationValues" v-bind:key="estimateValue.key"  v-if="estimateValue.show == true" v-on:click="estimate(estimateValue.key)"><span>{{ estimateValue.value }}</span></li>
          </ul>
        </p>

        <p v-if="$root.isHost">
          <button v-on:click="toNext">{{ next }}</button>
        </p>
    </div>
</template>

<script>
export default {
  name: 'Estimation',
  data () {
    return {
      msg: 'Estimation',
      next: 'Next Estimation'
    }
  },
  mounted () {
    if (this.$root.code !== '' && this.$root.name !== '') {
      this.$root.getUsers()
    } else {
      console.log(this.$root.code)
      console.log(this.$root.name)
      this.$router.push('/')
    }
  },
  methods: {
    estimate: function (value) {
      this.$root.setEstimation(value)
    },
    toNext: function (event) {
      this.$root.resetEstimation()
    }
  }
}
</script>

<style>

.estimation ul {
  list-style: none;
  display: inline-block;
}

.estimation ul li {
  display: grid;
  float: left;
  border: none;
  color: black;
  padding: 16px 16px;
  text-align: center;
  text-decoration: none;
  float: left;
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: 8px;
  margin: 8px;
}

p.estimates ul li {
  background-color: lightskyblue;
}

p.cards ul li {
  background-color: lightcoral;
  padding: 16px;
  cursor: pointer;
}

p.estimate ul li {
  background-color: darkblue;
  color: white;
  padding: 16px;
}

p.estimates ul li.max,
p.estimates ul li.min {
  font-weight: bold;
  background-color: azure;
  border: 2px red solid;
  }


</style>
