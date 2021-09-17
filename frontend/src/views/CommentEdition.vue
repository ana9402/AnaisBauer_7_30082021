<template>
    <div id="page-container">
        <MainHeader/>
        <div id="content">
            <h1>Modifier le commentaire</h1>
            <div id="form-container">
                <CommentEditionForm v-if="comment" :post="comment.postId" :comment="comment"/>
            </div>
        </div>
    </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import CommentEditionForm from '../components/CommentEditionForm.vue'

export default ({
    name: 'CommentEdition',
    components: {
        MainHeader,
        CommentEditionForm
    },
    data() {
        
        return {
            token: localStorage.getItem('userToken'),
            comment: null
        }
    },
    methods: {
        getComment(postId, commentId) {
            fetch(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(result => {
                if (result.ok) {
                    return result.json();
                }
            })
            .then(comment => {
                console.log(comment);
                this.comment = comment
                localStorage.setItem('postComment', JSON.stringify(comment))
            })
            .catch(error => console.log(error))
        }   
    },
    mounted() {
        this.getComment(this.$route.params.postId, this.$route.params.id)
    }
})
</script>

<style lang="scss" scoped>
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