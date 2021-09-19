<template>
<div id="page-container">
    <AuthHeader/>
    <div id="content">
        <main id="signup">
            <h1>S'inscrire</h1>
            <div id="signup_fail-msg">
                <p id="missing-fields"></p>
                <p id="wrong-fields"></p>
            </div>
            <form method="post" v-on:submit.prevent="signupUser" id="signup_form">
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
            <p id="signup_redirection">Déjà inscrit(e) ? <router-link to="/login"><span>Je me connecte</span></router-link></p>
        </main>
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
            let missingFieldsMessage = document.getElementById('missing-fields') 
            let wrongFieldsMessage = document.getElementById('wrong-fields');
            // Si au moins l'un des champs est vide, on affiche un message d'erreur
            if (user.firstname == '' || user.lastname == '' || user.email == '' || user.password == '') {
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
                        alert("Erreur")
                    } else if (result.status === 400) {
                        wrongFieldsMessage.style.display = "flex"
                        wrongFieldsMessage.style.flexDirection= "column"
                        wrongFieldsMessage.innerHTML = "<p>Certains champs ne sont pas valides.</p><p>Le mot de passe doit contenir au moins :<br>- 8 caractères, dont<br>- 1 minuscule<br>- 1 majuscule<br>- 1 chiffre<br>- 1 caractère spécial</p>"
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

#signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto 50px auto;
    padding: 40px;
    width: 550px;
    box-sizing: border-box;
    box-shadow: 2px 2px 10px rgb(187, 186, 186);
    & h1 {
        margin-bottom: 40px;
    }
    &_fail-msg {
        font-size: 13px;
        color: red;
        margin-bottom: 20px;
        width: 100%;
        & #missing-fields {
            display: none;
        }
        & #wrong-fields {
            display: none;
        }
    }
    &_form {
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
                height: 40px;
                padding: 0px 10px;
            }
        }
        & .required {
            color: red;
            font-size: 13px;
        }
        & button {
            margin-top : 20px;
            background-color: rgb(49, 48, 48);
            color: white;
            font-weight: bold;
            cursor: pointer;
            padding: 10px;
        }
    }
    &_redirection {
        font-size: 12px;
        margin: 40px 0 10px 0;
    }
}

@media screen and (max-width: 800px) {
    #signup {
        width: 100%;
    }
}

</style>