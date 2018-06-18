<template>
    <div class="join">
      <h1>{{ msg }}</h1>
      <input type="text" name="name" placeholder="Enter Name" v-model="$root.name" v-on:keyup.enter="toEstimation">
      <ul v-if="errors.length">
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <button v-on:click="toEstimation" :disabled="clicked">{{ enter }}</button>
    </div>
</template>

<script>
export default {
  name: 'Join',
  props: ['id'],
  data () {
    return {
      errors: [],
      msg: 'Join game',
      enter: 'Join',
      clicked: false
    }
  },
  methods: {
    toEstimation: function (event) {
      if (this.clicked === false) {
        this.clicked = true
        if (this.$root.hasUsername()) {
          this.$root.validateCode(this.id).then(valid => {
            this.errors = []
            if (valid) {
              this.$root.setUsername()
              this.$router.push('/estimation')
            } else {
              this.$router.push('/')
            }
          }).catch(error => {
            console.error('Error setUsername(): ' + error)
            this.errors.push(error)
            this.clicked = false
          })
        } else {
          this.errors.push('Please provide a name.')
          this.clicked = false
        }
      }
    }
  }
}
</script>

<style>
div.join {
  text-align: center;
}

div.join ul {
  list-style: none;
}

div.join ul li {
  text-align: left;
  margin: 1rem auto;
  width: 67%;
}
</style>
