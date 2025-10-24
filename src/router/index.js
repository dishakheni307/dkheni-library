// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import Admin from '@/views/Admin.vue'
import Member from '@/views/Member.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
  { path: '/addbook', name: 'AddBook', component: AddBookView },

  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/member',
    name: 'member',
    component: Member,
    meta: { requiresAuth: true }
  },
  { path: '/login', name: 'Login', component: LoginView, meta: { public: true } },
  { path: '/denied', name: 'Denied', component: AccessDenied, meta: { public: true } },

  {
    path: '/logout',
    name: 'Logout',
    meta: { public: true },
    component: {
      template: '<div class="alert alert-info">Logging out…</div>',
      mounted() {
        localStorage.removeItem('auth')
        localStorage.removeItem('user')
        this.$router.replace({ name: 'Login' })
      }
    }
  },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView },
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView },
  { path: '/GetBookCount', name: 'GetBookCount', component: GetBookCountView },
  { path: '/WeatherCheck', name: 'WeatherCheck', component: WeatherView },
  { path: '/CountBookAPI', name: 'CountBookAPI', component: CountBookAPI },
  { path: '/GetAllBookAPI', name: 'GetAllBookAPI', component: GetAllBookAPI },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true'
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresAdmin && role !== 'admin') {
    next({ path: '/denied' })
  } else {
    next()
  }
})

export default router
