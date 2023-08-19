import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAAkYh45IqUHrtusQyNW5YP6ysNZrduHJE',
  authDomain: 'post-and-talk.firebaseapp.com',
  databaseURL: 'https://post-and-talk-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'post-and-talk',
  storageBucket: 'post-and-talk.appspot.com',
  messagingSenderId: '335404147215',
  appId: '1:335404147215:web:9003c80541fd887b29b97a',
  measurementId: 'G-BE502TNB1S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
