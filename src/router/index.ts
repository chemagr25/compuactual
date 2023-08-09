import { createRouter, createWebHashHistory } from 'vue-router'
// 1. Define route components.
// These can be imported from other files
import PublicLayout from '@/layouts/PublicLayout.vue'
import Login from '@/views/Login.vue'
import ServicesAll from '@/views/ServicesAll.vue'
import TechsAll from '@/views/TechsAll.vue'
import ClientsAll from '@/views/ClientsAll.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

import CardDetailsVue from '@/components/CardDetails.vue'
import ClientsDetails from '@/views/ClientsDetails.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.

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

    //* admin-routes
    
    {
      path: '/admin',
      name: 'root-admin',
      component: AdminLayout,
      redirect: () => ({name: 'all-services'}),
      children: [
        {
          path: 'servicios',
          name: 'all-services',
          component: ServicesAll
        },
        {
          path: 'clientes',
          name: 'all-clients',
          component: ClientsAll
        },
        {
          path: 'clientes/:id',
          name: 'clients-details',
          component: ClientsDetails
        },
        {
          path: 'tecnicos',
          name: 'all-techs',
          component: TechsAll
        },
      ]
    }
  ]
})

export default router
