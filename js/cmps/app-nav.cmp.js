export default {
    template: `
    <nav class="main-nav full">
            <ul class="main-layout flex">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/book">Books</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/book/edit">Add book</router-link></li>
            </ul> 
        </nav>
    `
}

