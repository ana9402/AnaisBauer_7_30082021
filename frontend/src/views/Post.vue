<template>
<div>
    <div id="page-container">
        <MainHeader/>
        <div id="main-container">
            <div>
                <OnePost v-if="post" :key="post.id" :post="post"/>
                <div id="comments-container">
                    <CommentsForm/>
                    <div v-for="comment in comments" :key="comment.id" id="commentsList">
                        <DisplayComment :post="post" :comment="comment" />
                    </div>
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
            post: null,
            comments: []
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
            .then(() => {
                console.log(this.post, "voici le post retourné")
            })
            .catch((error) => {
                console.log(error)
                console.log('ça ne fonctionne pas')
            })
        },
        getComments() {
            fetch(`http://localhost:3000/api/posts/${this.$route.params.id}/comments`, {
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
                this.comments = data
                console.log(this.comments, "les commentaires")
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
   mounted() {
        this.getPost();
        this.getComments();
    }
}

</script>

<style lang="scss" scoped>
#main-container {
    display: flex;
    justify-content: center;
    padding: 50px 0;
}
#comments-container {
    padding: 20px;
}

</style>