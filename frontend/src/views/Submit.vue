<template>
<div>
    <MainHeader/>
    <div id="container">
        <h1> Créer un post</h1>
        <div id="form-container">
            <SubmitForm/>
        </div>
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
    background-color: rgb(236, 236, 236);
    padding: 40px 40px;
    & h1 {
        margin: 0 0 30px 10px;
    }
    & #form-container {
        background-color: white;
        box-shadow: 2px 5px 10px grey;
        padding: 20px;
        margin-bottom: 40px;
    }
}

</style>