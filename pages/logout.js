import { useEffect } from "react";
import { useRouter } from "next/router";
import { firebaseApp } from "../src/libs/firebaseConfig"
import { getAuth, signOut } from "firebase/auth";
export default function LogOut() {
    const router = useRouter()

    const auth = getAuth(firebaseApp);

    useEffect(() => {

        signOut(auth).then((user) => {
            // Sign-out successful.
            console.log("Sign-out successfully", user);

        }).catch((error) => {
            // An error happened.
            console.log("Error", error);
        });
        localStorage.removeItem("tic-tac-toe-user")
        // router.push("/")

    }, [auth, router])



    return (<>

        Logging Out...
    </>)
}