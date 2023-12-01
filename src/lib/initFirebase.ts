import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

// Create Client-Side Instance of Firebase
export default function initializeFirebaseClient(): {
  db: Firestore;
  auth: Auth;
} {
  const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_PUBLIC_API_KEY,
    authDomain: import.meta.env.VITE_PUBLIC_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PUBLIC_PROJECT_ID,
    storageBucket: import.meta.env.VITE_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_PUBLIC_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_PUBLIC_APP_ID,
  });

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  return {
    db,
    auth,
  };
}