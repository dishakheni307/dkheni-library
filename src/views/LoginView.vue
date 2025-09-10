    <script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

const DEMO_USER = 'admin'
const DEMO_PASS = 'Library@123'

function onSubmit() {
  error.value = ''
  if (username.value.trim() === DEMO_USER && password.value === DEMO_PASS) {
    // persist minimal auth
    localStorage.setItem('auth', 'true')
    localStorage.setItem('user', username.value.trim())
    // go to intended page or About
    const dest = route.query.redirect || '/about'
    router.replace(dest)
  } else {
    localStorage.removeItem('auth'); localStorage.removeItem('user')
    error.value = 'Invalid username or password.'
  }
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-6 col-lg-4">
      <h2 class="mb-3 text-center">Login</h2>

      <div v-if="route.query.denied" class="alert alert-warning py-2">
        Access denied. Please log in to continue.
      </div>

      <form @submit.prevent="onSubmit" class="card p-3 shadow-sm">
        <div class="mb-3">
          <label class="form-label" for="user">Username</label>
          <input id="user" v-model="username" class="form-control" autocomplete="username" />
        </div>
        <div class="mb-3">
          <label class="form-label" for="pass">Password</label>
          <input id="pass" v-model="password" type="password" class="form-control" autocomplete="current-password" />
        </div>
        <button class="btn btn-primary w-100" type="submit">Sign in</button>

        <p class="mt-3 small text-muted mb-0">
          Demo: <code>admin</code> / <code>Library@123</code>
        </p>
        <p v-if="error" class="text-danger small mt-2 mb-0">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
