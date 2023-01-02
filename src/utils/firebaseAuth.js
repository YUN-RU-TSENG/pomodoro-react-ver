import { getAuth } from 'firebase/auth'
import { app } from './firebaseApp'

// 初始化 auth 實體
// doc: https://firebase.google.com/docs/reference/js/auth#onauthstatechanged
const auth = getAuth(app)

export { auth }
