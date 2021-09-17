<template>
    <div id="page-container">
        <MainHeader />
        <div id="content">
            <h1>Modifier le post</h1>
            <div id="form-container">
                <PostEditForm v-if="post" :post="post"/>
            </div>
        </div>
    </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import PostEditForm from '../components/PostEditForm.vue'

export default ({
    name: 'PostEdition',
    components: {
        MainHeader,
        PostEditForm
    },
    data() {
        return {
            token: localStorage.getItem('userToken'),
            post: null
        }
    },
    methods: {
        getPost(id) {
            fetch(`http://localhost:3000/api/posts/` + id, {
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
            .then(post => {
                console.log(post)
                this.post = post
                localStorage.setItem('postData', JSON.stringify(post))
            })
            .catch(error => console.log(error))
        },
    },
    mounted() {
         this.getPost(this.$route.params.id)
    }
})
</script>

<style  lang="scss" scoped>
#content {
    background-color: #F0F2F4;
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
