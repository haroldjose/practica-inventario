import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/activo',
  //   name: 'activo',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "activo" */ '../views/ActivoView.vue')
  // },
  {
    path: '/area',
    name: 'area',
    component: () => import(/* webpackChunkName: "area" */ '../views/AreaView.vue')
  },
  {
    path: '/activo',
    name: 'activo',
    component: () => import(/* webpackChunkName: "activo" */ '../views/ActivoView.vue')
  },
  {
    path: '/area/:id',
    name: 'areaUpdate',
    component: () => import(/* webpackChunkName: "areaUpdate" */ '../views/AreaUpdateView.vue')
  },
  {
    path: '/activo/:id',
    name: 'activoUpdate',
    component: () => import(/* webpackChunkName: "activoUpdate" */ '../views/ActivoUpdateView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
