<template>
    <div id="newComment-container">
        <form @submit.prevent="createComment">
            <textarea placeholder="Ecrivez votre commentaire ici..." v-model="content"></textarea>
            <button type="submit">Publier</button>
        </form>
    </div>
</template>

<script>

export default ({
    name: "Comments",
    data() {
        return {
            token: localStorage.getItem('userToken'),
            content: ''
        }
    },
    methods: {
        createComment() {
            const commentContent = {
                content: this.content
            }

            if (commentContent.content == '') {
                alert('Votre commentaire est vide !');
                return;
            }

            fetch(`http://localhost:3000/api/posts/${this.$route.params.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(commentContent)
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                }
            })
            .then(() => {
                alert('Votre commentaire a été publié !')
            })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error)
                console.log('ça ne fonctionne pas')
            })
        }
    }
})
</script>

<style lang="scss" scoped>
#newComment-container {
    background-color: white;
    margin-bottom: 30px;
    & form {
        width: 100%;
    }
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