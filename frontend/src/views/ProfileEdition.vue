<template>
    <div>
        <MainHeader/>
        <div id="content">
            <div id="profile-banner"> 
                <h1>Modifier votre profil</h1>
            </div>
            <ProfileEditionForm />
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