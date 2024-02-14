import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlWmcoFkdBU71ubgYCLS65it1EuOL_wD8",
  authDomain: "job-portal-48796.firebaseapp.com",
  projectId: "job-portal-48796",
  storageBucket: "job-portal-48796.appspot.com",
  messagingSenderId: "186767416460",
  appId: "1:186767416460:web:a009a0e8b42f4ec29f2fa9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
