export default {
    template: `
    <nav class="main-nav flex justify-center main-layout">
            <label class="flex column col-reverse" for="name">Filter books
                <input
                    id="name" 
                    type="text"
                    @input="setFilter()"
                    v-model="filterBy.name"
                    placeholder="text"/>
            </label>
        
        <label class="flex column col-reverse" for="max-price">Max price
            
            <input
            id="max-price"
            type="number"
            @input="setFilter()"
            v-model="filterBy.toPrice"/>
            </label>
        
        <label class="flex column col-reverse" for="min-price">Min price
            
            <input
            id="min-price"
            type="number"
            @input="setFilter()"
            v-model="filterBy.fromPrice"/>
            </label>
        
        <label class="flex column col-reverse" for="is-on-sale">On sale
            
            <input 
                    id="is-on-sale"
                    type="checkbox"
                    @input="setFilter()"
                    v-model="filterBy.isOnSale"/>
            </label>
        
    </nav>
`,
    data() {
        return {
            filterBy: {
                name: '',
                toPrice: Infinity,
                fromPrice: 0,
                isOnSale: false,
            }
        }
    },
    methods: {
        setFilter() {
            this.filterBy.isOnSale = !this.filterBy.isOnSale
            this.$emit('filter-by', { ...this.filterBy })
        }
    }
}