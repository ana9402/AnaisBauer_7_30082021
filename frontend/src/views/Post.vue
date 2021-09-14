<template>
<div>
    <div id="page-container">
        <MainHeader/>
        <div id="test">
            <div id="main-container">
                <OnePost :post="post"/>
                <div id="comments-container">
                    <CommentsForm/>
                    <DisplayComment/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import OnePost from '../components/OnePost.vue'
import CommentsForm from '../components/CommentsForm.vue'
import DisplayComment from '../components/DisplayComment.vue'

export default {
    name: "Post",
    components: {
        MainHeader,
        OnePost,
        CommentsForm,
        DisplayComment
    },
    data() {
        return {
            token: '',
            post: []
        }
    },
    methods: {
        getPost() {
            const postId = this.$route.params.id;
            this.token = localStorage.getItem('userToken');
            fetch(`http://localhost:3000/api/posts/` + postId, {
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
            .then(data => {
                this.post = data
            })
            .catch((error) => {
                console.log(error)
                console.log('ça ne fonctionne pas')
            })
        }
    },
    beforeMount() {
        this.getPost()
    }
}

</script>

<style lang="scss" scoped>
#test {
    display: flex;
    justify-content: center;
}
#comments-container {
    padding: 20px;
    border: 1px grey solid;
}

</style>