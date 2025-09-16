<template>
  <div>
    <h2>Query Demos</h2>

    <h3>1) where('isbn','>',1000)</h3>
    <ul>
      <li v-for="b in q1" :key="b.id">{{ b.name }} — {{ b.isbn }}</li>
    </ul>

    <h3>2) orderBy('name')</h3>
    <ul>
      <li v-for="b in q2" :key="b.id">{{ b.name }} — {{ b.isbn }}</li>
    </ul>

    <h3>3) orderBy('isbn','desc') + limit(3)</h3>
    <ul>
      <li v-for="b in q3" :key="b.id">{{ b.name }} — {{ b.isbn }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '@/firebase/init'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'

const q1 = ref([]) // where
const q2 = ref([]) // orderBy
const q3 = ref([]) // orderBy + limit

onMounted(async () => {
  // 1) where
  let snap = await getDocs(query(collection(db, 'books'), where('isbn', '>', 1000)))
  q1.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))

  // 2) orderBy
  snap = await getDocs(query(collection(db, 'books'), orderBy('name')))
  q2.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))

  // 3) orderBy + limit
  snap = await getDocs(query(collection(db, 'books'), orderBy('isbn', 'desc'), limit(3)))
  q3.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
})
</script>
