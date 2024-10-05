import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('../views/home/HomePage.vue')
    },
    {
        name: 'others',
        path: '/others',
        component: () => import('../views/component/Nav.vue'),
        children: [
            {
                name: 'contact',
                path: '/contact',
                component: () => import('../views/Others/contact/ContactPage.vue'),
                meta: {title: 'Contact'}
            },
            {
                name: 'TimeTravel',
                path: '/TimeTravel',
                component: () => import('../views/Others/T-Travel/TimeTravelPage.vue'),
                meta: {title: 'Time-Travel'}

            },
            {
                name: 'about',
                path: '/about',
                component: () => import('../views/Others/about/AboutPage.vue'),
                meta: {title: 'About'}
            },
            {
                name: 'arts',
                path: '/arts',
                children: [
                    {
                        name: 'blogs',
                        path: '/blogs',
                        component: () => import('../views/arts/blogs/BlogsPage.vue'),
                        meta: {title: 'Blogs'}
                    },
                    {
                        name: 'poetry',
                        path: '/poetry',
                        component: () => import('../views/arts/poetry/PoetryPage.vue'),
                        meta: {title: 'Poetry'}
                    }
                ]
            },

        ]
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router
