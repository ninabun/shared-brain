import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBvQB6kDeESYmj-D0xFsapd-3ep-wM0xlw",
  authDomain: "sharedbrain-92f19.firebaseapp.com",
  projectId: "sharedbrain-92f19",
  storageBucket: "sharedbrain-92f19.firebasestorage.app",
  messagingSenderId: "255412023495",
  appId: "1:255412023495:web:9e459b8d9ce78d5a884ee2",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
