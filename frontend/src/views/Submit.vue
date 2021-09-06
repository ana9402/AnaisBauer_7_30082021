<template>
<div>
    <MainHeader/>
    <div id="container">
        <h1> Créer un post</h1>
        <SubmitForm/>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import SubmitForm from '../components/SubmitForm.vue'

export default {
    name: "Submit",
    components: {
        MainHeader,
        SubmitForm
    }
}

</script>

<style lang="scss" scoped>
#container {
    padding: 0 40px;
    margin-bottom: 40px;
    & h1 {
        margin-bottom: 30px;
    }
}

</style>