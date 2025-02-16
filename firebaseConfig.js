import { initializeApp } from "firebase/app";

import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQBeJUrdt99QuihLgTPtv9HpPebsUt7qU",
  authDomain: "elevated-column-445717-h4.firebaseapp.com",
  projectId: "elevated-column-445717-h4",
  storageBucket: "elevated-column-445717-h4.firebasestorage.app",
  messagingSenderId: "580447110631",
  appId: "1:580447110631:web:2a41bf1ee57eb266c9a942",
  measurementId: "G-F4K4PTP5TE",
};

// Firebase'i başlat (Eğer daha önce başlatılmadıysa)
const app = initializeApp(firebaseConfig);

// Authentication objesini oluştur
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
