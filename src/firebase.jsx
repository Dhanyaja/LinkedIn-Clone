import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBt19Nq8up1lCj2d1XIy6jKUUnTxA8El54",
    authDomain: "linkedin-clone-d894a.firebaseapp.com",
    projectId: "linkedin-clone-d894a",
    storageBucket: "linkedin-clone-d894a.firebasestorage.app",
    messagingSenderId: "695988681625",
    appId: "1:695988681625:web:adacc48eb5c90afc853108",
    measurementId: "G-PHEDLN3V09"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };