<script setup>
import { ref } from 'vue'
const member = ref('')

member.value = localStorage.getItem('user')
</script>

<template>
  <h1>hi {{ member }}</h1>
</template>
