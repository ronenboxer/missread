export default {
    props: ['book'],
    template: `
        <article class="book-card flex column">
            <h1 class="book-title">{{getFormattedHeader(book.title)}}</h1>
            <img class="book-cover" :src="book.thumbnail" />
            <h2 class="book-price" :class="getClass">{{price}}</h2>
            <router-link :to="'/book/edit/' + book.id">Edit</router-link> 
        </article>
    `,
    data() {
        return {
            price: null,
            goodPrice: 150,
            badPrice: 20
        }
    },
    created() {
        this.getPrice()
    },
    methods: {
        getPrice() {
            let listPrice = this.book.listPrice
            this.price = listPrice.amount
        },
        getFormattedHeader(txt){
            if (txt.length <=17)return txt
            return txt.substring(0,17) + '...'
        }
    },
    computed:{
        getClass() {
            return {green: this.price > this.goodPrice, red: this.price < this.badPrice}
        }
    }
}