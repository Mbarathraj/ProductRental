// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCg5WGdxCn3506DdfT7CDa-7W9QjWDGczA",
    authDomain: "product-rental.firebaseapp.com",
    projectId: "product-rental",
    storageBucket: "product-rental.appspot.com",
    messagingSenderId: "308148629040",
    appId: "1:308148629040:web:a1f1d871d5f51e28afc7f5",
    measurementId: "G-DX8MQ8W97L",
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
