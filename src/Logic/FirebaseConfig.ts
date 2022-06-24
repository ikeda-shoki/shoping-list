import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_DB_API_KEY,
  authDomain: import.meta.env.VITE_DB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_DB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_DB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_DB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_DB_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const firesStore = getFirestore();
export const shopingList = db.collection("shopingList");
export default firebase;
