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

import { UserGuard } from '@/router/auth-guards'
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
          name: 'login',
          component: Login
        }
      ]
    },
    {
      path: '/pivot',
      name: 'pivot',
      beforeEnter: [UserGuard],
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
      component: AdminLayout,
      redirect: () => ({ name: 'all-services' }),
      children: [
        {
          path: '/servicios',
          name: 'all-services',
          component: ServicesAll
        },
        {
          path: '/servicios/:id',
          name: 'services-details',
          component: ServicesDetails
        },
        {
          path: '/clientes',
          name: 'all-clients',
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
