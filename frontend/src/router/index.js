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
        name: 'works',
        path: '/works',
        children: [
            {
                name: 'JS',
                path: '/JS',
                component: () => import('../views/works/JS/JSPage.vue'),
                meta: {title: 'JS'}
            },
            {
                name: 'C-C++',
                path: '/C-C++',
                component: () => import('../views/works/C++/C++Page.vue'),
                meta: {title: 'C/C++'}
            },
            {
                name: 'DBMS',
                path: '/DBMS',
                component: () => import('../views/works/DBMS/DBMSPage.vue'),
                meta: {title: 'DBMS'}
            }
            //     works routes
        ]
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
            {
                name: 'recent',
                path: '/recent',
                component: () => import('../views/recent/RecentPage.vue'),
                meta: {title: 'Recent'}
            },

            // others routes
        ]
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router
