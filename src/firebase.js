import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAoCcx6ADKDxwsauzmbtZSXqQboytVLA3w",
  authDomain: "todo-list-f1b45.firebaseapp.com",
  databaseURL: "https://todo-list-f1b45-default-rtdb.firebaseio.com",
  projectId: "todo-list-f1b45",
  storageBucket: "todo-list-f1b45.appspot.com",
  messagingSenderId: "296546599944",
  appId: "1:296546599944:web:2ea6f618c8f4e7279efdbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);
export const auth=getAuth();