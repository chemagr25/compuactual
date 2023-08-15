import { createRouter, createWebHashHistory } from 'vue-router'

import PublicLayout from '@/layouts/PublicLayout.vue'
import Login from '@/views/Login.vue'
import ServicesAll from '@/views/ServicesAll.vue'
import TechsAll from '@/views/TechsAll.vue'
import ClientsAll from '@/views/ClientsAll.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import UserHome from '@/views/UserHome.vue'
// import CardDetailsVue from '@/components/CardDetails.vue'
import ClientsDetails from '@/views/ClientsDetails.vue'
import TechsDetails from '@/views/TechsDetails.vue'
import ServicesDetails from '@/views/ServicesDetails.vue'

import { UserGuard, LoginGuard, pivot } from '@/router/auth-guards'

import HomeVue from '@/views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      component: PublicLayout,
      redirect: () => ({ name: 'login' }),
      children: [
        {
          path: 'login',
          beforeEnter: [LoginGuard],
          name: 'login',
          component: Login
        }
      ]
    },
    {
      path: '/pivot',
      name: 'pivot',
      beforeEnter: [pivot],
      component: HomeVue
    },
    {
      path: '/home',
      name: 'user-home',

      component: UserHome
    },

    //* admin-routes

    {
      path: '/admin',
      name: 'root-admin',
      // beforeEnter: [UserGuard],
      component: AdminLayout,
      redirect: () => ({ name: 'all-services' }),
      children: [
        {
          path: '/servicios',
          name: 'all-services',
          beforeEnter: [UserGuard],
          component: ServicesAll
        },
        {
          path: '/servicios/:id',
          name: 'services-details',
          // beforeEnter: [UserGuard],
          component: ServicesDetails
        },
        {
          path: '/clientes',
          name: 'all-clients',
          beforeEnter: [UserGuard],
          component: ClientsAll
        },
        {
          path: '/clientes/:id',
          name: 'clients-details',
          component: ClientsDetails
        },
        {
          path: '/tecnicos',
          name: 'all-techs',
          beforeEnter: [UserGuard],
          component: TechsAll
        },
        {
          path: '/tecnicos/:id',
          name: 'tech-details',
          component: TechsDetails
        }
      ]
    }
  ]
})

export default router
