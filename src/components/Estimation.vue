<template>
  <div class="estimation">
    <h1>{{ msg }}</h1>
    <ul v-if="$root.users.length > 0" class="estimates">
      <li v-for="user in $root.users" v-bind:key="user.id" v-bind="{ 'value': user.showEstimate }" v-bind:class="{ 'max': (user.rank > 0), 'min': (user.rank < 0) }">
        <span>{{ user.name }}</span>
        <span>{{ $root.getEstimationValue(user.showEstimate).value }}</span>
      </li>
    </ul>

    <ul class="estimate">
      <li v-if="$root.estimation >= 0">
        <span>{{ avg }}</span>
        <span>{{ $root.estimation }}</span>
      </li>
      <li v-else-if="$root.estimation === -6" v-on:click="$root.resetEstimation()">
        <span>↻</span>
        <span>{{ redo }}</span>
      </li>
      <li v-else><span>{{ avg }}</span>
        <span>⏳</span>
      </li>
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
      msg: 'Estimation',
      avg: 'Average',
      redo: 'Re-Estimate'
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
  padding: 0.75rem 1rem;
  text-align: center;
  text-decoration: none;
  float: left;
  font-size: 1rem;
  line-height: 2rem;
  border-radius: 8px;
  margin: 0.5rem;
  box-shadow: 4px 8px 6px #aaa;
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
