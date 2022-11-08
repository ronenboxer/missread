import bookRate from './book-rate.cmp.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export default {
    props: ['book'],
    template: `
    <section class="book-review flex column align-center position-relative">
        <h2 v-if="idx===-1"> New review</h2>
        <button v-else class="btn-review" @click.stop="newReview">New review</button>
        <div class="grid">
            <button class="btn-switch" @click.number="updateIndex(-1)">
                <iconify-icon inline icon="bi:chevron-compact-left"></iconify-icon>
            </button>
            <form v-if="review" id="review-form" @submit.prevent="saveReviews">
                <label class="grid">
                    <span>Full name</span>
                    <input type="text" class="input-name" v-model="review.name"/>
                </label>
                <label class="grid">
                    <span>Rate</span>
                    <book-rate 
                    :review="review"
                    @rateChanged="setRate"/>
                </label>
                <label class="grid">
                    <span>Review</span>
                    <textarea rows="5" v-model="review.review"></textarea>
                </label>
            </form>
            <button class="btn-switch" @click.number="updateIndex(1)">
                <iconify-icon inline icon="bi:chevron-compact-right"></iconify-icon>
            </button>
        </div>
        <button 
            form="review-form"
            class="btn-review">{{idx === -1 ? 'Submit' : 'Update'}}
        </button>
        <button v-if="idx !== -1" class="btn-review position-absolute btn-delete" @click="deleteReview">
            <iconify-icon inline icon="carbon:trash-can"></iconify-icon>
        </button>
        
    </section>
    `,
    data() {
        return {
            idx: -1,
            reviews: null,
            review: null,
        }
    },
    created() {
        if (!this.book.reviews || !this.book.reviews.length) this.reviews = []
        else this.reviews = JSON.parse(JSON.stringify(this.book.reviews))
        this.review = this.getEmptyReview
        console.log(this.review)
    },
    methods: {
        setRate(rate) {
            this.review.rate = rate
        },
        saveReviews() {
            if (this.idx === -1) {
                this.reviews.push(this.review)
                this.idx = this.reviews.length - 1
            }
            else this.reviews[this.idx] = this.review
            this.$emit('reviewsSaved', this.reviews, 'saved')
        },
        updateIndex(diff) {
            if (!this.reviews.length) return this.idx = -1
            this.idx = (this.idx + diff + this.reviews.length) % this.reviews.length
            this.reviews = JSON.parse(JSON.stringify(this.book.reviews))
            this.review = this.reviews[this.idx]
        },
        newReview() {
            this.idx = -1
            this.review = this.getEmptyReview
        },
        deleteReview() {
            this.reviews.splice(this.idx, 1)
            this.$emit('reviewsSaved', this.reviews, 'deleted')
            this.updateIndex(1)
        }
    },
    computed: {
        getEmptyReview() {
            return {
                name: 'Book Reader',
                rate: 1,
                readAt: Date.now(),
                review: ''
            }
        }
    },
    components: {
        bookRate
    }
}