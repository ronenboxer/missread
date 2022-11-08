import appNav from './app-nav.cmp.js'

export default {
    template: `
    <section>
        <header class="main-header full position-relative">
            <!-- <h1 class="logo full position-absolute center">missRead</h1> -->
        </header>
        <div class="full nav-container">
            <div class="main-layout flex space-between">
                <app-nav/>
                <router-link to="/" class="logo bright main-layout">missRead</router-link>
            </div>
        </div>
    </section>
    `,
    methods: {
        setFilter(filterBy) {
            this.$emit('filter-by', filterBy)
        }
    },
    components: {
        appNav
    }
}