<template>
<div>
  <router-view :key="$route.fullPath"/>
  <footer>
    {{ copyright }}
  </footer>
</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "App",
  computed: {
    ...mapGetters({
      copyright: "copyright"
    })
  }
}
</script>

<style>
* {
  font-family: 'Arial';
}

footer {
  background-color: rgb(49, 48, 48);
  color: white;
  font-size: 13px;
  padding: 20px;
}
</style>
