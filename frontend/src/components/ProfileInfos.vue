<template>
<div>
    <section id= "user-profile">
        <figure id="user-profile_img">
            <img v-bind:src="user.profilePicture" alt="photo de profil" />
        </figure>
        <div id="user-profile_infos">
            <h2>{{ user.firstname }} {{ user.lastname }}</h2>
            <div class="info-category">
                <p class="info-category_name">Adresse email</p>
                <p>{{ user.email }}</p>
            </div>
            <div class="info-category">
                <p class="info-category_name">Service</p>
                <p v-if="user.department !== null"> {{ user.department }} </p>
                <p v-else>Non renseigné</p>
            </div>
            <div id="info-category">
                <p class="info-category_name">Membre depuis le :</p>
                <p> {{getDate(user.createdAt)}}</p>
            </div>
        </div>
    </section>
</div>
</template>

<script>
import moment from 'moment'

export default ({
    name: 'ProfileInfos',
    props: ['user'],
    methods: {
        getDate(date) {
            return moment(date).locale('fr').format('LL');
        }
    }
})
</script>

<style lang="scss" scoped>
#user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    &_img {
        height: 120px;
        width: 120px;
        background-color: white;
        border: 1px #F2F2F2 solid;
        position: relative;
        top: -50px;
        & img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }
    &_infos {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px grey solid;
        box-shadow: 3px 3px 10px grey;
        padding: 20px 50px;
        width: 30%;
        & h2 {
            font-size: 40px;
        }
        & .info-category {
            display: flex;
            flex-direction: column;
            align-items: center;
            &_name {
                font-weight: bold;
                text-transform: uppercase;
                text-decoration: underline;
            }
        }
    }
}

@media screen and (max-width: 1200px) {
    #user-profile_infos {
        width: 60%;
    }
}

@media screen and (max-width: 768px) {
    #user-profile_infos {
        width: 90%;
    }
}
</style>