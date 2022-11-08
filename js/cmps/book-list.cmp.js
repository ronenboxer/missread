import bookPreview from "./book-preview.cpm.js"

export default {
    props: ['books'],
    template: `
    <section class="grid books-container justify-center">
        <router-link 
            v-for="book in books"
            :to="'/book/' + book.id"> 
            <book-preview
                :book="book"
                :key="book.id"/>
        </router-link>
    </section>
    `,
    components: {
        bookPreview
    }
}