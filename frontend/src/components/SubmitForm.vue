<template>
    <form method="post" enctype="multipart/form-data" v-on:submit.prevent="createPost">
        <div id="title-field" class="form-field">
            <label for="title">Titre</label>
            <input type="text" id="title" name="title" placeholder="Que souhaitez-vous partager?" v-model="title">
        </div>
        <div id="media-field" class="form-field">
            <label for="file">Media</label>
            <input type="file" id="file" name="file" @change="onFileChanged">
        </div>
        <button type="submit">PUBLIER</button>
    </form>
</template>

<script>
import router from '../router/index'

export default ({
    name: "SubmitForm",
    props: ['submitAction', 'onSelectedFile'],
    data() {
        return {
            title: '',
            selectedFile: null
        }
    },
    methods: {
        onFileChanged(event) {
            this.selectedFile = event.target.files[0]
        },
        createPost() {
            const token = localStorage.getItem('userToken');
            const userId = JSON.parse(localStorage.getItem('userId'));
            const formData = new FormData();
            if (this.selectedFile == null) {
                alert('Veuillez insérer un fichier.')
                return;
            }

            formData.append('file', this.selectedFile);
            formData.append('title', this.title);
            formData.append('userId', userId);
            fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                if (res.ok) {
                    alert('Votre post a bien été publié !')
                    router.push('/home')
                } else {
                    alert('Erreur !')
                }
            })
            .catch(function(error) {
                console.log(error),
                alert('Erreur de connexion au serveur')
            })
        }
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