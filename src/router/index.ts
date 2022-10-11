import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/password/listar',
    name: 'password-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/password/password-list.vue')

  },
  {
    path: '/password/listar',
    name: 'password-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/password/password-list.vue')
  },
  {
    path: '/password/form',
    name: 'password-form',
    component: () => import(/* webpackChunkName: "form" */ '../views/password/password-form.vue')
  },
  {
    path: '/password/form/:model/:id',
    name: 'password-detalhar',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import(/* webpackChunkName: "form" */ '../views/password/password-form.vue')
  },

  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
