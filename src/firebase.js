// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// ============================================================
// Ganti dengan konfigurasi Firebase project Anda
// Firebase Console → Project Settings → General → Your apps
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyA_uzYArjTgcsepyVrzrp9wUTXU9Myp6YE",
  authDomain: "narrow-fabric-monitor.firebaseapp.com",
  databaseURL: "https://narrow-fabric-monitor-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "narrow-fabric-monitor",
  storageBucket: "narrow-fabric-monitor.firebasestorage.app",
  messagingSenderId: "548217721068",
  appId: "1:548217721068:web:b7d3a9d771d46901b295c9"
};
// ============================================================

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);