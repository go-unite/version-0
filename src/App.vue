<script>
  import Navigation from './components/Navigation.vue'

  export default {
    components: {
      Navigation
    }
  }
</script>

<template>
  <Navigation />
  <router-view></router-view>
</template>

<style>
@import 'bulma/css/bulma-rtl.min.css';

.testApp {
  max-width: 80%;
  margin: 0 auto;
}
</style>