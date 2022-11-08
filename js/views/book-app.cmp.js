import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import bookDetails from "./book-details.cpm.js"
import bookList from '../cmps/book-list.cmp.js'

export default {
    template: `
    <main v-if="books" class="main-layout main-content position-relative">
            <book-list 
                v-if="!selectedBook"
                :books="books"
                @bookSelected="selectBook" /> 
            <book-details
                v-else
                class="main-layout"
                :book="selectedBook" 
                @closed="selectedBook = null"/>
        </main>
    `,
    data() {
        return {
            selectedBook: null,
            books: null,
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
            .catch(()=>showErrorMsg('Could not load books'))
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book
        },
    },
    computed: {

    },
    components: {
        bookList,
        bookDetails
    }
}