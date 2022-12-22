import Board from "./Board";
import { Turn, Cross, Circle, Piece } from "./GameElements"
import Button from "../../components/Button";
import ButtonContainer from "../../components/ButtonContainer";
import Heading from "../../components/Heading";

import { useEffect, useState } from "react";
import axios from "axios";

// Firebase 
import { doc, onSnapshot, collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { firebaseApp } from "../../libs/firebaseConfig";


const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const GameObj = {
    status: "won" | "draw" | "lost" | "waiting",
    nextTurn: true,
    opponent: "opponentEmail",
    moves: []
}

export default function Game({ opponentData }) {

    const [opponent, setOpponent] = useState(null);
    const [player, setPlayer] = useState(null);

    const [game, setGame] = useState(null);


    useEffect(() => {
        const user = auth.currentUser.providerData[0];
        if (user && opponentData) {
            if (!player)
                getUser(user, setPlayer)
            if (!opponent)
                getOpponentData(opponentData, setOpponent)
        }
        else
            console.log(" error !!")
        console.log("player :", player)
        console.log("opponent :", opponent)
    }, [opponent, opponentData, player])





    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (i) => {
        const boardCopy = [...board];
        // If user click an occupied square or if game is won, return
        if (winner || boardCopy[i]) return;
        // Put an X or an O in the clicked square
        boardCopy[i] = xIsNext ? "X" : "O";
        setBoard(boardCopy);
        setXisNext(!xIsNext);
    };




    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? player?.displayName : opponent?.displayName);
    }
    return (
        <>
            <Heading>Game with {opponent ? opponent.displayName : "Unknown"}</Heading>
            <p style={{
                fontWeight: "500",
                fontSize: " 1.2em",
                margin: "1.25rem 0.75rem 0.5rem"
            }}>Your piece</p>
            <Piece>
                <Cross />
                {/* <Circle /> */}
            </Piece>
            <Turn>{status} </Turn>
            <Board
                squares={board}
                onClick={i => handleClick(i)}
            />
            <ButtonContainer>
                <Button>Submit</Button>
            </ButtonContainer>
        </>
    );
}


function calculateWinner(squares) {

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

async function getOpponentData({ uid }, callback) {
    await axios.post('/api/auth/uid', {
        uid: uid,
        fetching: true
    }).then(async (response) => {

        const q = query(collection(db, "users"), where("email", "==", response.data.body.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            return callback(doc.data())
        });

    }).catch((error) => {
        console.log(error);
        return { error: error }
    });
}


async function getUser({ email }, callback) {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        return callback(doc.data())
    });
}