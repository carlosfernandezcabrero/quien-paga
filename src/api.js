import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from './lib/firebase'

const api = {
  groups: {
    listObserver: (uid, setter) =>
      onSnapshot(collection(db, uid), (docs) => {
        setter(docs)
      }),
    list: async (uid) =>
      await getDocs(collection(db, uid)).then((res) =>
        res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      ),
    create: async (uid, data) =>
      await addDoc(collection(db, uid), { ...data, status: 0 }),
    byIdObserver: (uid, id, setter) =>
      onSnapshot(doc(collection(db, uid), id), (doc) => {
        setter(doc)
      }),
    update: async (uid, id, data) =>
      await updateDoc(doc(collection(db, uid), id), data),
    delete: async (uid, id) => await deleteDoc(doc(collection(db, uid), id)),
    numParticipantsObserver: (uid, id, setter) =>
      onSnapshot(collection(db, uid, id, 'participants'), (docs) => {
        setter(docs.size)
      })
  },
  participants: {
    create: async (uid, group, participant, data) =>
      await setDoc(
        doc(collection(db, uid, group, 'participants'), participant),
        data
      ),
    byGroupIdObserver: (uid, id, setter) =>
      onSnapshot(collection(db, uid, id, 'participants'), (docs) => {
        setter(docs)
      }),
    deleteById: async (uid, group, participant) =>
      await deleteDoc(
        doc(collection(db, uid, group, 'participants'), participant)
      ),
    update: async (uid, group, participant, data) =>
      await updateDoc(
        doc(collection(db, uid, group, 'participants'), participant),
        data
      )
  }
}

export default api
