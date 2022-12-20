import ActionBar from "../components/ActionBar";
import Heading from "../components/Heading"
import { Input, FormElement, Label } from "../components/form-elements";
import Button from "../components/Button"
import ButtonContainer from "../components/ButtonContainer";
import Alert from "../components/Alert";

import Link from "next/link";


import axios from "axios"
// Firebase
import { useState } from "react";
import { useRouter } from "next/router";
import { firebaseApp } from "../libs/firebaseConfig"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

async function RegisterUser({ email, username, displayName, password }, router) {

    await axios.post('/api/auth/register', {
        email: email,
        username: username,
        displayName: displayName,
        password: password,
    })
        .then((response) => {
            console.log(response.data.body);
            const { email, password } = response.data.body

            const auth = getAuth(firebaseApp);

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    user && (() => {
                        localStorage.setItem("tic-tac-toe-user", JSON.stringify(user));
                    })();

                    const uid = JSON.parse(localStorage.getItem("tic-tac-toe-user"));
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



                    console.log(CheckId(uid));


                    CheckId(uid)

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                });
        })
        .catch((error) => {
            console.log(error);
        });
}
export default function SignUp() {
    const [user, setUser] = useState({ email: "", password: "", username: "", displayName: "" });
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user)

        RegisterUser(user, router)
    }

    return (<>
        <ActionBar as={Link} href="/">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2667_249)">
                    <path d="M16.62 2.99C16.13 2.5 15.34 2.5 14.85 2.99L6.54 11.3C6.15 11.69 6.15 12.32 6.54 12.71L14.85 21.02C15.34 21.51 16.13 21.51 16.62 21.02C17.11 20.53 17.11 19.74 16.62 19.25L9.38 12L16.63 4.75C17.11 4.27 17.11 3.47 16.62 2.99Z" fill="#333333" />
                </g>
                <defs>
                    <clipPath id="clip0_2667_249">
                        <rect width={24} height={24} fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </ActionBar>
        <Heading>{"  Let's get to know \n you better !"}</Heading>
        <form onSubmit={handleSubmit}>
            <FormElement>
                <Label>
                    Your Name
                </Label>
                <Input type="text" placeholder="Type your name here" value={user.displayName} onChange={(e) => setUser({ ...user, displayName: e.target.value })} />
            </FormElement>
            <FormElement>
                <Label>
                    Username
                </Label>
                <Input type="text" placeholder="Type your username here" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />

            </FormElement>
            <FormElement>
                <Label>
                    Email
                </Label>
                <Input type="email" placeholder="Type your email here" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </FormElement>
            <FormElement>
                <Label>
                    Password
                </Label>
                <Input type="password" placeholder="Type your name here" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </FormElement>

            <Alert hidden={true}>
                Congratulations!!! Account created.
            </Alert>
            <ButtonContainer>

                <Button type="submit">
                    Register
                </Button>
            </ButtonContainer>
        </form>
    </>)
}