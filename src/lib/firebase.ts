import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'havelink-d4790.firebaseapp.com',
  projectId: 'havelink-d4790',
  storageBucket: 'havelink-d4790.firebasestorage.app',
  messagingSenderId: '292631802347',
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: 'G-HHJVLZ15FE',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const firebase = getFirestore(app)

export const analytics = getAnalytics(app)
