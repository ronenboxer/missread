import bookFilter from '../cmps/book-filter.cmp.js'
import bookPreview from "./book-preview.cpm.js"

export default {
    props: ['books'],
    template: `
    <section class="book-list">
        <book-filter @filter-by="setFilter"/>
        <section class="grid books-container justify-center">
            <router-link 
                v-for="book in booksToShow"
                :to="'/book/' + book.id"
                :title="book.title"> 
                <book-preview
                    :book="book"
                    :key="book.id"/>
            </router-link>
        </section>
    </section>
    `,
    data(){
        return {
            filterBy: { name: '', fromPrice: 0, toPrice: Infinity, isOnSale: false }
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        booksToShow() {
            let { name, isOnSale, fromPrice, toPrice } = this.filterBy
            if (fromPrice === '') fromPrice = 0
            if (toPrice === '') toPrice = Infinity
            const regex = new RegExp(name, 'i')
            return this.books.filter(book => {
                return (regex.test(book.title) && (!isOnSale || isOnSale === book.listPrice.isOnSale) &&
                    fromPrice <= book.listPrice.amount &&
                    toPrice >= book.listPrice.amount)
            })
        },

    },
    components: {
        bookPreview,
        bookFilter
    }
}