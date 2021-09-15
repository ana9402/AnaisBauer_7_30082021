<template>
    <div id="edition-form-container">
        <form>
            <div id="firstname-field" class="form-field">
                <label for="firstname">Prénom</label>
                <input type="text" id="firstname" name="firstname" disabled>
            </div>
            <div id="lastname-field" class="form-field">
                <label for="lastname">Nom</label>
                <input type="text" id="lastname" name="lastname" disabled>
            </div>
            <div id="email-field" class="form-field">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" disabled>
            </div>
            <div id="password-field" class="form-field">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" disabled>
            </div>
            <div id="department-field" class="form-field">
                <label for="department">Service</label>
                <input type="text" id="department" name="department" placeholder="ex: Ressources Humaines" disabled>
            </div>
            <div id="media-field" class="form-field">
                <label for="file">Photo de profil</label>
                <input type="file" id="file" name="file" disabled>
            </div>
            <button type="submit">Enregistrer les modifications</button>
        </form>
    </div>
</template>

<script>

export default ({
    name: 'ProfileEditionForm'
})
</script>

<style lang="scss" scoped>
#edition-form-container {
    width: 30%;
    padding: 30px;
    box-shadow: 3px 3px 10px rgb(200, 200, 200);
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
    }
    & button {
        font-size: 15px;
        font-weight: bold;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        background-color: #AEADAE;
    }
}
</style>