import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCxNba1-JlPDKpPjSkcreCJhz1ZOfpXisk',
  authDomain: 'dkheni-library.firebaseapp.com',
  projectId: 'dkheni-library',
  storageBucket: 'dkheni-library.firebasestorage.app',
  messagingSenderId: '62288709044',
  appId: '1:62288709044:web:fe8127eab24e862b191ee1'
}

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
