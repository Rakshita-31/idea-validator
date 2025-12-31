import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnkqHl146yWkIm-3puKFph-NImtHT8_b8",
  authDomain: "ideavalidator-a0a7b.firebaseapp.com",
  projectId: "ideavalidator-a0a7b",
  storageBucket: "ideavalidator-a0a7b.firebasestorage.app",
  messagingSenderId: "635453440346",
  appId: "1:635453440346:web:131e2c9c3eda210dbb3363"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;