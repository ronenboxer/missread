import { utilService } from '../services/utils.service.js'
import aboutNav from '../cmps/about-nav.cmp.js'

export default {
    template: `
    <section>
       <about-nav/>
            <p v-for="i in 4" class="about-paragraph about-content main-layout">{{loremIpsum()}}</p>

</section>
    `,
    components: {
        aboutNav
    },
    methods:{
        loremIpsum(){
            return utilService.lorem()
        }  
    },
    computed: {
    }
}