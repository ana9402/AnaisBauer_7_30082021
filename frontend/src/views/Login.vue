<template>
<div id="page-container">
    <AuthHeader/>
    <div id="content">
        <main id="login">
            <h1>Se connecter</h1>
            <div id="login_fail-msg">
                <p id="missing-fields"></p>
                <p id="wrong-fields"></p>
            </div>
            <form method="post" v-on:submit.prevent="loginUser" id="login_form">
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
            <p id="login_redirection">Vous n'êtes pas encore membre ? <router-link to="/signup"><span>Je m'inscris</span></router-link></p>
        </main>
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
                localStorage.setItem('userAdmin', data.userAdmin)
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
#login {
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
    #login {
        width: 100%;
    }
}

</style>