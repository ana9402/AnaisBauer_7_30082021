<template>
    <div id="comments-container">
        <h2>Commentaires</h2>
        <div id="newComment-container">
            <form @submit.prevent="createComment">
                <textarea placeholder="Ecrivez votre commentaire ici..." v-model="content"></textarea>
                <button type="submit">Publier</button>
            </form>
        </div>
    </div>
</template>

<script>

export default ({
    name: "Comments",
    data() {
        return {
            content: ''
        }
    },
    methods: {
        createComment() {
            const token = localStorage.getItem('userToken');
            const commentContent = {
                content: this.content
            }

            if (commentContent.content == '') {
                console.log('Le commentaire ne contient rien.');alert('Votre commentaire est vide !');
                return;
            }

            fetch(`http://localhost:3000/api/posts/${this.$route.params.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
#comments-container {
    padding: 20px;
    background-color: white;
    border: 1px rgb(214, 212, 212) solid;
}

#newComment-container {
    background-color: white;
    padding: 20px;
    & textarea {
        width: 100%;
        height: 70px;
        padding: 10px;
    }
    & button {
        padding: 10px 20px;
        background-color: rgb(49, 48, 48);
        color: white;
        cursor: pointer;
    }
}

</style>