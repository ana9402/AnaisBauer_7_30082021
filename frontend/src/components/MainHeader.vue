<template>
    <header>
        <div id="top-header">
            <router-link to="/home">
                <img id="logo" src="../assets/icon-left-font.svg" alt="logo Groupomania"/>
            </router-link>
            <div id="newPost"> 
                <router-link to="/submit" class="link" id="newPost-link">+<span id="newPost-link_text">Ajouter un post</span></router-link>
            </div>
        </div>
        <nav>
            <ul>
                <li>
                    <router-link to="/home" class="nav-link link"  id="signup-link">Accueil</router-link>
                </li>
                <li>
                    <router-link to="/Profile" class="nav-link link"  id="login-link">Mon Compte</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default ({
    name: "MainHeader",
})
</script>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 20px 0px;
    background-color: white;
    & #logo {
        display: flex;
        width: 100%;
        height: 100%;
    }
    & #top-header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
    }
}
#newPost {
    display: flex;
    justify-content: center;
    align-items: center;
    & #newPost-link {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(49, 48, 48);
        color: white;
        box-shadow: 2px 2px 5px rgb(161, 159, 159);
        border-radius: 20px;
        padding: 10px 15px;
        &_text {
            align-items: center;
            justify-content: center;
            margin-left: 10px;
        }
    }
}
.link {
    text-decoration: none;
    color: black;
    &:hover {
        color: #FD2D01;
    }
}
nav {
    & ul {
        list-style-type: none;
        display: flex;
        & li {
            display: flex;
            text-align: center;
        }
    }
    
    & a {
        margin-right: 30px;
    }
}

@media screen and (max-width: 768px) {
    header {
        display: flex;
        flex-direction: column;
        padding: 0;
        #top-header {
            width: 100%;
            justify-content: space-between;
            padding: 0;
            margin-right: 30px;
        }
    }
    #newPost {
        width: 40px;
    }
    #newPost-link {
        width: 100%;
        margin: 0;
        border-radius: 20px;
        &_text {
            display: none;
        }
    }

    nav {
        width: 100%;
        & ul {
            display: flex;
            justify-content: center;
            margin-top: 30px;
            padding: 0;
            & li {
                display: flex;
                justify-content: center;
                padding: 0 0 20px 0;
                width: 100%;
                border-bottom: 2px #F2F2F2 solid;
                &:hover {
                    border-bottom: 2px #FD2D01 solid;
                }
            }
        }
    }

    #signup-link {
        margin: 0;
    }
 
    .nav-link {
        width: 100%;
    }
}

</style>
