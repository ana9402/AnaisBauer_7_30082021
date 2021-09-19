<template>
<div id= "user-profile">
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
        <div class="info-category">
            <p class="info-category_name">Membre depuis le :</p>
            <time> {{getDate(user.createdAt)}}</time>
        </div>
    </div>
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
    padding: 20px 40px;
    background-color: white;
    box-sizing: border-box;
    box-shadow: 3px 2px 10px rgb(236, 236, 236);
    &_img {
        height: 120px;
        width: 120px;
        background-color: white;
        border: 1px #F2F2F2 solid;
        position: relative;
        top: -70px;
        & img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }
    &_infos {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        align-items: center;
        width: 100%;
        position: relative;
        top: -50px;
        & h2 {
            display: flex;
            justify-content: center;
            font-size: 2s0px;
        }
        & .info-category {
            display: flex;
            flex-direction: column;
            align-items: center;
            &_name {
                font-weight: bold;
                text-decoration: underline;
            }
        }
    }
}

@media screen and (max-width: 991px) {
    #user-profile {
        width: 100%;
        &_img {
            top: 0px;
        }
        &_infos {
            top: 0px;
        }
    }
}
</style>