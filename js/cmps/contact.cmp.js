import { utilService } from '../services/utils.service.js'
import aboutNav from '../cmps/about-nav.cmp.js'

export default {
    template: `
    <section>
       <about-nav/>
            <form class="contact-form main-layout about-content">
                <div><input type="text" placeholder="Full name" /></div>
                <div><input type="text" placeholder="Email" /></div>
                <div><input type="text" placeholder="Subject" /></div>
                <div><textarea placeholder="Write to us" rows="5"></textarea></div>
            </form>

</section>
    `,
    data(){
        return{

        }
    },
    components: {
        aboutNav
    },
    methods:{
        submit(){

        }
    }
}