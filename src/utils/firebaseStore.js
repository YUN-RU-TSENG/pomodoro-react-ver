import { getFirestore } from 'firebase/firestore'

import { app } from './firebaseApp'

// 初始化 Firestore Instance
// doc: https://firebase.google.com/docs/reference/js/firestore_#getfirestore
const db = getFirestore(app)

export { db }
