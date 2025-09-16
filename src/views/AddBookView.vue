<template>
  <div>
    <h1>Add Book</h1>

    <form @submit.prevent="addBook">
      <div>
        <label for="isbn" class="me-2">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>

      <div class="mt-3">
        <label for="name" class="me-2">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>

      <button class="mt-3" type="submit">Add Book</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '@/firebase/init'
import { collection, addDoc } from 'firebase/firestore'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  const isbnNumber = parseInt(isbn.value, 10)
  if (!Number.isInteger(isbnNumber)) {
    alert('ISBN must be a valid number')
    return
  }

  try {
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value.trim()
    })
    isbn.value = ''
    name.value = ''
    alert('Book added successfully!')
  } catch (err) {
    console.error('Error adding book:', err)
    alert('Failed to add book')
  }
}
</script>
