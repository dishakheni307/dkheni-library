<template>
  <div>
    <h2 class="mb-3 mt-5">Manage Books</h2>
    <ul>
      <li v-for="b in books" :key="b.id" style="margin-bottom: 8px">
        <template v-if="editingId === b.id">
          <input v-model="editName" placeholder="Name" />
          <input v-model.number="editIsbn" placeholder="ISBN (number)" />
          <button @click="save(b.id)">Save</button>
          <button @click="cancel">Cancel</button>
        </template>
        <template v-else>
          <strong>{{ b.name }}</strong> — ISBN: {{ b.isbn }}
          <button
            style="background-color: green; border: none"
            class="me-2 text-white p-2"
            @click="startEdit(b)"
          >
            Edit
          </button>
          <button
            class="text-white p-2"
            @click="remove(b.id)"
            style="background-color: darkred; border: none"
          >
            Delete
          </button>
        </template>
      </li>
    </ul>
    <p v-if="books.length === 0">No books yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '@/firebase/init'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const books = ref([])
const editingId = ref(null)
const editName = ref('')
const editIsbn = ref(null)

const fetchAll = async () => {
  const snap = await getDocs(collection(db, 'books'))
  books.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

function startEdit(b) {
  editingId.value = b.id
  editName.value = b.name
  editIsbn.value = b.isbn
}
function cancel() {
  editingId.value = null
  editName.value = ''
  editIsbn.value = null
}

async function save(id) {
  if (!Number.isInteger(+editIsbn.value)) {
    alert('ISBN must be a number')
    return
  }
  await updateDoc(doc(db, 'books', id), {
    name: editName.value.trim(),
    isbn: +editIsbn.value
  })
  await fetchAll()
  cancel()
  alert('Updated!')
}

async function remove(id) {
  if (!confirm('Delete this book?')) return
  await deleteDoc(doc(db, 'books', id))
  books.value = books.value.filter((b) => b.id !== id) // optimistic UI
}

onMounted(fetchAll)
</script>
