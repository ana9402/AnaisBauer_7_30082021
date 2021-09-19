<template>
<div>
    <MainHeader/>
    <div v-if="this.$route.params.id == this.currentUserId || isAdmin === true ">
        <div id="profile-content" >
            <section id="profile-content_banner"> 
                <h1>Modifier votre profil</h1>
            </section>
            <main id="profile-content_form">
                <ProfileEditionForm v-if="user" :key="user.id" :user="user" />
            </main>
        </div>
    </div>
    <div v-else id="hidden-content">
        <p>Vous n'êtes pas autorisé(e) à accéder à ce contenu.</p>
        <button @click="homeRedirection()">Retour à l'accueil</button>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import ProfileEditionForm from '../components/ProfileEditionForm.vue'

export default ({
    name: 'ProfileEdition',
    components: {
        MainHeader,
        ProfileEditionForm
    },
    data() {
        return {
            currentUserId: JSON.parse(localStorage.getItem('userId')),
            isAdmin: JSON.parse(localStorage.getItem('userAdmin')),
            token: '',
            user: null
        }
    },
    methods: {
        homeRedirection() {
            this.$router.push('/home')
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
                localStorage.setItem('userData', JSON.stringify(user))
            })
            .catch(error => console.log(error))
        }
    },
    mounted() {
        this.getUserProfile(this.$route.params.id);
    }
})
</script>

<style lang="scss" scoped>

#profile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    gap: 40px;
    &_banner {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 250px;
        color: white;
        background-color: #132542;
        & h1 {
            font-size: 40px;
        }
    }
    &_form {
        box-sizing: border-box;
        width: 550px;
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

@media screen and (max-width: 800px) {
    #profile-content_form {
        width: 100%;
    }
}

</style>