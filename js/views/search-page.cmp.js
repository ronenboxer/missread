import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export default {
    template: `
        <section class="main-layout" v-if="books">
        <ul>
            <li v-for="book in books" :key="book.title" class="flex space-between">
                <span 
                    class="book-title search-result"
                    :title="book.title">
                        {{getFormattedText(book.title)}}
                    </span>
                <button class="add-book" @click="saveBook(book)"> <iconify-icon inline icon="carbon:add-alt"></iconify-icon> </button>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            searchVal: null,
            books: null
        }

    },
    created() {
        this.searchVal = this.searchValue
        this.search()

    },
    methods: {
        search() {
            if (this.searchVal) bookService.search(this.searchVal)
                .then(books => {
                    this.books = books
                    showSuccessMsg(this.getFormattedMsg(books.length))
                })
                .catch(()=> showErrorMsg(this.getFormattedMsg(-1)))
        },
        saveBook(book) {
            bookService.save(book)
        },
        getFormattedText(title){
            if (title.length > 30) return title.slice(0,30)+'...'
            return title
        },
        getFormattedMsg(amount){
            if (amount === -1) return 'Something went worng'
            if (amount === 0) return 'No books were found'
            if (amount === 1) return '1 book was found'
            return `${amount} books were found`
        }
    },
    computed: {
        searchValue() {
            return this.$route.params.search
        },
    },
    components: {
    },
    watch: {
        searchValue() {
            this.searchVal = this.search()
            this.search()
        }
    }
}