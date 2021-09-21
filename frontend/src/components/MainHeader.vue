<template>
    <header>
        <router-link to="/home">
            <img id="desktop-logo" src="../assets/icon-left-font.svg" alt="logo Groupomania"/>
            <img id="mobile-logo" src="../assets/icon.png" alt="logo Groupomania"/>
        </router-link>
        <nav>
            <ul id="nav-links">
                <li id="nav-links_newPost"> 
                    <router-link to="/submit" class="link" aria-label="ajouter un post" id="newPost">+<span id="newPost_text">Ajouter un post</span></router-link>
                </li>
                <li id="nav-links_forum"> 
                    <router-link to="/home" class="nav-link link" aria-label="accéder au forum">
                        <span class="desktop-link">Forum</span>
                        <img src="../assets/home.png" alt="icone homepage" class="mobile-link" />
                    </router-link>
                </li>
                <li id="nav-links_account">
                    <router-link :to="{name: 'userProfile', params: {id: currentUserId}}" class="nav-link link" aria-label="Se rendre sur mon profil">
                        <span class="desktop-link">Mon Compte</span>
                        <img src="../assets/account.png" alt="icone profil utilisateur" class="mobile-link">
                    </router-link>
                </li>
                <li id="nav-links_logout">
                    <button class="nav-link link" @click="logout" aria-label="Se déconnecter">
                        <img src="../assets/logout.png" alt="icone deconnexion" />
                    </button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default ({
    name: "MainHeader",
    data() {
        return {
            currentUserId: JSON.parse(localStorage.getItem('userId'))
        }
    },
    methods: {
        logout() {
            if(confirm("Êtes-vous sûr(e) de vouloir vous déconnecter ?")) {
                localStorage.clear();
                this.$router.push('Login');
            }
        },
    }
})
</script>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 20px 0px;
    background-color: white;
    & #desktop-logo {
        display: flex;
        width: 100%;
        height: 100%;
    }
    & #mobile-logo {
        display: none;
        width: 80px;
        height: 80px;
    }
}

nav {
    & ul {
        list-style-type: none;
        display: flex;
        & li {
            display: flex;
            align-items: center;
        }
    }
    & a {
        margin-right: 20px;
        text-decoration: none;
        color: black;
        cursor: pointer;
        &:hover {
            color: #FD2D01;
        }
    }
}

#nav-links {
    display: flex;
    text-align: center;
    &_newPost {
        display: flex;
        justify-content: center;
        align-items: center;
        & #newPost {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid rgb(184, 182, 182);
            box-shadow: 3px 2px 5px rgb(204, 202, 202);
            border-radius: 20px;
            padding: 10px 15px;
            &_text {
                align-items: center;
                justify-content: center;
                margin-left: 10px;
            }
        }
}
    &_logout button {
        background-color: transparent;
        border: none;
        height: 40px;
        width: 40px;
        color: #FD2D01;
        cursor: pointer;
        font-size: 16px;
        & img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    }
    & .mobile-link {
        display: none;
        height: 30px;
        width: 30px;
    }
}

@media screen and (max-width: 991px) {
    header {
        #desktop-logo {
            display: none;
        }
        #mobile-logo {
            display: flex;
        }
    }

    #nav-links {
        & .desktop-link {
            display: none;
        }
        & .mobile-link {
            display: flex;
        }
        & #newPost_text {
            display: none;
        }
    }
}

</style>
