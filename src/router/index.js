// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },

  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },

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

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authed = localStorage.getItem('auth') === 'true'

  if (to.name === 'Login' && authed) {
    return next(to.query.redirect || '/about')
  }

  if (to.meta.requiresAuth && !authed) {
    return next({ name: 'Login', query: { redirect: to.fullPath, denied: 1 } })
  }

  next()
})

export default router
