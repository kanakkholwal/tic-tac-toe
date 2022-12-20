import Heading from "../components/Heading"
import FloatingButton from "../components/FloatingButton"
import Button from "../components/Button";
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
                    if (!response.data.body.isValid)
                        router.push("/")

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


    const NoOfGames = false;
    return (<>

        <Heading>Your Games</Heading>
        <Heading large font>No Games found</Heading>


        {
            NoOfGames ? <FloatingButton as={Link} href="/game/play"> <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_235)">
                    <path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_6_235">
                        <rect width={24} height={24} fill="white" />
                    </clipPath>
                </defs>
            </svg>
                New Game</FloatingButton> : <Button as={Link} href="/game/play">Start a new game</Button>


        }

    </>)
}