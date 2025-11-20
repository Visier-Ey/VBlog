import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/BFrame',
        component: () => import('../views/frames/BFrame/BFrame.vue'),
        children: [
            {
                name: 'home',
                path: '/home',
                component: () => import('../views/home/HomePage.vue')
            },
            {
                name: 'works',
                path: '/works',
                component: () => import('../views/components/Nav/components/UniversalNav.vue'),
                children: [
                   {
                        name: 'Tech',
                        path: '/Tech',
                        component: () => import('../views/works/Tech/techPage.vue'),
                        meta: { title: 'Tech' }
                    }, {
                        name: 'Projects',
                        path: '/Projects',
                        component: () => import('../views/works/Projects/ProjectsPage.vue'),
                        meta: { title: 'Projects' }
                    }
                    //     works routes
                ]
            },
            {
                name: 'others',
                path: '/others',
                component: () => import('../views/components/Nav/components/UniversalNav.vue'),
                children: [
                    {
                        name: 'contact',
                        path: '/contact',
                        component: () => import('../views/Others/contact/ContactPage.vue'),
                        meta: { title: 'Contact' }
                    },
                    {
                        name: 'TimeTravel',
                        path: '/TimeTravel',
                        component: () => import('../views/Others/T-Travel/TimeTravelPage.vue'),
                        meta: { title: 'Time-Travel' }

                    },
                    {
                        name: 'about',
                        path: '/about',
                        component: () => import('../views/Others/about/AboutPage.vue'),
                        meta: { title: 'About' }
                    },
                    // {
                    //     name: 'arts',
                    //     path: '/arts',
                    //     children: [
                    //         {
                    //             name: 'blogs',
                    //             path: '/blogs',
                    //             component: () => import('../views/arts/blogs/BlogsPage.vue'),
                    //             meta: {title: 'Blogs'}
                    //         },
                    //         {
                    //             name: 'poetry',
                    //             path: '/poetry',
                    //             component: () => import('../views/arts/poetry/PoetryPage.vue'),
                    //             meta: {title: 'Poetry'}
                    //         }
                    //     ]
                    // },
                    {
                        name: 'recent',
                        path: '/recent',
                        component: () => import('../views/recent/RecentPage.vue'),
                        meta: { title: 'Recent' }
                    },

                    // others routes
                ]
            }
            , {
                name: 'visitorProfile',
                path: '/visitorProfile',
                component: () => import('../views/visitor/VisitorPage.vue'),
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router
