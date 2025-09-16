<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div class="mt-2">
        <label for="isbn" class="me-2">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div class="mt-2">
        <label for="name" class="me-2">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button class="mt-2" type="submit">Add Book</button>
    </form>

    <BookList />
    <BookQueries />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '@/firebase/init'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '@/components/BookList.vue'
import BookQueries from '@/components/BookQueries.vue'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  const isbnNumber = parseInt(isbn.value, 10)
  if (!Number.isInteger(isbnNumber)) {
    alert('ISBN must be a valid number')
    return
  }
  await addDoc(collection(db, 'books'), {
    isbn: isbnNumber,
    name: name.value.trim()
  })
  isbn.value = ''
  name.value = ''
  alert('Book added successfully!')
}
</script>
