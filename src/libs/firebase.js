import admin from 'firebase-admin';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBG50PtVD5nqqMF2SNGwOijFurE9MUmvmw",
    authDomain: "tic-tac-toe-nextjs-032.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-nextjs-032-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tic-tac-toe-nextjs-032",
    storageBucket: "tic-tac-toe-nextjs-032.appspot.com",
    messagingSenderId: "479822923176",
    appId: "1:479822923176:web:2b5e99cf590b351aacc99d"
};

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            private_key: process.env.FIREBASE_PRIVATE_KEY,
            client_email: process.env.FIREBASE_CLIENT_EMAIL
        }),
        ...firebaseConfig
    });
}
const firebaseApp = initializeApp(firebaseConfig);

export const db = admin.database();
export const firestore = admin.firestore();
export const auth = admin.auth();
export const Admin = admin;

export default firebaseApp;
