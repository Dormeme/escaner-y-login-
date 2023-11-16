// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD-6x6-5ZYwNFtS9yLKrbhgWyVK7St4lo",
  authDomain: "login-sosya.firebaseapp.com",
  projectId: "login-sosya",
  storageBucket: "login-sosya.appspot.com",
  messagingSenderId: "1039864507831",
  appId: "1:1039864507831:web:7a3e16fde6165b04198c32"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase