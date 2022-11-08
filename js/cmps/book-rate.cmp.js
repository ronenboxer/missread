export default {
    props: ['review'],
    template: ` 
    <p class="book-rating">
        <span 
            v-for="idx in 5"
            @click="setRate(idx)">
                <span v-if="idx<=rate">
                    <iconify-icon class="rate-star-checked" inline icon="ic:baseline-star-rate"></iconify-icon>
                </span>
                <span v-else>
                    <iconify-icon class="rate-star-unchecked" inline icon="ic:baseline-star-outline"></iconify-icon>
                </span>
        </span>
    </p>
    `,
    data() {
        return {
            rate: this.$props.review.rate
        }
    },
    created() {
        // console.log(this.rate)
        // this.setStarArr(this.rate)
    },
    methods: {
        setStarArr(rate) {
            this.starArr=[]
            for (let i = 0; i < 5; i++) {
                if (i<rate) this.starArr.push('full')
                else this.starArr.push('boder')
            }
        },
        setRate(rate){
            this.rate=rate
            this.$emit('rateChanged',rate)
        }
    },
    watch: {
        review:{
            handler(){
                console.log(this.review.rate)
            },
            deep: true
        }
    }
}