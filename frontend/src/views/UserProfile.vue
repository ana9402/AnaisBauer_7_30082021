<template>
<div>
    <div id="page-container">
        <MainHeader/>
        <div id="content">
            <div id="profile-banner"> 
                <h1>Profil</h1>
            </div>
            <ProfileInfos v-if="user" :key="user.id" :user="user"/>
            <div id="options">
                <div v-if="currentUserId == this.$route.params.id || userAdmin === true" id="options_modify">
                    <button @click="editionRedirection()">Modifier</button>
                </div>
                <div v-if="currentUserId == this.$route.params.id || userAdmin === true" id="options_delete">
                    <button @click="deleteAccount(this.$route.params.id)">Supprimer le compte</button>
                </div>
                <div v-if="currentUserId == this.$route.params.id" id="options_logout">
                    <button @click="logout()">Se déconnecter</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import ProfileInfos from '../components/ProfileInfos.vue'
export default {
    name: "Profile",
    components: {
        MainHeader,
        ProfileInfos
    },
    data() {
        return {
            userAdmin: JSON.parse(localStorage.getItem('userAdmin')),
            currentUserId: JSON.parse(localStorage.getItem('userId')),
            token: localStorage.getItem('userToken'),
            user: null
        }
    },
    methods: {
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
                    this.logout()
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
        }
    },
    mounted() {
        this.getUserProfile(this.$route.params.id);
    }
}

</script>

<style lang="scss" scoped>
#content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 0;
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
    & #options {
        display: flex;
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
        &_logout {
            & button {
                background-color: #132442;
                color: white;
            }
        }
    }
}
</style>