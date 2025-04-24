import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCCR-SSztfbHIifM6VZ_dDiUIttWr291TA",
  authDomain: "login-app-56a41.firebaseapp.com",
  projectId: "login-app-56a41",
  storageBucket: "login-app-56a41.firebasestorage.app",
  messagingSenderId: "733185009729",
  appId: "1:733185009729:web:91c8d51bcd9f75a145bec0",
  measurementId: "G-3GR2K3Y6WZ",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
