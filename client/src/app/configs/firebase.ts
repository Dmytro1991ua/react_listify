import 'firebase/compat/auth';

import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { getStorage } from 'firebase/storage';

const app = firebase.initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_MESSAGING_APP_ID,
});

export const auth = getAuth(app);
export const storage = getStorage(app, import.meta.env.VITE_STORAGE_BUCKET);

export default app;
