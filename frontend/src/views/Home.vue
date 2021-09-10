<template>
  <div id="page-container">
    <MainHeader/>
    <div id="postsList-container">
      <div id="postsList">
        <div v-for="post in posts" :key="post.id" id="post-container">
          <div id="top-line">
            <div id="user-infos">
              <img v-bind:src="post.User.profilePicture">
              <div>
                <p id="name">{{post.User.firstname}} {{post.User.lastname}} • {{post.User.departmenta}}</p>
                <p id="date">Mis à jour: {{post.updatedAt}}</p>
              </div>
            </div>
            <div v-if="post.User.isAdmin === true || post.User.id == currentUserId" id="post-options">
              <button>
                <img src="../assets/edit.png">
              </button>
              <button v-on:click="deletePost(post.id)">
                x
              </button>
            </div>
          </div>
          <h2>{{post.title}}</h2>
          <figure id="postsList-img">
            <img :src="post.media">
          </figure>
          <div id="bottom-line">
            <button id="likes" class="bottom-line_btn">
              <img src="../assets/likes.png">
              <p id="likes-nb" class="bottom-line_btn_text">{{post.likes}} likes</p>
            </button>
            <button id="dislikes" class="bottom-line_btn">
              <img src="../assets/dislikes.png">
              <p id="dislikes-nb" class="bottom-line_btn_text">{{post.dislikes}} dislikes</p>
            </button>
            <button id="comments" class="bottom-line_btn">
              <img src="../assets/comments.png">
              <p class="bottom-line_btn_text">Commentaires...</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue"

export default {
  name: 'Home',
  components: {
    MainHeader
  },
  data() {
    return {
      posts: [],
      token: '',
      currentUserId: ''
    }
  },
  methods: {
    getPosts() {
      const userId = JSON.parse(localStorage.getItem('userId'));
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
        this.posts = data,
        this.currentUserId = userId
      })
      .catch(error => {
        console.log(error)
      });

    },
    deletePost(id) {
      if (confirm("Êtes-vous sûr(e) de vouloir supprimer ce post ?")) {
        fetch('http://localhost:3000/api/posts/' + id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`}
        })
        .then(res => {
          console.log(res)
          this.$router.go()
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  },
  beforeMount() {
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
    & #postsList-img {
      background-color: #F0F2F4;
      border-top: 1px rgb(216, 215, 215) solid;
      border-bottom: 1px rgb(216, 215, 215) solid;
      margin: 0;
    }
  }
}

#post-container {
  background-color: white;
  border-radius: 10px;
  border: 1px rgb(221, 217, 217) solid;
  margin-bottom: 20px;
  & h2 {
    font-size: 18px;
    padding: 10px 20px;
  }
  & img {
    object-fit: contain;
    width: 100%;
    height: 400px;
  }
}

#top-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  & #user-infos {
    display: flex;
    align-items: center;
    & img {
      height: 50px;
      width: 50px;
      margin-right: 20px;
    }
    & #name {
      margin: 0;
    }
    & #date {
      margin: 5px 0 0 0;
      font-size: 13px;
      color: grey;
    }
  }
  & #post-options {
    display: flex;
    gap: 10px;
    & button {
      background-color: white;
      border: 1px rgb(177, 177, 177) solid;
      border-radius: 5px;
      cursor: pointer;
      width: 25px;
      height: 25px;
      & img {
        height: 100%;
      }
      &:hover {
        background-color: #F0F2F4;
        color: #EC3732;
      }
    }
  }
}

#bottom-line {
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
  & .bottom-line_btn {
    display: flex;
    background-color: white;
    border: none;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    &:hover {
      background-color: #F0F2F4;
    }
    & img {
      margin-right: 10px;
      height: 30px;
      width: 30px;
    }
  }
  & #likes {
    width: 25%;
  }
  & #dislikes {
    width: 25%
  }
  & #comments {
    width: 40%;
  }
}

@media screen and (max-width: 992px) {
  #bottom-line {
    & #likes {
      width: 33%;
    }
    & #dislikes {
      width: 33%;
    }
    & #comments {
      width: 33%;
    }
    & .bottom-line_btn {
      display: flex;
      justify-content: center;
      margin: 0;
      & .bottom-line_btn_text {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #postsList-container {
    #postsList {
      width: 100%;
    }
  }
}
</style>