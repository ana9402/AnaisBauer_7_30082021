<template>
<div>
    <AuthHeader/>
    <div id="login-container">
        <h1>Se connecter</h1>
        <div id="form-container">
            <form>
                <div id="email-field" class="form-field">
                    <label for="email">Adresse e-mail</label>
                    <input type="email" id="email" name="email" placeholder="ex: patrick.dupont@groupomania.com" required>
                </div>
                <div id="password-field" class="form-field">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit">Je me connecte</button>
            </form>
        </div>
        <p id="signup-redirection">Vous n'êtes pas encore membre ? <router-link to="/signup"><span>Je m'inscris</span></router-link></p>
    </div>
</div>
</template>

<script>
import AuthHeader from "../components/AuthHeader.vue"

export default {
    name: "Login",
    components: {
        AuthHeader
    }
}

</script>

<style scoped lang="scss">
#login-container {
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
    width: 500px;
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

#signup-redirection {
    font-size: 12px;
    margin-bottom: 50px;
}

</style>