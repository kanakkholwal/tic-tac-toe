import Button from "@/components/Button"
import HomeHeading from "@/components/HomeHeading"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";


export default function HomePage() {

    const router = useRouter();
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("tic-tac-toe-user"))) {
            const { uid } = JSON.parse(localStorage.getItem("tic-tac-toe-user"));
            const CheckId = async (uid) => {
                await axios.post('/api/auth/uid', {
                    uid: uid,
                }).then((response) => {
                    console.log(response.data.body);
                    if (response.data.body.isValid)
                        router.push("/game")

                }).catch((error) => {
                    console.log(error);
                    return {
                        error: error
                    }
                });
            }
            CheckId(uid)
        }

    }, [router]);

    return (<>
        <HomeHeading>Tic Tac Toe</HomeHeading>
        <Button as={Link} href="/login">Login</Button>
        <Button primary={"true"} as={Link} href="/sign-up">Register</Button>
    </>)
}