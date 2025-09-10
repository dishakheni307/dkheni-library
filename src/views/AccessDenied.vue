<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  // pause briefly then forward to login, preserving intended target
  const redirect = route.query.redirect || route.query.to || '/about'
  setTimeout(() => {
    router.replace({ name: 'Login', query: { redirect, denied: 1 } })
  }, 1200)
})
</script>

<template>
  <div class="alert alert-warning" role="alert">
    Access denied. Redirecting to Login…
  </div>
</template>
