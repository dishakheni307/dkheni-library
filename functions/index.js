const { setGlobalOptions } = require('firebase-functions')
const logger = require('firebase-functions/logger')
const { onRequest } = require('firebase-functions/v2/https')
const { onDocumentCreated } = require('firebase-functions/v2/firestore')

const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

// Limit function container instances
setGlobalOptions({ maxInstances: 10 })

// Initialize Firebase Admin
admin.initializeApp()

// Cloud Function: countBooks
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const count = snapshot.size

      res.status(200).send({ count })
    } catch (error) {
      console.error('Error counting books:', error.message)
      res.status(500).send('Error counting books')
    }
  })
})

exports.capitalizeBookData = onDocumentCreated('books/{bookId}', async (event) => {
  const doc = event.data
  if (!doc) return

  const data = doc.data()
  const updatedData = {}

  for (const field in data) {
    if (typeof data[field] === 'string') {
      updatedData[field] = data[field].toUpperCase()
    }
  }

  await doc.ref.update(updatedData)
  console.log('Capitalized book data:', updatedData)
})
