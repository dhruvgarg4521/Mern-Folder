// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-1082c.firebaseapp.com",
  projectId: "mern-blog-1082c",
  storageBucket: "mern-blog-1082c.firebasestorage.app",
  messagingSenderId: "290881690451",
  appId: "1:290881690451:web:817a92a17bcbb6dcd61fa6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);