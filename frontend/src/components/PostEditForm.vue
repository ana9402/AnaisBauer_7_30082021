<template>
    <form method="put" enctype="multipart/form-data" v-on:submit.prevent="editPost(post.id)">
        <div id="title-field" class="form-field">
            <label for="title">Titre</label>
            <input type="text" id="title" name="title" placeholder="Que souhaitez-vous partager?" v-model="form.title">
        </div>
        <div id="media-field" class="form-field">
            <label for="file">Media</label>
            <input type="file" id="file" name="file" @change="onFileChanged">
            <figure>
                <img v-if="url" :src="url" alt="image du post"/>
                <img v-else :src="postData.media" alt="image du post"/>
            </figure>
        </div>
        <button type="submit">PUBLIER</button>
    </form>
</template>

<script>

export default ({
    name: "PostEditForm",
    props: ['post'],
    data() {
        const postData = JSON.parse(localStorage.getItem('postData'))
        return {
            token: localStorage.getItem('userToken'),
            postData,
            form: {
                title: postData.title
            },
            selectedFile: null,
            url: null
        }
    },
    methods: {
        onFileChanged(event) {
            this.selectedFile = event.target.files[0];
            this.url = URL.createObjectURL(this.selectedFile);
        },
        editPost(postId) {
            const formData = new FormData();
            formData.append('title', this.form.title)
            if (this.selectedFile != null) {
                formData.append('file', this.selectedFile)
            }
            fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                body: formData
            })
            .then(res => {
                console.log(res)
                if (res.ok) {
                    alert('Le post a bien été mis à jour !')
                    localStorage.removeItem('postData')
                    this.$router.push(`/posts/${this.$route.params.id}`)
                } else {
                    if (res.status == 400) {
                        alert('Veuillez remplir tous les champs avant de publier.')
                        return;
                    }
                }
                
            })
            .catch(error => console.log(error))
        },
    }
})
</script>

<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    & .form-field {
        display: flex;
        flex-direction: column;
        & label {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        & input {
            padding: 0 10px;
        }
        & textarea {
            padding: 10px;
        }
    }
    & #title-field {
        & input {
            height: 30px;
        } 
    }
    & #content-field {
        & textarea {
            height: 130px;
        }
    }
    & button {
        background-color: rgb(49, 48, 48);
        cursor: pointer;
        color: white;
        border-radius: 20px;
        width: 40%;
        height: 40px;
    }
}
</style>
