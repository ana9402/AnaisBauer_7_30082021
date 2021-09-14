<template>
    <header>
        <a href="#">
            <img id="logo" src="../assets/icon-left-font.svg" alt="logo Groupomania"/>
        </a>
        <nav>
            <ul>
                <li>
                    <router-link to="/signup" id="signup-link">S'inscrire</router-link>
                </li>
                <li>
                    <router-link to="/login" id="login-link">Se connecter</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default ({
    name: "AuthHeader",
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
        height: 50%;
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
        text-decoration: none;
        color: black;
        margin-right: 30px;
        &:hover {
        color: #FD2D01;
        }
    }

}

@media screen and (max-width: 991px) {
    header {
        display: flex;
        flex-direction: column;
        padding: 0;
    }

    nav {
        width: 100%;
    }

    nav ul {
        display: flex;
        justify-content: center;
        margin-top: 30px;
        padding: 0;
    }

    nav li {
        display: flex;
        justify-content: center;
        padding: 0 0 20px 0;
        width: 100%;
        border-bottom: 2px #F2F2F2 solid;
    }

    nav li:hover {
        border-bottom: 2px #FD2D01 solid;
    }

    #signup-link {
        margin: 0;
    }
 
    router-link {
        width: 100%;
    }
}

</style>
