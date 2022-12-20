import '../styles/globals.css'
import Head from 'next/head'
import Main from "@/components/Main";
import { useEffect, useState } from 'react';


// Firebase
import { firebaseApp } from "../src/libs/firebaseConfig"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App({ Component, pageProps }) {

  const [user, setUser] = useState(null);


  useEffect(() => {
    const loggedInUser = localStorage.getItem("tic-tac-toe-user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
    else {
      setUser(null);
    }



  }, []);


  return <>
    <Head>
      <title>Tic Tac Toe | NextJs</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

    </Head>
    <Main><Component {...pageProps} /></Main>
  </>


}
