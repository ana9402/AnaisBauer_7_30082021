<template>
    <form>
        <div id="title-field" class="form-field">
            <label for="title">Titre</label>
            <input type="text" id="title" name="title">
        </div>
        <div id="content-field" class="form-field">
            <label for="content">Texte</label>
            <textarea type="text" id="content" name="content"></textarea>
        </div>
        <div id="media-field" class="form-field">
            <label for="media">Media</label>
            <input type="file" id="media" name="media">
        </div>
        <button type="submit">PUBLIER</button>
    </form>
</template>

<script>
export default ({
    name: "SubmitForm",
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
        color: white;
        border-radius: 20px;
        width: 50%;
        height: 40px;
    }
}
</style>