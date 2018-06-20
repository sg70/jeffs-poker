<template>
  <div id="app">
    <content>
      <router-view></router-view>
    </content>
    <footer class="tabbar">
      <ul>
        <li class="one"><router-link to="/">{{ title }}</router-link></li>
        <li v-if="$root.isHost" v-on:click="$root.resetEstimation()">{{ next }}</li>
        <li class="two"><router-link to="/about">{{ about }}</router-link></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Home',
      about: 'About',
      next: 'Next'
    }
  }
}
</script>

<style>
html,body {
  font-family: "SFNSText", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  text-rendering: optimizeLegibility;
  height: 100%;
  background-color: #eee;
  color:#000;
  font-size: 15px;
}
@media (min-width: 375px)  {
  html,body {
    font-size: 18px;
  }
}

@media (min-width: 600px)  {
  html,body {
    font-size: 24px;
  }
}

a {
    color: inherit;
    text-decoration: none;
  }

#app {
  flex: 1
}

.tabbar {
  position: fixed;
  z-index: 100;
  bottom: 0%;
  width: 100%;
  background: linear-gradient(#aaa, #ddd);
}

.tabbar ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}

.tabbar li {
  line-height: 1.5rem;
  padding: 0.75rem;
  cursor: pointer;
}

h1 {
  font-size: 1.5rem;
  font-weight: normal;
  width: 100%;
  text-align: center;
  line-height: 2rem;
}

input {
  font-size: 1.25rem;
  line-height: 2rem;
  border: 1px solid gray;
  margin: 2rem auto;
  width: 67%;
}


button {
  background-color: gray;
  border: none;
  color: white;
  padding: 16px;
  text-align: center;
  text-decoration: none;
  font-size: 1.5rem;
  line-height: 2rem;
  border-radius: 4px;
  margin: 1rem auto;
  box-shadow: 4px 8px 6px #aaa;
  width: 67%
}

button:hover {
  background-color: lightgray;
  color: black;
}

button:disabled {
  background-color: lightgray;
  color: black;
}

</style>
