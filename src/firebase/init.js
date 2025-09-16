// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'

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
initializeApp(firebaseConfig)
const db = getFirestore()
export default db
