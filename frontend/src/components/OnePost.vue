<template>

  <div id="post-container">
    <!-- POST TOP -->
    <div id="post-container_top">
        <div id="user-infos">
            <img v-bind:src="post.User.profilePicture" alt="photo de profil de l'utilisateur">
            <div>
                  <p id="name">
                    <router-link :to="{name: 'userProfile', params: {id: post.User.id}}">
                      <span>{{post.User.firstname}} {{post.User.lastname}}</span>
                    </router-link>
                    • 
                    <span id="department">{{post.User.department}}</span></p>
                
                <time id="date">{{getDate(post.createdAt)}} à {{ getHour(post.createdAt) }}</time>
            </div>
        </div>
        <div v-if="post.User.id == currentUserId || userAdmin === true" id="post-options">
            <button @click="editionRedirection(post.id)" aria-label="Editer le post">
              <img src="../assets/edit.png" alt="icone d'édition du post">
            </button>
            <button v-on:click="deletePost(post.id)" aria-label="Supprimer le post">
                x
            </button>
        </div>
    </div>
    <!-- POST CONTENT -->
    <h2>{{post.title}}</h2>
    <figure id="postsList-img">
        <img :src="post.media" alt="image du post">
    </figure>
    <!-- POST BOTTOM -->
    <div id="bottom-line">
        <button id="likes" class="bottom-line_btn" @click="likePost">
          <img v-if="postIsLiked == false" src="../assets/like.svg" alt="icone like">
          <img v-else src="../assets/liked.png" alt="icone like">
            <p v-if="likesLength <= 1" class="bottom-line_btn_text">{{ likesLength }} like</p>
            <p v-else id="likes-nb" class="bottom-line_btn_text">{{ likesLength }} likes</p>
        </button>
        <router-link :to="{name: 'post', params: {id: post.id}}" id="comments" class="bottom-line_btn">
          <button >
              <img src="../assets/chat.svg" alt="icone commentaires">
              <p class="bottom-line_btn_text"><span id="comments_text">Commentaires </span>({{ commentsLength }})</p>
          </button>
        </router-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default ({
  name: 'OnePost',
  props: ['post', 'likesLength', 'commentsLength'],
  data() {
    return {
      userAdmin: JSON.parse(localStorage.getItem('userAdmin')),
      currentUserId: JSON.parse(localStorage.getItem('userId')),
      token: '',
      postIsLiked: false
    }
  },
  methods: {
    getDate(date) {
      return moment(date).locale('fr').format('LL');
    },
    getHour(hour) {
      return moment(hour).locale('fr').format('LT')
    },
    editionRedirection(postId) {
      this.$router.push(`/posts/${postId}/edit`)
    },
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
            if (this.$route.path == '/home') {
              window.location.reload()
            } else {
            this.$router.push('/home')
            }
        })
        .catch(error => {
            console.log(error)
        })
      }
    },
    likePost() {
      this.token = localStorage.getItem('userToken');
      fetch(`http://localhost:3000/api/posts/${this.post.id}/likes`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(error => {
        alert('Action impossible !')
        console.log(error)
      })
    },
    getUserLike() {
      fetch(`http://localhost:3000/api/posts/${this.post.id}/like`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(result => {
        if (result.ok) {
          return result.json()
        }
      })
      .then(data => {
        console.log(data)
        return this.postIsLiked = true;
      })
      .catch(error => console.log(error))
    }
  },
  mounted() {
    this.token = localStorage.getItem('userToken')
    this.getUserLike();
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
      object-fit: cover;
      height: 50px;
      width: 50px;
      margin-right: 20px;
    }
    & #name {
      font-weight: bold;
      margin: 0;
      & #department {
        font-weight: normal;
        font-size: 15px;
      }
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
router-link {
  text-decoration: none;
}
#bottom-line {
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
  & .bottom-line_btn {
    display: flex;
    justify-content: center;
    background-color: white;
    border: none;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    & img {
      margin-right: 10px;
      height: 30px;
      width: 30px;
    }
  }
  & #likes {
    width: 50%;
    border-right: 1px #F0F2F4 solid;
  }
  & #comments {
    width: 50%;
    & button {
      display: flex;
      background-color: transparent;
      border: none;
      align-items: center;
      padding: 0 20px;
      cursor: pointer;
      
    }
  }
}

a {
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
}

@media screen and (max-width: 992px) {
  #bottom-line {
    padding: 10px;
    & #likes {
      width: 33%;
    }
    & #comments {
      width: 33%;
      &_text {
        display: none
      }
    }
    & .bottom-line_btn {
      display: flex;
      justify-content: center;
      margin: 0;
    }
  }
}

@media screen and (max-width: 768px) {
  #main-container {
    width: 100%;
  }
}
</style>