<template>
  <div id="page-container">
    <MainHeader/>
    <div id="postsList-container">
      <div v-for="post in posts" :key="post.id" id="postsList">
        <OnePost :post="post"/>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue"
import OnePost from "../components/OnePost.vue"

export default {
  name: 'Home',
  components: {
    MainHeader,
    OnePost
  },
  data() {
    return {
      posts: [],
      token: ''
    }
  },
  methods: {
    getPosts() {
      this.token = localStorage.getItem('userToken');
      fetch('http://localhost:3000/api/posts', {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(result => {
        if (result.ok) {
          return result.json()
        }
      })
      .then(data => {
        this.posts = data
      })
      .then(() => {
        console.log(this.posts)
      })
      .catch(error => {
        console.log(error)
      });
    },
  },
  mounted() {
    this.getPosts()
  }
}
</script>

<style lang="scss" scoped>
#page-container {
  background-color: #F0F2F4;
}

#postsList-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0px;
  & #postsList {
    width: 50%;
  }
}
</style>