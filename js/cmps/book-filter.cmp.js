export default {
    template: `
    <nav class="main-nav flex justify-center main-layout">
        <ul class="filter-list inline-block  flex column align-center">
            <li><input
                    id="name" 
                    type="text"
                    @input="setFilter()"
                    v-model="filterBy.name"
                    placeholder="text"/></li>
            <li><label for="name">Filter books</label></li>
        </ul>
        <ul class="filter-list inline-block flex column align-center">
            <li><input
            id="max-price"
            type="number"
            @input="setFilter()"
            v-model="filterBy.toPrice"/></li>
            <li><label for="max-price">Max price</label></li>
        </ul>
        <ul class="filter-list inline-block flex column align-center">
            <li><input
            id="min-price"
            type="number"
            @input="setFilter()"
            v-model="filterBy.fromPrice"/></li>
            <li><label for="min-price">Min price</label></li>
        </ul>
        <ul class="filter-list inline-block flex column align-center">
            <li><input 
                    id="is-on-sale"
                    type="checkbox"
                    @input="setFilter()"
                    v-model="filterBy.isOnSale"/></li>
            <li><label for="is-on-sale">On sale</label></li>
        </ul>
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