import {createRouter,createWebHistory} from "vue-router"

const Home = () => import('../view/Home')
const About = () => import('../view/About')

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/about',
            component: About
        },
    ]
})