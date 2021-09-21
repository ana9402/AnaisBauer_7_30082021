<template>
<div>
  <router-view :key="$route.fullPath"/>
  <footer>
    <div>{{ copyright }}</div>
    <div id="footer-links">
      <router-link to="/charter">Règlement du forum</router-link>
      <span id="delimiter">•</span>
      <a href="mailto:admin-forum@groupomania.com">Contacter l'admin</a>
    </div>
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

<style lang="scss" scoped>
* {
  font-family: 'Arial';
}

footer {
  display: flex;
  justify-content: space-between;
  background-color: rgb(49, 48, 48);
  color: white;
  font-size: 13px;
  padding: 20px;
  & #footer-links {
    display: flex;
    gap: 20px;
    & a {
      color: white;
    }
  }

}

@media screen and (max-width: 800px) {
  footer {
    flex-direction: column;
    gap: 20px;
    & #footer-links {
      flex-direction: column;
      gap: 10px;
      & #delimiter {
        display: none;
      }
    }
  }
}
</style>
