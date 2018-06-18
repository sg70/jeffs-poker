<template>
    <div class="about">
        <h1>{{ msg }}</h1>
        <p>This web app is inspired by <a href="https://www.scrumguides.org/jeff.html" target="_blank">Jeff&nbsp;Sutherland</a> (co-creator of Scrum) and his article about estimation: <a href="https://www.scruminc.com/why-do-we-use-fibonacci-numbers-to-estimate-user-stories/" target="_blank">"Why Do We Use Fibonacci Numbers to Estimate User Stories?"</a></p>
        <p>This user story estimation is based on the Delphi technique.</p>
        <p>Use the average of the estimates are not more than two levels apart. The persons with the highest and the lowest estimation say in 30 seconds why the estimated before re-estimate.</p>
    </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'About'
    }
  }
}
</script>

<style>
div.about {
  align-items: center;
}
div.about p {
  width: 80%;
  margin: 1.25rem auto;
  line-height: 1.5rem;
  font-size: 1rem;
}

div.about p a {
  text-decoration-line: underline;
}

</style>
