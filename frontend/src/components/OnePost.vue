<template>

  <div id="post-container">
      <!-- POST TOP -->
      <div id="post-container_top">
          <div id="user-infos">
              <img v-bind:src="post.User.profilePicture">
              <div>
                  <p id="name">{{post.User.firstname}} {{post.User.lastname}} • {{post.User.department}}</p>
                  <p id="date">{{post.createdAt}}</p>
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
      <!-- POST CONTENT -->
      <h2>{{post.title}}</h2>
      <figure id="postsList-img">
          <img :src="post.media">
      </figure>
      <!-- POST BOTTOM -->
      <div id="bottom-line">
          <button id="likes" class="bottom-line_btn" @click="likePost">
              <img src="../assets/likes.png">
              <p id="likes-nb" class="bottom-line_btn_text">{{post.likes}} likes</p>
          </button>
          <button id="dislikes" class="bottom-line_btn">
              <img src="../assets/dislikes.png">
              <p id="dislikes-nb" class="bottom-line_btn_text">{{post.dislikes}} dislikes</p>
          </button>
          <router-link :to="{name: 'post', params: {id: post.id}}">
            <button id="comments" class="bottom-line_btn">
                <img src="../assets/comments.png">
                <p class="bottom-line_btn_text">Commentaires...</p>
            </button>
          </router-link>
      </div>
  </div>
</template>

<script>

export default ({
  name: 'OnePost',
  props: ['post'],
  data() {
      return {
          currentUserId: JSON.parse(localStorage.getItem('userId')),
          token: ''
      }
  },
  methods: {
    deletePost(id) {
      this.token = localStorage.getItem('userToken');
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
    },
    likePost() {
      this.token = localStorage.getItem('userToken');
      fetch(`http://localhost:3000/api/posts/${this.post.id}/like`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(res => {
        console.log(res)
        this.$router.go()
      })
      .catch(error => {
        alert('Action impossible !')
        console.log(error)
      })
    }
  }
})
</script>

<style lang="scss" scoped>

#post-container {
  background-color: white;
  border: 1px rgb(221, 217, 217) solid;
  box-shadow: 2px 2px 10px rgb(187, 186, 186);
  margin-bottom: 40px;
  & h2 {
    font-size: 18px;
    padding: 10px 20px;
  }
  & img {
    object-fit: contain;
    width: 100%;
    height: 400px;
  }
  & figure {
  background-color: #F0F2F4;
  border-top: 1px rgb(216, 215, 215) solid;
  border-bottom: 1px rgb(216, 215, 215) solid;
  margin: 0;
}
  &_top {
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
  #main-container {
    width: 100%;
  }
}
</style>