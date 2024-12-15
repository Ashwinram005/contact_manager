// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB25oqXr2y3-OBzGZkt9iwQh73KsZBTI7E",
  authDomain: "contact-manager-a863a.firebaseapp.com",
  projectId: "contact-manager-a863a",
  storageBucket: "contact-manager-a863a.firebasestorage.app",
  messagingSenderId: "1038732526328",
  appId: "1:1038732526328:web:fc3e0567f122172ed8f10d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }; 