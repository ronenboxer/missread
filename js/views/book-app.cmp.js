import { bookService } from "../services/book.service.js"

import bookDetails from "./book-details.cpm.js"
import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'

export default {
    template: `
        <main v-if="books" class="main-layout main-content position-relative">
            <book-filter @filter-by="setFilter"/>
            <book-list 
                v-if="!selectedBook"
                :books="booksToShow"
                @bookSelected="selectBook" /> 
            <book-details
                v-else
                class="main-layout"
                :book="selectedBook" 
                @filter-authors=""
                @filter-categories=""
                @closed="selectedBook = null"/>
        </main>
    `,
    data() {
        return {
            selectedBook: null,
            books: null,
            filterBy: { name: '', fromPrice: 0, toPrice: Infinity, isOnSale: false }
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
            console.log(filterBy)
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
        bookList,
        bookDetails,
        bookFilter
    }
}