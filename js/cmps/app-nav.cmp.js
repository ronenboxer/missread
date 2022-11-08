export default {
    template: `
    <nav class="main-nav  full">
            <ul class="main-layout flex">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/book">Books</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/book/edit">Add book</router-link></li>
            </ul> 
            <div v-if="!isHomePage" class="main-layout">
                <input type="search" v-model="searchValue" @input="emit"/>
                <router-link :to="'/search/' + searchValue">Search</router-link>
                </div>
        </nav>
    `,
    data() {
        return {
            searchValue: ''
        }
    },
    computed:{
        isHomePage(){
            return this.$route.path ==='/'
        }
    }
}

