<template>
    <div id="comment-container">
        <!-- COMMENT TOP-->
        <div id="comment-container_top">
            <div id="user-infos">
                <img :src="comment.User.profilePicture">
                <div>
                    <p id="name">
                        <router-link :to="{name: 'userProfile', params: {id: comment.User.id}}">
                            <span>{{comment.User.firstname}} {{comment.User.lastname}}</span>
                        </router-link>
                        • 
                        <span id="department">{{comment.User.department}}</span>
                    </p>
                    <p id="date">{{getDate(comment.createdAt)}} à {{ getHour(comment.createdAt) }}</p>
                </div>
            </div>
            <div v-if="comment.User.id == currentUserId || userAdmin === true" id="post-options">
                <button v-on:click="editionRedirection(post.id, comment.id)">
                    <img src="../assets/edit.png">
                </button>
                <button v-on:click="deleteComment(post.id, comment.id)">
                    x
                </button>
            </div>
        </div>
        <!-- COMMENT CONTENT-->
        <div id="comment-container_content">
            <p>{{comment.content}}</p>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default ({
    name: 'DisplayComment',
    props: ['post', 'comment'],
    data() {
        return {
            userAdmin: JSON.parse(localStorage.getItem('userAdmin')),
            currentUserId: JSON.parse(localStorage.getItem('userId'))
        }
    },
    methods: {
        getDate(date) {
            return moment(date).locale('fr').format('LL');
        },
        getHour(hour) {
        return moment(hour).locale('fr').format('LT')
        },
        editionRedirection(postId, commentId) {
            this.$router.push(`/posts/${postId}/comments/${commentId}/edit`)
        },
        deleteComment(postId, commentId) {
            const token = localStorage.getItem('userToken');
            if (confirm("Êtes-vous sûr(e) de vouloir supprimer ce commentaire ?")) {
                fetch(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
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
    }
})
</script>

<style lang="scss" scoped>
#comment-container {
    border: 1px solid #ccc9c9;
    background-color: rgb(251, 251, 251);
    margin-bottom: 10px;
    padding: 10px 20px;
    &_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
                margin: 0;
                font-weight: bold;
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
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: white;
                border: 1px rgb(177, 177, 177) solid;
                border-radius: 5px;
                padding: 5px;
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
    a {
        text-decoration: none;
        color: black;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>