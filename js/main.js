const { createApp } = Vue
const { createRouter, createWebHashHistory } = VueRouter

import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookApp from './views/book-app.cmp.js'
import bookDetails from './views/book-details.cpm.js'
import bookEdit from './views/book-edit.cmp.js'


import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'

const options = {
    template: `
        <section>
        <app-header v-if="!isHomePage"/>
            <router-view />
            <app-footer />
        </section>
    `,
    data() {
        return {
            filterBy: { name: '', isOnSale: false, fromPrice: 0, toPrice: Infinity },
        }
    },
    created(){
    },
    components: {
        bookApp,
        appHeader,
        appFooter
    },
    methods: {
        setFilter(filterBy) {
            if (filterBy) this.filterBy = filterBy
        }
    },
    computed:{
        isHomePage(){
            return this.$route.path ==='/'
        }
    }
}
const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/book',
            component: bookApp
        },
        {
            path: '/book/:id',
            component: bookDetails
        },
        {
            path: '/book/edit/:id?',
            component: bookEdit
        },
        {
            path: '/about',
            component: aboutPage
        },
    ]
}

const router = createRouter(routerOptions)
const app = createApp(options)

app.use(router)
app.mount('#app')