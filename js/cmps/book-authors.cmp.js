export default {
    props:['authors'],
    template: `
        <div class="book-authors main-font">
            <div class="bold">By </div> 
                <span v-for="(author, idx) in authors">
                        <a 
                            class="book-author"
                            @click="$emit('filter', {author,author})"
                            href="#">
                            {{author}}</a>
            </span>  
        </div>  
    `
}