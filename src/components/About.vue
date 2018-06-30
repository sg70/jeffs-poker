<template>
    <div class="about">
        <h1>About</h1>
        <p>This web app is inspired by <a href="https://www.scrumguides.org/jeff.html" target="_blank">Jeff Sutherland</a> (co-creator of Scrum), his book <a href="https://www.scruminc.com/new-scrum-the-book/" target="_blank">"Scrum: The Art of Doing Twice The Work In Half the Time"</a> and his article about estimation: <a href="https://www.scruminc.com/why-do-we-use-fibonacci-numbers-to-estimate-user-stories/" target="_blank">"Why Do We Use Fibonacci Numbers to Estimate User Stories?"</a></p>
        <p>User story estimation with Planning Poker is based on the Delphi technique, to avoid anchoring biases such as the halo effect or bandwagon effect  or just plain stupid groupthink.</p>
        <p>Use the average of the estimates if the estimates are not more than two levels apart. If people are more then three levels apart, them the persons with the highest and the lowest estimation say in 30 seconds why the estimated before re-estimate.</p>
    </div>
</template>

<script>
export default {
  name: 'About'
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
