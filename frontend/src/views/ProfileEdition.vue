<template>
    <div>
        <MainHeader/>
        <div id="content">
            <div id="profile-banner"> 
                <h1>Modifier votre profil</h1>
            </div>
            <ProfileEditionForm v-if="user" :key="user.id" :user="user" />
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
            token: '',
            user: null
        }
    },
    methods: {
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
            .then(() => {
                console.log(this.user.id)
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
#content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
    gap: 40px;
    & #profile-banner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 250px;
        background-color: #132542;
        color: white;
        width: 100%;
        & h1 {
            font-size: 40px;
        }
    }
}
</style>