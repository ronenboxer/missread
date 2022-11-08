export default {
    props: ['categories'],
        template: `
            Categories: 
            <div class="book-categories main-font">
                <span class="inline-block" 
                    v-for="(category, idx) in categories">
                    <a 
                        class="book-category"
                        @click="$emit('filter', {category})"
                        href="#">
                        {{category}}</a>
                </span>
            </div>
            `
}