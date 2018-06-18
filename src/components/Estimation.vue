<template>
  <div class="estimation">
    <h1>{{ msg }}</h1>
    <ul v-if="$root.users.length > 0" class="estimates">
      <li v-for="user in $root.users" v-bind:key="user.id" v-bind="{ 'value': user.showEstimate }" v-bind:class="{ 'max': (user.rank > 0), 'min': (user.rank < 0) }">
        <span>{{ $root.getEstimationValue(user.showEstimate).value }}</span>
        <span>{{ user.name }}</span>
      </li>
    </ul>

    <span>Average Estimation</span>
    <ul class="estimate">
      <li v-if="$root.estimation >= 0">{{ $root.estimation }}</li>
      <li v-else-if="$root.estimation === -6">↻</li>
      <li v-else>⏳</li>
    </ul>

    <ul v-if="$root.estimationValues.length" class="cards">
      <li v-for="estimateValue in $root.estimationValues" v-bind:key="estimateValue.key"  v-if="estimateValue.show == true" v-on:click="$root.setEstimation(estimateValue.key)"><span>{{ estimateValue.value }}</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Estimation',
  data () {
    return {
      msg: 'Estimation'
    }
  },
  mounted () {
    if (this.$root.hasUserAndSession() === true) {
      this.$root.getUsers()
    } else {
      this.$router.push('/')
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
  padding: 0.5rem;
}

.estimation ul li {
  display: grid;
  border: none;
  color: #000;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  float: left;
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: 8px;
  margin: 0.5rem;
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
  background-color: #777;
  color:#fff;
  cursor: pointer;
}

ul.estimates li.max,
ul.estimates li.min {
  font-weight: bold;
  background-color:#fff;
  border: 2px red solid;
}

</style>
