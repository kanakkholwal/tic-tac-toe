import { useEffect } from "react";
import { useRouter } from "next/router";
import { firebaseApp } from "../src/libs/firebaseConfig"
import { getAuth, signOut } from "firebase/auth";
export default function LogOut() {

    const router = useRouter()

    useEffect(() => {

        const auth = getAuth(firebaseApp);
        signOut(auth).then((user) => {
            // Sign-out successful.
            console.log("Sign-out successfully", user);

            if (!user) {
                localStorage.removeItem("tic-tac-toe-user")
                router.push("/")
            }

        }).catch((error) => {
            // An error happened.
            console.log("Error", error);
        });

    }, [router])



    return (<>

        Logging Out...
    </>)
}