export default {
    props: ['description','maxLength'],
    template: `
        <p class="book-description main-font" >{{isLong ? formattedDescription : description}}
            <a
                v-if="isLong"
                class="description-toggle read-more"
                @click="toggleExpandDescription">
                {{linkText}}
            </a>
        </p>
    `,
    data() {
        return {
            formattedDescription: '',
            isExpanded: false
        }
    },
    created() {
        this.setFormattedDescription(this.isExpanded)
    },
    methods: {
        toggleExpandDescription() {
            this.isExpanded = !this.isExpanded;
            this.setFormattedDescription()
        },
        setFormattedDescription() {
            this.formattedDescription = this.isExpanded ? this.description : this.description.slice(0, this.maxLength)+'...'
        }
    },
    computed: {
        isLong() {
            return this.description.length > this.maxLength;
        },
        linkText(){
            return this.isExpanded ? 'Read less' : 'Read more' 
        }
    }
}