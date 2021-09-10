<template>
<div>
    <MainHeader/>
    <div id="page-container">
        <button @click="logout()">Se déconnecter</button>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'

export default {
    name: "Profile",
    components: {
        MainHeader
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('Login');
        }
    }
}

</script>

<style lang="scss" scoped>
#page-container{
    display: flex;
    justify-content: center;
    padding: 40px 0;
}
</style>