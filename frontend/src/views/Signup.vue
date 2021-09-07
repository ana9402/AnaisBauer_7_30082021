<template>
<div>
    <AuthHeader/>
    <div id="signup-container">
        <h1>S'inscrire</h1>
        <p id="missing-fields-message"></p>
        <p id="wront-fields-message"></p>
        <div id="form-container">
            <form method="post" v-on:submit.prevent="signupUser">
                <div id="firstname-field" class="form-field">
                    <label for="firstname">Prénom <span class="required">*</span></label>
                    <input type="text" id="firstname" name="firstname" minlength="2" placeholder="ex: Patrick" v-model="firstname">
                </div>
                <div id="lastname-field" class="form-field"> 
                    <label for="lastname">Nom <span class="required">*</span></label>
                    <input type="text" id="lastname" name="lastname" minlength="2" placeholder="ex: Dupont" v-model="lastname">
                </div>
                <div id="email-field" class="form-field">
                    <label for="email">Adresse e-mail <span class="required">*</span></label>
                    <input type="email" id="email" name="email" minlength="10" placeholder="ex: patrick.dupont@groupomania.com" v-model="email">
                </div>
                <div id="password-field" class="form-field">
                    <label for="password">Mot de passe <span class="required">*</span></label>
                    <input type="password" id="password" name="password" minlength="8" v-model="password">
                </div>
                <button type="submit">Je m'inscris</button>
            </form>
        </div>
        <p id="login-redirection">Déjà inscrit(e) ? <router-link to="/login"><span>Je me connecte</span></router-link></p>
    </div>
</div>
</template>

<script>
import AuthHeader from '../components/AuthHeader.vue'
import router from '../router/index'

export default {
    name: "Signup",
    components: {
        AuthHeader
    },
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signupUser() {
            // On crée un objet user contenant les informations saisies
            let user = {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                password: this.password
            }            
            // Si au moins l'un des champs est vide, on affiche un message d'erreur
            if (user.firstname == '' || user.lastname == '' || user.email == '' || user.password == '') {
                let missingFieldsMessage = document.getElementById('missing-fields-message')
                missingFieldsMessage.style.display = "flex"
                missingFieldsMessage.innerHTML = "Veuillez compléter tous les champs avant de valider le formulaire."
                console.log('Certains champs sont incomplets.')
                return;
            }
            // On lance la requête POST à l'API pour l'inscription
            fetch('http://localhost:3000/api/users/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(function(result) {
                console.log(result)
                if (result.ok) {
                    alert('Votre compte a bien été créé. Veuillez vous connecter.')
                    router.push('/login')
                    return result.json();
                    
                } else {
                    if (result.status === 401) {
                        alert("L'utilisateur existe déjà !")
                    } else if (result.status === 500) {
                        alert("Les champs ne sont pas valides.")
                    }
                    
                    return;
                }
            })
            .catch(function(error) {
                console.log(error),
                alert('Erreur de connexion au serveur')
            })
        }
    }

}

</script>

<style scoped lang="scss">
#signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    & h1 {
        margin-bottom: 30px;
    }
    & .required {
        color: red;
        font-size: 13px;
    }
}

#missing-fields-message {
    font-size: 13px;
    color: red;
    display: none;
}

#wrong-fields-message {
    font-size: 13px;
    color: red;
    display: none;
    height: 0px;
}

#form-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    width: 400px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    & .form-field {
        display: flex;
        flex-direction: column;
        & label {
            font-weight: bold;
        }
        & input {
            height: 25px;
            padding: 0px 10px;
        }
    }
}

button {
    margin-top : 20px;
    background-color: rgb(49, 48, 48);
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
}

#login-redirection {
    font-size: 12px;
    margin-bottom: 50px;
}
</style>