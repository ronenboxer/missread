import { bookService } from "../services/book.service.js"

export default {
    template: `
        <section v-if="globalParams && book" class="edit-book">
            <form class="grid" id="edit-form" @submit.prevent="submitBook">
                <label class="grid">
                    <span>Title</span>
                    <input type="text" ref="title" v-model="book.title">
                </label>
                <label class="grid">
                    <span>Language</span>
                    <input list="language-list" ref="language" v-model="book.language" />
                </label>
                <label class="grid">
                    <span>Price</span>
                    <input type="number" ref="price" v-model="book.listPrice.amount">
                </label>
                <label class="grid">
                    <span>Currency</span>
                    <input list="currency-list" ref="currency" v-model="book.listPrice.currencyCode" />
                </label>
                <label class="grid">
                    <span>On sale</span>
                    <input ref="onSale" type="checkbox" :checked="book.isOnSale"/>
                </label>
                <label class="grid">
                    <span>Authors</span>
                    <section>
                        <input 
                            class="block"
                            v-for="(author, idx) in book.authors"
                            type="text"
                            v-model="book.authors[idx]" :key="author" />
                        <input ref="newAuthor" type="text"/>
                    </section>
                </label>
                <label class="grid">
                    <span>Subtitle</span>
                    <input 
                        type="text" 
                        ref="subtitle" 
                        v-model="book.subtitle">
                </label>
                <label class="grid">
                    <span>Publish date</span>
                    <input 
                        type="number"
                        ref="publish" 
                        v-model.number="book.publishedDate">
                </label>
                <label class="grid">
                    <span>Description</span>
                    <textarea 
                        rows="3" 
                        cols="20" 
                        v-model="book.description"
                        ref="description">
                    </textarea>
                </label>
                <label class="grid">
                    <span>Pages</span>
                    <input 
                        type="number" 
                        ref="pages" 
                        v-model.number="book.pageCount">
                </label>
                <label>
                    <span>Categories</span>
                    <section>
                        <input 
                            class="block"
                            v-for="(category, idx) in book.categories"
                            type="text"
                            v-model="book.categories[idx]" :key="category"/>
                        <input ref="newCategory" list="category-list"/>
                    </section>
                </label>
                <label class="grid">
                    <span>Thumbnail</span>
                    <input 
                    type="url" 
                    ref="thumbnail"
                    v-model="book.thumbnail" />
                </label>
            </form>
            
            <input type="submit" class="btn" form="edit-form" value="submit"/>
            <input type="submit" class="btn" value="cancel"/>

            <datalist id="language-list">
                <option v-for="lang in globalParams.languages" v-model="lang" :key="lang"></option>
            </datalist>
            <datalist id="currency-list">
                <option v-for="code in globalParams.currencyCodes" v-model="code" :key="code"></option>
            </datalist>
            <datalist id="category-list">
                <option v-for="category in globalParams.categories" v-model="category" :key="category"></option>
            </datalist>
        </section>
    `,
    data() {
        return {
            bookId: '',
            book: null,
            globalParams: null

        }
    },
    created() {
        bookService.paramMap()
            .then(params => {
                console.log(params)
                this.globalParams = params})
        if (this.$route.params.id) {
            this.bookId = this.$route.params.id
            bookService.get(this.bookId)
                .then(book => {
                    if (book) this.book = book
                    else return Promise.reject
                })
                .catch(() => {
                    this.book = bookService.getEmptyBook()
                })
        } else this.book = bookService.getEmptyBook()


    },
    methods: {
        submitBook() {
            const book = this.book
            const newCategory = this.$refs.newCategory.value
            let categories = []
            const newAuthor = this.$refs.newAuthor.value
            let authors = []
            if (this.bookId) bookService.get(book.id).then(book => {
                book.categories.forEach(category => {
                    if (category && !categories.includes(category)) categories.push(category)
                })
                book.authors.forEach(author => {
                    if (author && !authors.includes(author)) authors.push(author)
                })
                if (newCategory && !categories.includes(newCategory)) categories.push(newCategory)
                if (newAuthor && !authors.includes(newAuthor)) authors.push(newAuthor)
            })
            else {
                if (newCategory) categories.push(newCategory)
                if (newAuthor) authors.push(newAuthor)
            }
            book.categories = categories
            book.authors = authors
            bookService.save(book)
                .then(book=>console.log('fuck', book))
        }
    },
    computed: {

    }
}