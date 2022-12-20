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

export const firebaseApp = initializeApp(firebaseConfig);


export default firebaseConfig

