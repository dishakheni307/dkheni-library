<template>
  <div class="container mt-4">
    <h1 class="mb-3">All Books – API JSON View</h1>

    <pre v-if="booksJSON">{{ booksJSON }}</pre>
    <p v-else>Loading book data…</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GetAllBookAPI',
  data() {
    return { booksJSON: null }
  },
  async mounted() {
    await this.fetchBooks()
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('https://getallbooks-o7p26ak3ca-uc.a.run.app')

        this.booksJSON = JSON.stringify(response.data, null, 2)
      } catch (error) {
        console.error('Error fetching books:', error)
        this.booksJSON = 'Error fetching book data.'
      }
    }
  }
}
</script>

<style scoped>
pre {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
