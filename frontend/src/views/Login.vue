<template>
<div>
    <AuthHeader/>
    <div id="main-container">
        <div id="login">
            <h1>Se connecter</h1>
            <p id="missing-fields-message"></p>
            <div id="form-container">
                <form method="post" v-on:submit.prevent="loginUser">
                    <div id="email-field" class="form-field">
                        <label for="email">Adresse e-mail</label>
                        <input type="email" id="email" name="email" placeholder="ex: patrick.dupont@groupomania.com" v-model="email">
                    </div>
                    <div id="password-field" class="form-field">
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" name="password" v-model="password">
                    </div>
                    <button type="submit">Je me connecte</button>
                </form>
            </div>
            <p id="signup-redirection">Vous n'êtes pas encore membre ? <router-link to="/signup"><span>Je m'inscris</span></router-link></p>
        </div>
    </div>
</div>
</template>

<script>
import AuthHeader from "../components/AuthHeader.vue"
import router from '../router/index'

export default {
    name: "Login",
    components: {
        AuthHeader
    },
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        loginUser() {
            let userData = {
                email: this.email,
                password: this.password
            }

            if (userData.email == '' || userData.password == '') {
                let missingFieldsMessage = document.getElementById('missing-fields-message')
                missingFieldsMessage.style.display = "flex"
                missingFieldsMessage.innerHTML = "Veuillez compléter tous les champs avant de valider le formulaire."
                console.log('Certains champs sont incomplets.')
                return;
            }

            fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status == 401) {
                        alert("Adresse mail ou mot de passe incorrect(e).")
                    }
                }
            })
            .then(data => {
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userId', data.userId)
                router.push('/home')
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

#main-container {
    display: flex;
    justify-content: center;
    margin: 30px 0;
}

#login {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    padding: 30px;
    box-shadow: 2px 2px 10px rgb(187, 186, 186);
    & h1 {
        margin-bottom: 50px;
    }
}

#missing-fields-message {
    font-size: 13px;
    color: red;
    display: none;
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
    width: 500px;
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
}

button {
    margin-top : 20px;
    background-color: rgb(49, 48, 48);
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
}

#signup-redirection {
    font-size: 12px;
    margin-bottom: 50px;
}

</style>