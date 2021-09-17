<template>
    <div>
        <form method="put" v-on:submit.prevent="editComment(this.$route.params.postId, comment.id)">
            <textarea placeholder="Ecrivez votre commentaire ici..." v-model="form.content"></textarea>
            <button type="submit">Publier</button>
        </form>
    </div>
</template>

<script>
export default ({
    name: 'CommentEditionForm',
    props: ['comment'],
    data() {
        const commentData = JSON.parse(localStorage.getItem('postComment'))
        return {
            token: localStorage.getItem('userToken'),
            commentData,
            form: {
                content: commentData.content
            }
        }
    },
    methods: {
        editComment(postId, commentId) {
            const commentData = this.form
            fetch(`http://localhost:3000/api/posts/${postId}/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(commentData)
            })
            .then(res => {
                console.log(res)
                alert('Le post a bien été mis à jour')
            })
            .then(() => {
                localStorage.removeItem('postComment')
                this.$router.go(-1)
            })
        }
    }
})
</script>)

<style lang="scss" scoped>
form {
    width: 100%;
    & textarea {
        width: 100%;
        padding: 20px;
        height: 100px;
        box-sizing: border-box;
        resize: none;
    }
    & button {
        display: block;
        margin-right: 0;
        margin-left: auto;
        padding: 10px 20px;
        background-color: rgb(49, 48, 48);
        color: white;
        cursor: pointer;
    }
}
</style>