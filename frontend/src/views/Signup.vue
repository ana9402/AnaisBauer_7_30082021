<template>
<div>
    <AuthHeader/>
    <div id="signup-container">
        <h1>S'inscrire</h1>
        <div id="form-container">
            <form method="post">
                <div id="firstname-field" class="form-field">
                    <label for="firstname">Prénom</label>
                    <input type="text" id="firstname" name="firstname" minlength="2" placeholder="ex: Patrick" required>
                </div>
                <div id="lastname-field" class="form-field"> 
                    <label for="lastname">Nom</label>
                    <input type="text" id="lastname" name="lastname" minlength="2" placeholder="ex: Dupont" required>
                </div>
                <div id="email-field" class="form-field">
                    <label for="email">Adresse e-mail</label>
                    <input type="email" id="email" name="email" minlength="10" placeholder="ex: patrick.dupont@groupomania.com" required>
                </div>
                <div id="password-field" class="form-field">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" name="password" minlength="8" required>
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

export default {
    name: "Signup",
    components: {
        AuthHeader
    }
}

</script>

<style scoped lang="scss">
#signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    & h1 {
        margin-bottom: 40px;
    }
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