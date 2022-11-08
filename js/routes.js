
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookApp from './views/book-app.cmp.js'
import bookDetails from './views/book-details.cpm.js'
import bookEdit from './views/book-edit.cmp.js'
import searchPage from './views/search-page.cmp.js'

import missread from './cmps/missread.cmp.js'
import mission from './cmps/mission.cmp.js'
import resources from './cmps/resources.cmp.js'
import contact from './cmps/contact.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter
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
        {
            path: '/about/missread',
            component: missread
        },
        {
            path: '/about/mission',
            component: mission
        },
        {
            path: '/about/resources',
            component: resources
        },
        {
            path: '/about/contact',
            component: contact
        },
        {
            path: '/search/',
            component: searchPage,
            children: [
                {
                    path: ':search',
                    component: searchPage,
                },                
                // {
                //     path: 'goals',
                //     component: aboutGoals,
                // },                
            ]
        },
    ]
}

export const router = createRouter(routerOptions)