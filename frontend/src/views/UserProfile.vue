<template>
<div>
    <div id="page-container">
        <MainHeader/>
        <div id="content">
            <div id="profile-banner"> 
                <h1>Mon Profil</h1>
            </div>
            <ProfileInfos v-if="user" :key="user.id" :user="user"/>
            <div>
                <button @click="logout()">Se déconnecter</button>
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
            token: '',
            user: null
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('Login');
        },
        getUserProfile(id) {
            this.token = localStorage.getItem('userToken')
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
}
</style>