import { bookService } from "../services/book.service.js"

import bookAuthors from '../cmps/book-authors.cmp.js'
import bookCategories from '../cmps/book-categories.cmp.js'
import bookDescription from '../cmps/book-description.cmp.js'
import bookReview from '../cmps/book-review.cmp.js'
import appHeader from '../cmps/app-header.cmp.js'

export default {
    template: `
            <section v-if="book" class="book-details main-layout">
                <router-link 
                    :to="'/book'" 
                    class="btn-close">
                    <iconify-icon inline icon="ep:close"></iconify-icon>
                </router-link>
                <p class="flex space-between">
                    <router-link 
                        :to="'/book/' + this.prevBook">Previous
                    </router-link>
                    <h3 class="book-title main-font inline-block">
                        {{book.title}} 
                        <span class="additions">({{book.language}})</span>
                    </h3>
                    <router-link 
                        :to="'/book/' + this.nextBook">Next
                    </router-link>
                </p>
                <div class="flex">
                    <img class="book-cover" :src="book.thumbnail" />
                    <section>
                        <h4 class="book-price main-font"><span class="bold">Price</span> {{book.listPrice.amount}}</h4>
                        <h5 class="main-font" v-if="book.listPrice.isOnSale">On Sale</h5>
                        <h4 class="book-publish-date main-font"><span class="bold">Published in </span>
                            {{book.publishedDate}} <span class="additions">{{seniority}}</span></h4>
                        <h4 class="book-pages main-font"><span class="bold">Pages</span> {{book.pageCount}} <span class="additions">{{level}}</span></h4>
                        <h4 class="book-subtitle main-font italic">{{book.subtitle}}</h4>
                        <book-authors :authors="book.authors" /> 
                        <book-categories :categories="book.categories" />
                        <book-description 
                            :description="book.description"
                            :maxLength="100"/>
                    </section>
                </div>
                <div class="flex">
                    
                    <book-review :book="book" @reviewsSaved="saveReviews"/>
                </div>
</section>
    `,
    data() {
        return {
            book: null,
            publishTime: null,
            nextBook: null,
            prevBook: null
        }
    },
    created() {
        this.loadBook()
    },
    methods: {
        loadBook() {
            const bookId = this.bookId
            bookService.get(bookId)
                .then(book => {
                    this.book = book
                    this.publishTime = new Date().getFullYear() - book.publishedDate
                })
            bookService.getNeighbours(this.bookId)
                .then(books=> {
                    this.nextBook = books.next
                    this.prevBook = books.prev
                })
        },
        saveReviews(reviews) {
            this.book.reviews = reviews
            bookService.save(this.book)
        }
    },
    computed: {
        level() {
            const pages = this.book.pageCount
            if (pages < 100) return '(Light reading)'
            if (pages > 200 && pages < 500) return '(Decent reading)'
            if (pages > 500) return '(Long reading)'
        },
        seniority() {
            if (this.publishTime < 1) return '(New!)'
            if (this.publishTime > 10) return '(Veteran book)'
        },
        bookId(){
            return this.$route.params.id
        }
    },
    components: {
        bookAuthors,
        bookCategories,
        bookDescription,
        bookReview,
        appHeader
    },
    watch: {
        bookId(){
            if (this.bookId) this.loadBook()
        }
    }
}