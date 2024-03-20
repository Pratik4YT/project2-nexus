import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDc7GJbiUuVDisIYmTkKQ-ACXp7rewhks0",
  authDomain: "nexus-fce17.firebaseapp.com",
  projectId: "nexus-fce17",
  storageBucket: "nexus-fce17.appspot.com",
  messagingSenderId: "419399641629",
  appId: "1:419399641629:web:aed0633cce791d6c8834f4",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
