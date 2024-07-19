// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import BabiesView from '../views/BabiesView.vue'
import BabyDetailView from '../views/BabyDetailView.vue'
import BabyNutritionView from '../views/BabyNutritionView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: BabiesView
  },
  {
    path: '/babies',
    name: 'Babies',
    component: BabiesView
  },
  {
    path: '/baby/:id',
    name: 'BabyDetail',
    component: BabyDetailView,
    props: true
  },
  {
    path: '/baby/:id',
    name: 'dashboard',
    component: BabyDetailView,
    props: true
  },
  {
    path: '/baby/:id/nutrition',
    name: 'nutrition',
    component: BabyNutritionView,
    props: true
  },
  {
    path: '/baby/:id/growth',
    name: 'growth',
    component: BabyDetailView,
    props: true
  },
  {
    path: '/baby/:id/diaper',
    name: 'diaper',
    component: BabyDetailView,
    props: true
  },
  {
    path: '/baby/:id/sleep',
    name: 'sleep',
    component: BabyDetailView,
    props: true
  },
  {
    path: '/baby/:id/settings',
    name: 'settings',
    component: BabyDetailView,
    props: true
  }

  // Add other routes here as needed
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
