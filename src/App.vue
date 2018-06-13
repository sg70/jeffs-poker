<template>
  <div id="app">
    <header>
      <span><router-link to="/help">{{ help }}</router-link></span>
      <span><router-link to="/">{{ title }}</router-link></span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: '⌂ Planning Poker',
      help: '? Help'
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 48px;
  padding: 0 8px 0 16px;
  background-color: lightgray;
  color: black;
}

header span {
  display: block;
  float: left;
  position: relative;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

header a {
  color: black;
  text-decoration: none;
  padding-right: 32px;
}

button {
  background-color: gray;
  border: none;
  color: white;
  padding: 16px;
  text-align: center;
  text-decoration: none;
  display: block;
  float: left;
  font-size: 1.25rem;
  border-radius: 4px;
  margin: 8px;
}

button:hover {
  background-color: lightgray;
  color: black;
}

button:disabled {
  background-color: lightgray;
  color: black;
}

input {
  font-size: 1rem;
  border: 1px solid gray;
  margin: 8px;
}

</style>
