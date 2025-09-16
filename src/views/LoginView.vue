<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'Library@123'

function onSubmit() {
  error.value = ''
  const inputUser = username.value.trim()
  const inputPass = password.value

  if (inputUser === ADMIN_USER && inputPass === ADMIN_PASS) {
    localStorage.setItem('auth', 'true')
    localStorage.setItem('user', inputUser)
    localStorage.setItem('role', 'admin')
    const dest = route.query.redirect || '/admin'
    router.replace(dest)
    return
  }
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const found = users.find((u) => u.username === inputUser && u.password === inputPass)

  if (found) {
    localStorage.setItem('auth', 'true')
    localStorage.setItem('user', found.username)
    localStorage.setItem('role', found.role) // usually "member"
    const dest = route.query.redirect || '/about'
    router.replace(dest)
  } else {
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    error.value = 'Invalid username or password.'
  }
}
</script>

<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <input v-model="username" placeholder="Username" />
      <br></br>
      <input class="mt-2" v-model="password" type="password" placeholder="Password" />
      <br></br>
      <button class="mt-2" type="submit">Login</button>
      <p v-if="error" style="color: red">{{ error }}</p>
    </form>
  </div>
</template>
