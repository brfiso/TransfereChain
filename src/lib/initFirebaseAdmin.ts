import admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { Firestore, getFirestore } from "firebase-admin/firestore";

// Create Server-Side Instance of Firebase
export default function initializeFirebaseServer(): {
  db: Firestore;
  auth: Auth;
} {
  const clientEmail = import.meta.env.VITE_FIREBASE_CLIENT_EMAIL;
  const privateKey = (import.meta.env.VITE_FIREBASE_PRIVATE_KEY as string).replace(
    /\\n/g,
    "\n"
  );
  const projectId = import.meta.env.VITE_PUBLIC_PROJECT_ID;

  if (admin.apps.length === 0) {
    initializeApp({
      credential: cert({
        clientEmail,
        privateKey,
        projectId,
      }),
    });
  }

  const db = getFirestore();
  const auth = getAuth();

  return {
    db,
    auth,
  };
}