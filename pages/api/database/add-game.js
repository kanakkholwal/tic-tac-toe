import { firestore } from "../../../src/libs/firebase";

const Game = async (req, res) => {
    // increment the views
    if (req.method === 'POST') {

        const GameObj = {
            status: "won" | "draw" | "lost" | "waiting",
            nextTurn: true,
            opponent: "opponentEmail",
            moves: []
        }



        const { playerEmail, opponentEmail } = req.body;
        // Create New Game Object in both player's database
        const playerRef = firestore.collection('users').doc(playerEmail)
        const opponentRef = firestore.collection('users').doc(opponentEmail)


        playerRef.update({
            games: [
                {
                    status: "waiting",
                    nextTurn: false,
                    opponent: opponentEmail,
                    moves: []
                }
            ]
        }, { merge: true })

        opponentRef.update({
            games: [
                {
                    status: "waiting",
                    nextTurn: true,
                    opponent: playerEmail,
                    moves: []
                }
            ]
        }, { merge: true })


        return res.status(200).json({ body: "added the game" })

    }


    // fetch the views
    if (req.method === 'GET') {
        return res.status(200).end("You are not authorized")
    }
}
export default Game;