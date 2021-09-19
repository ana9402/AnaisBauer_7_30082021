<template>
    <div id="edition-form-container">
        <form method="post" v-on:submit.prevent="editProfile(user.id)">
            <div id="firstname-field" class="form-field">
                <label for="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" v-model="form.firstname">
            </div>
            <div id="lastname-field" class="form-field">
                <label for="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" v-model="form.lastname">
            </div>
            <div id="email-field" class="form-field">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" v-bind:value="form.email" disabled>
            </div>
            <div id="password-field" class="form-field">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" disabled>
            </div>
            <div id="department-field" class="form-field">
                <label for="department">Service</label>
                <select name="department" id="department" v-model="form.department">
                    <option disabled value="">Sélectionnez votre service</option>
                    <option value="Achats">Achats</option>
                    <option value="Communication / Marketing">Communication / Marketing</option>
                    <option value="Comptabilité">Comptabilité</option>
                    <option value="Direction">Direction</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Juridique">Juridique</option>
                    <option value="Ressources Humaines">Ressources Humaines</option>
                </select>
                <!--<input type="text" id="department" name="department" placeholder="ex: Ressources Humaines" v-model="form.department">-->
            </div>
            <div id="media-field" class="form-field">
                <label for="file">Photo de profil</label>
                <input type="file" id="file" name="file" @change="onFileChanged">
                <figure id="media-field_preview">
                    <img v-if="url" :src="url" alt="photo de profil" />
                    <img v-else :src="userData.profilePicture" alt="photo de profil" />
                </figure>
            </div>
            <div id="error-msg">
            </div>
            <button type="submit">Enregistrer les modifications</button>
        </form>
    </div>
</template>

<script>

export default ({
    name: 'ProfileEditionForm',
    props: ['user'],
    data() {
        const userData = JSON.parse(localStorage.getItem('userData'))
        return {
            userData,
            form: {
                firstname: userData.firstname,
                lastname: userData.lastname,
                department: userData.department,
                email: userData.email,
                profilePicture: userData.profilePicture
            },
            selectedFile: null,
            url: null,
            token: localStorage.getItem('userToken')
        }
    },
    methods: {
        onFileChanged(event) {
            this.selectedFile = event.target.files[0];
            this.url = URL.createObjectURL(this.selectedFile)

        },
        editProfile(userId) {
            let errorMsg = document.getElementById('error-msg')

            if (this.form.firstname == '' || this.form.lastname == '' || this.form.department == '') {
                errorMsg.innerHTML="Veuillez remplir tous les champs du formulaire avant d'enregistrer."
                errorMsg.style.display="flex"
                return;
            }

            const formData = new FormData();
            formData.append('department', this.form.department);
            formData.append('lastname', this.form.lastname)
            formData.append('firstname', this.form.firstname)
            if (this.selectedFile !== null) { 
                formData.append('file', this.selectedFile)
            }
            fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                body: formData
            })
            .then(res => {
                console.log(res)
                if (res.ok) {
                    alert('Votre profil a bien été mis à jour !')
                    this.$router.push(`/profiles/${this.$route.params.id}`)
                } else {
                    if (res.status == 400) {
                        errorMsg.innerHTML="Certains champs sont invalides.<br> Le prénom et le nom ne doivent pas contenir de chiffres ou de caractères spéciaux."
                        errorMsg.style.display="flex";
                        return;
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        mounted() {
            console.log(this.test)
        }
    }
})
</script>

<style lang="scss" scoped>
#edition-form-container {
    width: 30%;
    padding: 30px;
    box-shadow: 3px 3px 10px rgb(200, 200, 200);
    & #error-msg {
        display: none;
        color: red;
        margin-bottom: 20px;
    }
}

form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .form-field {
        display: flex;
        flex-direction: column;
        gap: 5px;
        & label {
            font-weight: bold;
            text-transform: uppercase;
        }
        & input {
            height: 40px;
        }
        & select {
            height: 40px;
        }
    }
    & button {
        font-size: 15px;
        font-weight: bold;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        background-color: #AEADAE;
    }
    & #media-field {
        & input {
            padding: 20px 5px;
        }
        &_preview {
            padding: 0 5px;
            & img {
                object-fit: cover;
                height: 150px;
                width: 150px;
            }
        }
    }
}
</style>