<template>
<div id="page-container">
    <MainHeader/>
    <div v-if="user" id="content">
        <div id="profile-banner"> 
            <h1>Profil</h1>
        </div>
        <div id="profile-view">
            <aside>
                <ProfileInfos v-if="user" :key="user.id" :user="user"/>
                <div id="options">
                    <div v-if="currentUserId == this.$route.params.id || userAdmin === true" id="options_modify">
                        <button @click="editionRedirection()">Modifier</button>
                    </div>
                    <div v-if="currentUserId == this.$route.params.id || userAdmin === true" id="options_delete">
                        <button @click="deleteAccount(this.$route.params.id)">Supprimer le compte</button>
                    </div>
                </div>
            </aside>
            <main>
                <div id="posts-list-container">
                    <h2>Publications</h2>
                    <OnePost v-for="post in posts" :key="post.id" :post="post" :likesLength="post.Likes.length" :commentsLength="post.Comments.length" />
                    <p v-if="!posts">L'utilisateur n'a encore rien publié.</p>
                </div>
            </main>
        </div>
    </div>
    <div v-else id="hidden-content">
        <p>L'utilisateur n'existe pas.</p>
        <button @click="homeRedirection()">Retour à l'accueil</button>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import ProfileInfos from '../components/ProfileInfos.vue'
import OnePost from '../components/OnePost.vue'

export default {
    name: "Profile",
    components: {
        MainHeader,
        ProfileInfos,
        OnePost
    },
    data() {
        return {
            userAdmin: JSON.parse(localStorage.getItem('userAdmin')),
            currentUserId: JSON.parse(localStorage.getItem('userId')),
            token: localStorage.getItem('userToken'),
            user: null,
            posts: []
        }
    },
    methods: {
        homeRedirection() {
            this.$router.push('/home')
        },
        editionRedirection() {
            this.$router.push(`/profiles/${this.$route.params.id}/edit`)
        },
        deleteAccount(id) {
            if (confirm("Êtes-vous sûr(e) de vouloir supprimer votre compte ? Toutes vos données seront perdues.")) {
                fetch('http://localhost:3000/api/users/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    }
                })
                .then(res => {
                    console.log(res)
                    alert("Le profil a bien été supprimé ! Vous allez être redirigé.")
                    if (this.$route.params.id == this.currentUserId) {
                        this.logout()
                    } else {
                        this.$router.push('/home')
                    }
                })
                .catch(error => console.log(error))
            } else {
                return;
            }
        },
        logout() {
            localStorage.clear();
            this.$router.push('Login');
        },
        getUserProfile(id) {
            fetch(`http://localhost:3000/api/users/` + id, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                }
            })
            .then(user => {
                console.log(user)
                this.user = user
            })
            .catch(error => console.log(error))
        },
        getUsersPosts() {
            fetch(`http://localhost:3000/api/posts/users/${this.$route.params.id}`, {
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
            .then(posts => {
                this.posts = posts
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    mounted() {
        this.getUserProfile(this.$route.params.id);
        this.getUsersPosts();
    }
}

</script>

<style lang="scss" scoped>
#content {
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 50px;
    & #profile-banner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 250px;
        background-color: #132542;
        color: white;
        & h1 {
            font-size: 40px;
        }
    }
    & #profile-view {
        display: flex;
        width: 100%;
        margin: auto;
        padding: 0;
        gap: 20px;
        & aside {
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
            width: 30%;
            padding: 10px;
        }
        & main {
            width: 70%;
            margin-top: 20px;
            & #posts-list-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: auto;
                box-sizing: border-box;
                width: 80%;
            }
        }
    }
    & #options {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        justify-content: center;
        & button {
            font-size: 15px;
            font-weight: bold;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
        }
        &_modify {
            & button {
                background-color: #AEADAE;
            }
        }
        &_delete {
            & button {
                background-color: #F12C05;
                color: white;
            }
        }
    }
}

#hidden-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
    & button {
        font-size: 15px;
        font-weight: bold;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        background-color: #AEADAE
    }
}

@media screen and (max-width: 991px) {
    #content {
       & #profile-view {
            width: 100%;
            flex-direction: column;
            & aside {
                flex-direction: column-reverse;
                justify-content: center;
                gap: 30px;
                width: 100%;
            }
            & main {
                width: 100%;
                margin: auto;
            & #posts-list-container {
                width: 90%;
            }
        }
        } 
    }
}

@media screen and (max-width: 768px) {
    #content {
       & #profile-view {
            & main {
                & #posts-list-container {
                    width: 100%;
                }

            }
        } 
    }
}

@media screen and (min-width: 1400px) {
    #content {
        & #profile-view {
            width: 80%;
        }
    }
}
</style>