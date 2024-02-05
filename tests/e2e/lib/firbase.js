import dotenv from 'dotenv'
import { cert, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from '../../../serviceAccountKey.json'

dotenv.config({ path: '.env.testing' })

initializeApp({
  projectId: process.env.PROJECT_ID,
  credential: cert(serviceAccount)
})

const db = getFirestore()
export const auth = getAuth()

const firebaseAdmin = {
  auth: {
    deleteAllUsers: async () => {
      const { users } = await auth.listUsers()
      const uids = users.map(({ uid }) => uid)

      await auth.deleteUsers(uids)
    }
  },
  db: {
    deleteAllGroups: async () => {
      db.listCollections().then((collections) => {
        collections.forEach((collection) => {
          collection.listDocuments().then((documents) => {
            documents.forEach(async (doc) => {
              await doc
                .collection('participants')
                .listDocuments()
                .then((participants) => {
                  participants.forEach(async (participant) => {
                    await participant.delete()
                  })
                })

              await doc.delete()
            })
          })
        })
      })
    }
  }
}

export default firebaseAdmin
