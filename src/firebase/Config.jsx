import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBBUADquTSVJXfVOG5MOodJ__s2bNe6Jl8",
  authDomain: "next-projesi.firebaseapp.com",
  projectId: "next-projesi",
  storageBucket: "next-projesi.appspot.com",
  messagingSenderId: "939758895207",
  appId: "1:939758895207:web:fe75ad75f86e4d2c88d4c2",
  measurementId: process.env.measurementId
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const db = getFirestore(app)
const auth = getAuth(app)

export{
    db,
    storage,
    auth
}