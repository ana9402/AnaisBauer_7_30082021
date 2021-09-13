<template>
<div>
    <div id="page-container">
        <MainHeader/>
        <div id="test">
            <div id="main-container">
                <OnePost :post="post"/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'
import OnePost from '../components/OnePost.vue'

export default {
    name: "Post",
    components: {
        MainHeader,
        OnePost
    },
    data() {
        return {
            token: '',
            post: []
        }
    },
    methods: {
        getPost() {
            const postId = this.$route.params.id;
            this.token = localStorage.getItem('userToken');
            fetch(`http://localhost:3000/api/posts/` + postId, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(result => {
                if (result.ok) {
                    return result.json()
                }
            })
            .then(data => {
                this.post = data
            })
            .catch((error) => {
                console.log(error)
                console.log('ça ne fonctionne pas')
            })
        }
    },
    beforeMount() {
        this.getPost()
    }
}

</script>

<style lang="scss" scoped>
#test {
    display: flex;
    justify-content: center;
}

#main-container {
    width: 50%;
}
</style>