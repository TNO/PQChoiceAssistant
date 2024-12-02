import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../js/modules/pages/homepage/HomePage.vue'
import KEMPage from '../js/modules/pages/kempage/KEMPage.vue'
import DSSPage from '../js/modules/pages/dsspage/DSSPage.vue'
import EducationPage from '@/js/modules/pages/educationpage/EducationPage.vue'
import AboutPage from '@/js/modules/pages/aboutpage/AboutPage.vue'

const router = createRouter({
  history: createWebHistory('/PQChoiceAssistant'),
  routes: [
    {
      path: '/',
      name: 'HomePageRoute',
      component: HomePage,
      meta: { title: 'Home' }
    },
    {
      path: '/kem',
      name: 'KEMPageRoute',
      component: KEMPage
    },
    {
      path: '/dss',
      name: 'DSSPageRoute',
      component: DSSPage
    },
    {
      path: '/algorithm-overview',
      name: 'AlgorithmOverviewPageRoute',
      component: EducationPage
    },
    {
      path: '/about',
      name: 'AboutPageRoute',
      component: AboutPage
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
