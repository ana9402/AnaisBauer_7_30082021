<template>
  <div id="page-container">
    <MainHeader/>
    <div>
      <div id="content">
        <h1>Fil d'actualités</h1>
        <main id="postsList">
          <OnePost v-for="post in posts" :key="post.id" :post="post" :likesLength="post.Likes.length" :commentsLength="post.Comments.length"/>
          <div v-if="posts.length == 0">
            <p id="noPost-msg">Il n'y a aucun post à afficher pour le moment.</p>
          </div>
        </main>
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
  & h1 {
    margin-bottom: 50px;
  }
}

#content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0px;
  margin: auto;
  width: 100%;
  & #postsList {
    width: 100%;
    & #noPost-msg {
      display: flex;
      justify-content: center;
    }
  }
}

@media screen and (min-width: 800px) {
    #content {
        width: 80%;
    }
}

@media screen and (min-width: 1200px) {
    #content {
        width: 50%;
    }
}
</style>