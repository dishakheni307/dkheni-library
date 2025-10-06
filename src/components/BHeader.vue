<script setup>
import { RouterLink, useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

const authed = ref(false)
const username = ref('')
const role = ref('')

function refreshAuth() {
  authed.value = localStorage.getItem('auth') === 'true'
  username.value = localStorage.getItem('user') || ''
  role.value = localStorage.getItem('role') || ''
}
function doLogout() {
  localStorage.removeItem('auth')
  localStorage.removeItem('user')
  localStorage.removeItem('role')
  console.log('current user: ', username.value)
  refreshAuth()
  router.push({ name: 'Login' })
}

onMounted(refreshAuth)
onBeforeRouteUpdate(() => {
  refreshAuth()
})
</script>

<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link" active-class="active" aria-current="page">
            Home (Week 5)
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/about" class="nav-link" active-class="active"> About </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink to="/addbook" class="nav-link" active-class="active">Add Book</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink to="/GetBookCount" class="nav-link" active-class="active"
            >Get Book Count</RouterLink
          >
        </li>

        <!-- <li class="nav-item">
          <RouterLink to="/FireLogin" class="nav-link" active-class="active">
            Firebase Login
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/FireRegister" class="nav-link" active-class="active">
            Firebase Register
          </RouterLink>
        </li> -->
      </ul>

      <div class="d-flex align-items-center gap-2">
        <span v-if="authed" class="text-muted">Hi, {{ role }}</span>
        <RouterLink v-if="!authed" to="/login" class="btn btn-outline-primary btn-sm"
          >Login</RouterLink
        >
        <button v-else class="btn btn-danger btn-sm" @click="doLogout">Logout</button>
      </div>
    </header>
  </div>
</template>

<style scoped>
/* your existing styles kept */
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}
</style>
